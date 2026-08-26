import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PageTransition from '../../components/PageTransition/PageTransition';
import { loginUser, selectAuthStatus, selectAuthError } from '../../redux/authSlice';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <PageTransition>
      <section className="auth-page">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <LockOutlinedIcon sx={{ fontSize: 36, color: '#c68a4b' }} />
          <h2>Welcome Back</h2>
          <p className="auth-card__subtitle">Sign in to keep your DROP orders moving</p>

          <form onSubmit={handleSubmit} className="auth-card__form">
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              margin="normal"
            />

            {error && <p className="auth-card__error">{error}</p>}

            <Button
              type="submit"
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Signing in...' : 'Login'}
            </Button>
          </form>

          <p className="auth-card__footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default Login;
