import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import React Router
import './index.css';
import App from './App.jsx';
import StoreContextProvider from './context/StoreContext.jsx';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>

);
