import { useForm } from "react-hook-form";
import { submitContactForm } from "../utils/mockApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = async (data: FormValues) => {
    setSubmitError("");
    try {
      await submitContactForm(data);

      const newSubmission = {
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
        JSON.stringify([newSubmission, ...existing]),
      );

      reset();
      window.dispatchEvent(new Event("contact:submitted"));
      setTimeout(() => navigate("/dashboardpage"), 1600);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <p className="form-title">Start a Conversation</p>
      <p className="form-subtitle">We'll get back to you within 24 hours.</p>

      <form
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              placeholder="Enter your first name"
              className={errors.firstName ? "error" : ""}
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              placeholder="Enter your last name"
              className={errors.lastName ? "error" : ""}
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName.message}</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={errors.email ? "error" : ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        {/* Subject */}
        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input
            id="subject"
            placeholder="Enter the subject"
            className={errors.subject ? "error" : ""}
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && (
            <span className="error-message">{errors.subject.message}</span>
          )}
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            placeholder="Enter your message"
            className={errors.message ? "error" : ""}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
          />
          {errors.message && (
            <span className="error-message">{errors.message.message}</span>
          )}
        </div>

        {submitError && <div className="submit-error">{submitError}</div>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send Message"}
        </button>
      </form>
    </>
  );
}
