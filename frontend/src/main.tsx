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

const client = new ApolloClient({
  link: new HttpLink({ 
  uri: "http://localhost:4200/graphql"
  }),
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/style-guide" element={<DesignSystem />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
