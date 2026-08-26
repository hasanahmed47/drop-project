import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageTransition from '../../components/PageTransition/PageTransition';
import { faqs } from '../../data/faqs';
import './FAQ.css';

function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <PageTransition>
      <section className="faq-page">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-page__list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="faq-page__item">
                <button
                  className="faq-page__question"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ExpandMoreIcon />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-page__answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="faq-page__answer">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}

export default FAQ;
