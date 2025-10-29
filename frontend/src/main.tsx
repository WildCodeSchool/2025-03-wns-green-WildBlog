import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StyleGuide from './pages/StyleGuide.tsx'
import ArticlePage from './pages/ArticlePage.tsx'
import BlogUser from './components/BlogListCategoryAndTag.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/blogUser" element={ <BlogUser /> } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
