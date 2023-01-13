import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation/navigation';
import CartProvider from './context/CartContext';

function App() {
  const queryClient = new QueryClient();

  const theme = createTheme({
    typography: {
      htmlFontSize: 10,
      fontFamily: 'Roboto',
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Navigation />
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={`app-${path}`} path={path} element={element} />
            ))}
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
