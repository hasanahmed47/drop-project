import { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button } from '@mui/material';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PageTransition from '../../components/PageTransition/PageTransition';
import './Contact.css';

const CONTACT_CARDS = [
  { icon: RoomOutlinedIcon, title: 'Visit Us', value: 'Clifton, Karachi, Pakistan' },
  { icon: PhoneOutlinedIcon, title: 'Call Us', value: '+92 300 1234567' },
  { icon: EmailOutlinedIcon, title: 'Email Us', value: 'hello@dropcoffee.com' },
];

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = () => {
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1200);
  };

  return (
    <PageTransition>
      <section className="contact-page">
        <h2>Get in Touch</h2>

        <div className="contact-page__cards">
          {CONTACT_CARDS.map(({ icon: Icon, title, value }, index) => (
            <motion.div
              key={title}
              className="contact-page__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Icon sx={{ fontSize: 28, color: '#c68a4b' }} />
              <h4>{title}</h4>
              <p>{value}</p>
            </motion.div>
          ))}
        </div>

        <div className="contact-page__body">
          <motion.div
            className="contact-page__map"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              title="DROP Coffee Bar Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.215!2d67.0302!3d24.8126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e9f6b3e3b1d%3A0x7b2e8c1f!2sClifton%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1693000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'var(--radius-lg)', minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <div className="contact-page__form">
            {['name', 'email', 'message'].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TextField
                  fullWidth
                  multiline={field === 'message'}
                  rows={field === 'message' ? 4 : 1}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                  margin="normal"
                />
              </motion.div>
            ))}

            <Button
              variant="contained"
              color="warning"
              size="large"
              onClick={handleSubmit}
              disabled={status === 'loading'}
            >
              {status === 'loading'
                ? 'Sending...'
                : status === 'success'
                ? 'Message Sent ✓'
                : 'Send Message'}
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Contact;
