import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import "../styles/Contactus.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
function Toast({ visible }: { visible: boolean }) {
  return (
    <div className="toast-wrapper">
      <div className={`toast${visible ? " visible" : ""}`}>
        <div className="toast-icon">✓</div>
        <span className="toast-msg">
          Message sent! We'll be in touch within 24 hours.
        </span>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [toastVisible, setToastVisible] = useState(false);
  useEffect(() => {
    const handler = () => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
    };
    window.addEventListener("contact:submitted", handler);
    return () => window.removeEventListener("contact:submitted", handler);
  }, []);

  return (
    <>
      <Toast visible={toastVisible} />

      <motion.main
        className="contact-page"
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        {/* ── Hero ── */}
        <section className="contact-hero">
          <motion.div
            className="hero-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-tag">CONTACT TO US</span>
            <h1>Get In Touch</h1>
            <p>We'd love to hear about your project or answer any questions.</p>
          </motion.div>
        </section>

        <section className="contact-container">
          <div className="contact-info-panel">
            <h2>Get in touch</h2>

            <div className="info-block">
              <div className="info-row">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h4>Visit us</h4>
                  <p>Come say hello at our office HQ.</p>
                  <p>1119 Keystone Way Carmel, IN 46032</p>
                </div>
              </div>
            </div>

            <div className="info-block">
              <div className="info-row">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4>Chat to us</h4>
                  <p>Our friendly team is here to help.</p>
                  <p>info@radcube.com</p>
                </div>
              </div>
            </div>

            <div className="info-block">
              <div className="info-row">
                <FaPhoneAlt className="info-icon" />
                <div>
                  <h4>Call us</h4>
                  <p>Mon–Fri from 8am to 5pm</p>
                  <p>+1 317-456-7560</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form panel */}
          <div className="contact-form-panel">
            <ContactForm />
          </div>
        </section>
      </motion.main>
    </>
  );
}
