import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { store } from './redux/store';
import './styles/global.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BottomNav from './components/BottomNav/BottomNav';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import FlyingCartOverlay from './components/FlyingCartOverlay/FlyingCartOverlay';

import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import CoffeeDetail from './pages/CoffeeDetail/CoffeeDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import Favorites from './pages/Favorites/Favorites';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import FAQ from './pages/FAQ/FAQ';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/NotFound/NotFound';

// Scroll to top on every route change — fixes the "lands mid-page" problem globally.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/coffee/:id" element={<CoffeeDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <AnimatedRoutes />
          <Footer />
          <BottomNav />
          <FlyingCartOverlay />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
