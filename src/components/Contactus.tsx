import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../styles/Contactanother.css";
import { useNavigate } from "react-router-dom";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const IconInfo = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
);
const IconPhone = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const IconPin = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconArrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);
const IconSend = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="15"
    height="15"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="11"
    height="11"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Contactus: React.FC = () => {
  const [submitError, setSubmitError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onBlur" });

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const onSubmit = async (data: FormValues) => {
    setSubmitError("");
    try {
      const submission = {
        id: crypto.randomUUID(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        subject: data.subject,
        message: data.message,
        timestamp: new Date().toISOString(),
        status: "New",
      };
      const existing = JSON.parse(localStorage.getItem("submissions") || "[]");
      localStorage.setItem(
        "submissions",
        JSON.stringify([submission, ...existing]),
      );
      await new Promise((r) => setTimeout(r, 700));
      reset();
      setShowToast(true);
      setTimeout(() => navigate("/dashboardpage"), 1800);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="bg-title">CONTACT US</div>

      <div className="circuit tl">
        <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
          <path
            d="M8 80 L8 22 L44 22"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <path
            d="M44 22 L110 22"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
          <circle
            cx="8"
            cy="80"
            r="3"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="8" cy="22" r="2" fill="rgba(255,255,255,0.14)" />
          <circle
            cx="110"
            cy="22"
            r="4"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M44 22 L44 10"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="circuit tr">
        <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
          <path
            d="M172 80 L172 22 L136 22"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <path
            d="M136 22 L70 22"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
          <circle
            cx="172"
            cy="80"
            r="3"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="172" cy="22" r="2" fill="rgba(255,255,255,0.14)" />
          <circle
            cx="70"
            cy="22"
            r="4"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
      <div className="circuit bl">
        <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
          <path
            d="M8 10 L8 52 L70 52"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <circle
            cx="8"
            cy="10"
            r="3"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="70" cy="52" r="2" fill="rgba(255,255,255,0.08)" />
        </svg>
      </div>
      <div className="circuit br">
        <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
          <path
            d="M132 10 L132 52 L70 52"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <circle
            cx="132"
            cy="10"
            r="3"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="70" cy="52" r="2" fill="rgba(255,255,255,0.08)" />
        </svg>
      </div>

      {/* LEFT */}
      <div className="left">
        <div className="badge">
          <div className="badge-icon">
            <IconInfo />
          </div>
          <span className="badge-label">Contact Us</span>
        </div>
        <h2>Get in touch</h2>
        <p className="subtitle">
          Have questions or ready to transform your business with AI automation?
          We'd love to hear from you.
        </p>
        <div className="info-cards">
          <div className="card">
            <div className="card-icon">
              <IconMail />
            </div>
            <div className="card-body">
              <span className="label">Email us</span>
              <span className="value">info@radcube.com</span>
            </div>
            <div className="card-arrow">
              <IconArrow />
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <IconPhone />
            </div>
            <div className="card-body">
              <span className="label">Call us</span>
              <span className="value">(317)-456-7560</span>
            </div>
            <div className="card-arrow">
              <IconArrow />
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <IconPin />
            </div>
            <div className="card-body">
              <span className="label">Our location</span>
              <span className="value">
                1119 Keystone Way #302 Carmel, IN 46032
              </span>
            </div>
            <div className="card-arrow">
              <IconArrow />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className={`toast${showToast ? " visible" : ""}`}>
          <div className="toast-icon">
            <IconCheck />
          </div>
          Message sent! We'll be in touch within 24 hours.
        </div>

        <div className="form-inner">
          <div className="form-header">
            <h3>Start a Conversation</h3>
            <p>We'll get back to you within 24 hours.</p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  placeholder="Enter your first name"
                  className={errors.firstName ? "error" : ""}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <span className="error-message">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  placeholder="Enter your last name"
                  className={errors.lastName ? "error" : ""}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <span className="error-message">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={errors.email ? "error" : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                placeholder="What's this about?"
                className={errors.subject ? "error" : ""}
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <span className="error-message">{errors.subject.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                placeholder="Tell us about your project or question..."
                className={errors.message ? "error" : ""}
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "At least 10 characters" },
                })}
              />
              {errors.message && (
                <span className="error-message">{errors.message.message}</span>
              )}
            </div>

            {submitError && <div className="submit-error">{submitError}</div>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send Message"}
              {!isSubmitting && <IconSend />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
