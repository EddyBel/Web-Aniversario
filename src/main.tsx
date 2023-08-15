import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import { GithubContextProvider } from './context/github.context.tsx';
import { GlobalContextProvider } from './context/global.context.tsx';
import './styles/index.css';
import './styles/animations.css';
import './styles/home.css';
import './styles/fonts.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NextUIProvider>
      <GlobalContextProvider>
        <GithubContextProvider>
          <App />
        </GithubContextProvider>
      </GlobalContextProvider>
    </NextUIProvider>
  </BrowserRouter>,
);
