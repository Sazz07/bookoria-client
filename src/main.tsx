import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.tsx';
import { ConfigProvider } from 'antd';
import { antdTheme } from './theme/antdTheme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={antdTheme}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
    <Toaster position='top-center' visibleToasts={1} />
  </StrictMode>
);
