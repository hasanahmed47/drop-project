import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextField, Button } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PageTransition from '../../components/PageTransition/PageTransition';
import { registerUser, selectAuthStatus, selectAuthError } from '../../redux/authSlice';
import './Login.css';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      navigate('/', { replace: true });
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
          <PersonAddOutlinedIcon sx={{ fontSize: 36, color: '#c68a4b' }} />
          <h2>Create Account</h2>
          <p className="auth-card__subtitle">Join DROP for faster checkout and order tracking</p>

          <form onSubmit={handleSubmit} className="auth-card__form">
            <TextField
              fullWidth
              label="Full Name"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              margin="normal"
            />
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
              helperText="At least 6 characters"
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
              {status === 'loading' ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <p className="auth-card__footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default Register;
