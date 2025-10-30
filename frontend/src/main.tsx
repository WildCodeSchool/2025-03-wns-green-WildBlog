import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { Dashboard } from './pages/admin/Dashboard.tsx';
import Signup from './pages/Signup.tsx';
import DesignSystem from './pages/DesignSystem.tsx';
import { ApolloLink } from '@apollo/client';
import { AUTH_TOKEN } from './constants.tsx';
import { ProtectedRoute } from './routes/ProtectedRoute.tsx';
import { Profile } from './pages/admin/Profile.tsx';
import { GuestRoute } from './routes/GuestRoute.tsx';
import { AuthProvider } from './contexts/AuthProvider.tsx';


// Lien terminal qui envoie la requête au serveur
const httpLink = new HttpLink({ uri: "http://localhost:4200/graphql" });

// Lien custom pour ajouter le token
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/style-guide" element={<DesignSystem />} />

            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute />}> 
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
