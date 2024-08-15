import PWABadge from './PWABadge.tsx';
import GlobalStyle from "./styleGlobal";
import { theme } from '@/constants/theme/index.ts';
import { ThemeProvider } from "styled-components";
import Router from "./routes/routes";
import UseAuth from './hooks/auth/useauth.tsx';
import { Box } from './store/assets/loadingStyle.ts';
import { CircularProgress } from '@mui/material';

function App() {
  const { isLoading } = UseAuth();
  if (isLoading) {
    return <Box><CircularProgress /></Box>;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
      <PWABadge />
    </ThemeProvider>
  );
}

export default App;
