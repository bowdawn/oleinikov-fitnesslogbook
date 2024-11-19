import React, { ReactNode, createContext, useContext, useState } from "react";
import { notification } from "antd";
import { useAuth } from "./AuthProvider";
import axios from "../../core/utils/axios";
import LibraryProviderDebugPanel from "../components/LibraryProviderDebugPanel";

interface Book {
  id: string;
  author: string;
  isPdf: boolean;
  language: string;
  pdf: string;
  picture: string;
  tags: string[];
  title: string;
  isDeleted: boolean;
  isComplete: boolean;
  isPublic: boolean;
}

interface BookPagination {
  docs: Book[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

interface LibraryContextType {
  loadingBooks: boolean;
  loadingBook: boolean;
  loadingTags: boolean;
  loadingLanguages: boolean;
  loadingModifyBook: boolean;
  loadingAddBook: boolean;
  uploadType: "" | "picture" | "file" ;
  books: BookPagination | null;
  getBooks: (params: {
    limit: number;
    page: number;
    sort: string;
    filter: any;
  }) => Promise<void>;
  book: Book | null;
  getBook: (params: { id: string }) => Promise<void>;
  modifyBook: (params: {
    id: string;
    isPublic: boolean;
    isDeleted: boolean;
    isComplete: boolean;
    author: string;
    title: string;
    language: string;
    picture?: string;
    tags: string[];
    pdf: string;
  }) => Promise<"library" | "view" | "error">;
  addBook: (params: {
    isPublic: boolean;
    isDeleted: boolean;
    isComplete: boolean;
    author: string;
    title: string;
    language: string;
    picture?: string;
    tags: string[];
    pdf: string;
  }) => Promise<void>;
  tags: string[] | null;
  getTags: () => Promise<void>;
  languages: string[] | null;
  getLanguages: () => Promise<void>;
  progress: number;
}

const LibraryContext = createContext<LibraryContextType>({
  loadingBooks: false,
  loadingBook: false,
  loadingTags: false,
  loadingLanguages: false,
  loadingModifyBook: false,
  loadingAddBook: false,
  uploadType: "",
  books: null,
  book: null,
  getBooks: async (params: {}) => { },
  getBook: async (params: {}) => { },
  modifyBook: async (params: {}) => { return "error" },
  addBook: async (params: {}) => { },
  tags: null,
  getTags: async () => { },
  languages: null,
  getLanguages: async () => { },
  progress: 0
});


const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState(false);
  const [loadingModifyBook, setLoadingModifyBook] = useState(false);
  const [loadingAddBook, setLoadingAddBook] = useState(false);
  const [uploadType, setUploadType] = useState<"" | "picture" | "file" >("");
  const [books, setBooks] = useState<BookPagination | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [languages, setLanguages] = useState<string[] | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const { isAuthenticated } = useAuth();
  const [progress, setProgress] = useState<number>(0);
  const openNotificationWithIcon = (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };
  const sliceFile = (file: File, chunkSize: number) => {
    let chunks = [];
    for (let start = 0; start < file.size; start += chunkSize) {
      const end = Math.min(start + chunkSize, file.size);
      chunks.push(file.slice(start, end));
    }
    return chunks;
  };
  const uploadChunk = async (chunk: Blob, index: number, fileName: string) => {
    const uploadChunkData = new FormData();
    uploadChunkData.append('fileChunk', chunk);
    uploadChunkData.append('chunkIndex', index.toString());
    uploadChunkData.append('fileName', fileName);
    const uploadUrl = '/api/book/upload';
    try {
      const response = await axios({
        method: "POST",
        url: uploadUrl,
        data: uploadChunkData,
        headers: {
          'auth': `Bearer ${localStorage.getItem('oleinikov-library-backend')}`,
        },
      });
      if (response.status !== 200) {
        throw new Error('Chunk upload failed');
      }
      return true;
    } catch (error) {
      console.error('Upload failed for chunk ' + index, error);
      throw error;
    }
  };
  const finalizeUpload = async (fileName: string, fileType: string, totalChunks: number) => {
    const finalizeUploadData = { fileName, totalChunks, fileType };
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/book/finalize',
        headers: {
          'Content-Type': 'application/json',
          'auth': `Bearer ${localStorage.getItem('oleinikov-library-backend')}`,
        },
        data: JSON.stringify(finalizeUploadData),
      });
      if (response.status === 200) {
        return response.data
      } else {
        console.error('Failed to finalize the upload:', response.data);
      }
    } catch (error) {
      console.error('Error during finalization:', error);
      throw error;
    }
  };
  const uploadFile = async (file: File) => {
    const CHUNK_SIZE = 1024 * 1024;
    const chunks = sliceFile(file, CHUNK_SIZE);
    let uploadedChunks = 0;
    const updateProgress = () => {
      const currentProgress = Math.floor((uploadedChunks / chunks.length) * 100);
      setProgress(currentProgress);
    };

    for (let index = 0; index < chunks.length; index++) {
      try {
        await uploadChunk(chunks[index], index, file.name);
        uploadedChunks++;
        updateProgress();
      } catch (error) {
        console.error(`Error uploading chunk ${index + 1}:`, error);
        return;
      }
    }
    return await finalizeUpload(file.name, file.type, chunks.length);
  };
  const getBooks = async (params: {
    limit: number,
    page: number,
    sort: string,
    filter: {
      title?: string,
      author?: string
      language?: string,
      tags?: string,
      pdf?: string,
      deleted?: string,
    }
  }
  ) => {
    setLoadingBooks(true);
    setBook(null)
    try {
      if (isAuthenticated) {
        console.log("private books")
        const res = await axios({
          method: "GET",
          url: "/api/book",
          params: {
            limit: params.limit,
            page: params.page,
            sort: params.sort,
            filter: params.filter,
          },
          headers: {
            'auth': `Bearer ${localStorage.getItem('oleinikov-library-backend')}`,
          }
        })
        setBooks(res.data);
      } else {
        console.log("public books")
        const res = await axios({
          method: "GET",
          url: "/api/public/book",
          params: {
            limit: params.limit,
            page: params.page,
            sort: params.sort,
            filter: params.filter
          }
        })
        setBooks(res.data);
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoadingBooks(false);
    }
  };

  const modifyBook = async (params: any) => {
    try {
      setLoadingModifyBook(true);
      if (isAuthenticated) {
        var data = new FormData();
        data.append('_id', params.id);
        data.append('author', params.author);
        data.append("tags", params.tags);
        data.append('title', params.title);
        data.append('language', params.language);
        data.append('picture', params.picture);
        data.append('isDeleted', params.isDeleted);
        data.append('isPublic', params.isPublic);
        data.append('isComplete', params.isComplete);
        if (book?.pdf == params.pdf) {
          data.append('pdf', params.pdf);
        } else if (params.pdf) {
          setUploadType("file");
          const response = await uploadFile(params.pdf);
          if (response.driveData.id) {
            data.append("pdf", response.driveData.id);
          }
          setUploadType("");
          setProgress(0);
        }
        const res = await axios({
          method: "PUT",
          url: "/api/book",
          data: data,
          headers: {
            'auth': `Bearer ${localStorage.getItem('oleinikov-library-backend')}`,
          }
        })
        setBook(res.data);
        if (res?.data?.isDeleted) {
          openNotificationWithIcon(
            "success",
            "Book Deleted",
            "The book has been successfully deleted."
          );
          return "library"
        } else {
          openNotificationWithIcon(
            "success",
            "Book Modified",
            "The book has been successfully edited."
          );
          return "view"
        }
      }
    } catch (error: any) {
      console.log(error)
      openNotificationWithIcon(
        "error",
        "Error Modifying Book",
        error.response?.data?.message || "An error occurred while modifying the book."
      );
      return "error"
    } finally {
      setLoadingModifyBook(false);
    }
    return "error"
  };

  const addBook = async (params: any) => {
    setBook(null)
    setLoadingAddBook(true);
    try {
      if (isAuthenticated) {
        var addBookData = new FormData();
        addBookData.append('author', params.author);
        addBookData.append("tags", params.tags);
        addBookData.append('title', params.title);
        addBookData.append('language', params.language);
        addBookData.append('isDeleted', params.isDeleted);
        addBookData.append('isPublic', params.isPublic);
        addBookData.append('isComplete', params.isComplete);
        if (params.picture) {
          setUploadType("picture");
          const response = await uploadFile(params.picture);
          if (response.driveData.id) {
            addBookData.append("picture", response.driveData.id);
          }
          setUploadType("");
          setProgress(0);
        }
        if (params.pdf) {
          setUploadType("file");
          const response = await uploadFile(params.pdf);
          if (response.driveData.id) {
            addBookData.append("pdf", response.driveData.id);
          }
          setUploadType("");
          setProgress(0);
        }
        
        const res = await axios({
          method: "POST",
          url: "/api/book",
          data: addBookData,
          headers: {
            'auth': `Bearer ${localStorage.getItem('oleinikov-library-backend')}`,
          },
        });
        setBook(res.data);
      } else {
        console.error('User is not authenticated');
      }
      openNotificationWithIcon(
        "success",
        "Book Created",
        "The book has been successfully created."
      );
    } catch (error: any) {
      openNotificationWithIcon(
        "error",
        "Error Creating Book",
        error.response?.data?.message || "An error occurred while creating the book."
      );
    } finally {
      setLoadingAddBook(false);
    }
  };



  const getBook = async (params: any) => {
    setLoadingBook(true);
    try {
      if (isAuthenticated) {
        const res = await axios({
          method: "GET",
          url: "/api/book/" + params.id,
          headers: {
            'auth': `Bearer ${localStorage.getItem('oleinikov-library-backend')}`,
          }
        })
        setBook(res.data);
      }
      else {
        const res = await axios({
          method: "GET",
          url: "/api/public/book/" + params.id,
        })
        setBook(res.data);
      }
    } catch (error: any) {
      openNotificationWithIcon(
        "error",
        "Error Loading Book",
        error.response?.data?.message || "An error occurred while fetching the book."
      );
    } finally {
      setLoadingBook(false);
    }
  };


  const getTags = async () => {
    setLoadingTags(true);
    try {
      if (isAuthenticated) {
        const res = await axios({
          method: "GET",
          url: "/api/book/tags",
          headers: {
            'auth': `Bearer ${localStorage.getItem('oleinikov-library-backend')}`,
          }
        })
        setTags(res.data);
      } else {
        const res = await axios.get("/api/public/book/tags");
        setTags(res.data);
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoadingTags(false);
    }
  };

  const getLanguages = async () => {
    setLoadingLanguages(true);
    try {
      if (isAuthenticated) {
        const res = await axios({
          method: "GET",
          url: "/api/book/languages",
          headers: {
            'auth': `Bearer ${localStorage.getItem('oleinikov-library-backend')}`,
          }
        })
        console.log(res.data)
        setLanguages(res.data);
      } else {
        const res = await axios.get("/api/public/book/languages");
        setLanguages(res.data);
      }

    } catch (error: any) {
      console.log(error)
    } finally {
      setLoadingLanguages(false);
    }
  };





  const value = {
    loadingBooks,
    loadingBook,
    loadingTags,
    loadingLanguages,
    loadingModifyBook,
    loadingAddBook,
    books,
    getBooks,
    tags,
    getTags,
    languages,
    getLanguages,
    book,
    getBook,
    modifyBook,
    addBook,
    progress,
    uploadType
  };
  const debug_states = process.env["REACT_APP_DEBUG_LIBRARY"] === 'true';
  return (
    <LibraryContext.Provider value={value}>
      {contextHolder}
      {
        debug_states ?
          <LibraryProviderDebugPanel
            setLoadingBooks={setLoadingBooks}
            setLoadingBook={setLoadingBook}
            setLoadingTags={setLoadingTags}
            setLoadingLanguages={setLoadingLanguages}
            setLoadingModifyBook={setLoadingModifyBook}
            setLoadingAddBook={setLoadingAddBook} 
            setProgress={setProgress}
            setUploadType={setUploadType}
            />
             :
          <></>
      }
      {children}
    </LibraryContext.Provider>
  );
};

const useLibrary = () => useContext(LibraryContext);
export { LibraryProvider, useLibrary };
