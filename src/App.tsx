import PWABadge from './PWABadge.tsx';
import GlobalStyle from "./styleGlobal";
import { theme } from '@/constants/theme/index.ts';
import { ThemeProvider } from "styled-components";
import Router from "./routes/routes";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
        <PWABadge />
      </ThemeProvider>
    </>
  )
}

export default App
