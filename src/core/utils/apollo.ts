import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";



const isLocalServer = process.env["REACT_APP_LOCAL_SERVER"] === 'true'
const BASE_URL = isLocalServer ? "http://localhost:8000/graphql/" : "https://oleinikovfitnesslogbookbackend.vercel.app/graphql/";
const httpLink = createHttpLink({
  uri: BASE_URL, 
});

// Set up authentication with token
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage
  const token = localStorage.getItem("oleinikov-fitnesslogbook-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;