import React, { useState } from "react";
import { Descriptions, Button, Typography, FloatButton, Layout, Card, Affix, Row, Space } from "antd";
import { useLibrary } from "../providers/LibraryProvider";
import { MinusOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import CustomTitle from "./CustomTitle";

const { Text } = Typography;

interface LibraryDebugPanelProps {
    setLoadingBooks: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingBook: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingTags: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingLanguages: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingModifyBook: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingAddBook: React.Dispatch<React.SetStateAction<boolean>>;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    setUploadType: React.Dispatch<React.SetStateAction<"" | "file" | "picture">>;
}

const LibraryProviderDebugPanel: React.FC<LibraryDebugPanelProps> = ({
    setLoadingBooks,
    setLoadingBook,
    setLoadingTags,
    setLoadingLanguages,
    setLoadingModifyBook,
    setLoadingAddBook,
    setProgress,
    setUploadType
}) => {
    const [visible, setVisible] = useState(false);
    const {
        loadingBooks,
        loadingBook,
        loadingTags,
        loadingLanguages,
        loadingModifyBook,
        loadingAddBook,
        books,
        book,
        tags,
        languages,
        progress,
        uploadType
    } = useLibrary();
    const toggleDrawer = () => {
        setVisible(!visible);
    };


    return (
        <>
            <FloatButton
                type="primary"
                icon={<SettingOutlined />} // You can customize the icon here
                onClick={toggleDrawer}
                style={{ display: visible ? "none" : "block", bottom: 64, right: 20 }}
            />
            <Layout.Sider
                collapsible
                title="Library Debug Panel"
                width={400}
                onCollapse={toggleDrawer}
                collapsed={!visible}
            >
                <Affix offsetTop={0}>
                    <div className="opacity-transition" style={{ width: visible ? 400 : 0, opacity: visible ? 1 : 0, overflow: "hidden" }}>
                        <Row style={{ height: 64 }} justify={"center"} align={"middle"}>
                            <CustomTitle oneline white level={5} marginless  >Library Provider Debug Panel</CustomTitle>
                        </Row>
                        <Card style={{ borderRadius: 0, maxHeight: "calc(100vh - 112px)", overflow: "auto" }}>
                            <Descriptions column={1} bordered size="small" style={{ marginTop: 16 }}>
                                <Descriptions.Item label="Loading Books">
                                    <Button
                                        type={loadingBooks ? "primary" : "default"}
                                        onClick={() => setLoadingBooks(prev => !prev)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Toggle
                                    </Button>
                                    <Text style={{ color: loadingBooks ? "green" : "red" }}>
                                        {loadingBooks.toString()}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Loading Book">
                                    <Button
                                        type={loadingBook ? "primary" : "default"}
                                        onClick={() => setLoadingBook(prev => !prev)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Toggle
                                    </Button>
                                    <Text style={{ color: loadingBook ? "green" : "red" }}>
                                        {loadingBook.toString()}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Loading Tags">
                                    <Button
                                        type={loadingTags ? "primary" : "default"}
                                        onClick={() => setLoadingTags(prev => !prev)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Toggle
                                    </Button>
                                    <Text style={{ color: loadingTags ? "green" : "red" }}>
                                        {loadingTags.toString()}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Loading Languages">
                                    <Button
                                        type={loadingLanguages ? "primary" : "default"}
                                        onClick={() => setLoadingLanguages(prev => !prev)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Toggle
                                    </Button>
                                    <Text style={{ color: loadingLanguages ? "green" : "red" }}>
                                        {loadingLanguages.toString()}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Loading Modify Book">
                                    <Button
                                        type={loadingModifyBook ? "primary" : "default"}
                                        onClick={() => setLoadingModifyBook(prev => !prev)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Toggle
                                    </Button>
                                    <Text style={{ color: loadingModifyBook ? "green" : "red" }}>
                                        {loadingModifyBook.toString()}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Loading Add Book">
                                    <Button
                                        type={loadingAddBook ? "primary" : "default"}
                                        onClick={() => setLoadingAddBook(prev => !prev)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Toggle
                                    </Button>
                                    <Text style={{ color: loadingAddBook ? "green" : "red" }}>
                                        {loadingAddBook.toString()}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Books">
                                    <div style={{ height: 60, overflow: "auto" }}>
                                        {books ? books.docs.map(book => <div key={book.id}>{book.title}</div>) : "No books loaded"}
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label="Current Book">
                                    {book ? JSON.stringify(book.title) : "No book selected"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Tags">
                                    <div style={{ height: 60, overflow: "auto" }}>
                                        {tags ? tags.map(tag => <div key={tag}> {tag}</div>) : "No tags loaded"}
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label="Languages">
                                    {languages ? languages.join(", ") : "No languages loaded"}
                                </Descriptions.Item>
                                <Descriptions.Item label="uploadType">
                                    <Space direction="vertical">
                                        {uploadType}
                                        <Space align="center">
                                            <Button size="small" disabled={uploadType == ""} onClick={() => setUploadType("")}>default</Button>
                                            <Button size="small" disabled={uploadType == "picture"} onClick={() => setUploadType("picture")}>picture</Button>
                                            <Button size="small" disabled={uploadType == "file"} onClick={() => setUploadType("file")}>file</Button>
                                        </Space>
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="progress">
                                    <Space align="center">
                                        <Button disabled={progress == 0} icon={<MinusOutlined />} onClick={() => setProgress(progress - 1)}></Button>
                                        {progress}
                                        <Button disabled={progress == 100} icon={<PlusOutlined />} onClick={() => setProgress(progress + 1)}></Button>
                                    </Space>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </div>
                </Affix>
            </Layout.Sider>
        </>
    );
};

export default LibraryProviderDebugPanel;
