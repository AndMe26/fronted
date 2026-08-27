import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
      <AuthProvider>

      <App />

      </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
