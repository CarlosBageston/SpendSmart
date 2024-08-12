import PWABadge from './PWABadge.tsx';
import GlobalStyle from "./styleGlobal";
import { theme } from '@/constants/theme/index.ts';
import { ThemeProvider } from "styled-components";
import Router from "./routes/routes";
import { Provider } from 'react-redux';
import store from './store/reducer/store.ts';

function App() {

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
          <PWABadge />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App
