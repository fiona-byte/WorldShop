import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navigation from './components/Navigation/navigation';
import CartProvider from './context/CartContext';

function App() {
  const theme = createTheme({
    typography: {
      htmlFontSize: 10,
      fontFamily: 'Roboto',
    },
  });

  return (
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
  );
}

export default App;
