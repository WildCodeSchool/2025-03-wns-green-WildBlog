import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { Home } from './pages/admin/Home.tsx';
import Signup from './pages/Signup.tsx';
import DesignSystem from './pages/DesignSystem.tsx';
import { ApolloLink } from "@apollo/client/core";
import { AUTH_TOKEN } from './constants.tsx';
import { ProtectedRoute } from './routes/ProtectedRoute.tsx';
import { Profile } from './pages/admin/Profile.tsx';
import { GuestRoute } from './routes/GuestRoute.tsx';
import { AuthProvider } from './contexts/AuthProvider.tsx';
import BlogList from './pages/blog/BlogList.tsx'
import ArticlePage from './pages/ArticlePage.tsx'
import Article from './pages/ArticlePage.tsx';
import { List } from './pages/admin/posts/List.tsx';
import { Create } from './pages/admin/posts/Create.tsx';
import { Categories } from './pages/admin/Categories.tsx';
import { Tags } from './pages/admin/Tags.tsx';
import { Medias } from './pages/admin/Medias.tsx';
import { Comments } from './pages/admin/Comments.tsx';
import { Stats } from './pages/admin/Stats.tsx';
import { Settings } from './pages/admin/Settings.tsx';
import { Update } from './pages/admin/posts/Update.tsx';

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
            <Route path="/blog" element={<BlogList />} />
            <Route path="/article" element={<Article />} />
            <Route path="/article/:id" element={<ArticlePage />} />

            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute />}> 
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Home />} />
              <Route path="profil" element={<Profile />} />
              
              {/* Mes articles */}
              <Route path="articles/mes-articles" element= {<List/>} />
              <Route path="articles/creer" element= {<Create/>} />
              <Route path="articles/:id/modifier" element= {<Update/>} />

              {/* Catégories */}
              <Route path="categories" element= {<Categories/>} />

              {/* Tags */}
              <Route path="tags" element= {<Tags/>} />
              
              {/* Médias */}
              <Route path="medias" element= {<Medias/>} />

              {/* Commentaires */}
              <Route path="commentaires" element= {<Comments/>} />

              {/* Stats */}
              <Route path="statistiques" element= {<Stats/>} />

              {/* Paramètres */}
              <Route path="parametres" element= {<Settings/>} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
