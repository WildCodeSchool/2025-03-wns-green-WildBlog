import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { ApolloProvider } from "@apollo/client/react";
import { Home } from './pages/Home.tsx';
import Signup from './pages/Signup.tsx';
import DesignSystem from './pages/DesignSystem.tsx';
import { ApolloLink } from '@apollo/client';

import { UserProvider } from './contexts/UserContext.tsx';
import { ProtectedRoute } from './routes/ProtectedRoutes.tsx';



// Lien terminal qui envoie la requête au serveur
const httpLink = new HttpLink({ uri: "http://localhost:4200/graphql" });

// Lien custom pour ajouter le token
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

// Concatène authLink puis httpLink
const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/style-guide" element={<DesignSystem />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/home" element={<Home />} /> */}


            <Route path="/home" element={
              <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ApolloProvider>
  </StrictMode>
);
