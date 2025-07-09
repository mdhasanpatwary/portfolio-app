import React, { FC, FormEvent, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm: FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Hide status after 4 seconds
  React.useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validate = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};
    const name = formData.get("user_name") as string;
    const email = formData.get("user_email") as string;
    const message = formData.get("message") as string;
    if (!name) newErrors.user_name = "Name is required.";
    if (!email) newErrors.user_email = "Email is required.";
    else if (!EMAIL_REGEX.test(email)) newErrors.user_email = "Invalid email format.";
    if (!message || message.trim().length < 10) newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const validateField = (field: string, value: string) => {
    let error = "";
    if (field === "user_name") {
      if (!value) error = "Name is required.";
    } else if (field === "user_email") {
      if (!value) error = "Email is required.";
      else if (!EMAIL_REGEX.test(value)) error = "Invalid email format.";
    } else if (field === "message") {
      if (!value || value.trim().length < 10) error = "Message must be at least 10 characters.";
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    const formData = new FormData(form.current);
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    emailjs
      .sendForm(
        // TODO: Move these keys to environment variables for security
        "service_90axswo",
        "template_znmpmjw",
        form.current,
        "e3p000moSeEYQGGdV"
      )
      .then(() => {
        setStatus("Message sent successfully!");
        form.current?.reset();
      })
      .catch((error) => {
        setStatus("Failed to send message.");
        console.error("EmailJS Error:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg space-y-6"
      noValidate
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-left">
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="user_name"
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            aria-required="true"
            aria-invalid={!!errors.user_name}
            aria-describedby={errors.user_name ? "user_name-error" : undefined}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            onBlur={handleBlur}
          />
          {touched.user_name && errors.user_name && (
            <p id="user_name-error" className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">{errors.user_name}</p>
          )}
        </div>
        <div className="text-left">
          <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="user_email"
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            aria-required="true"
            aria-invalid={!!errors.user_email}
            aria-describedby={errors.user_email ? "user_email-error" : undefined}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            onBlur={handleBlur}
          />
          {touched.user_email && errors.user_email && (
            <p id="user_email-error" className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">{errors.user_email}</p>
          )}
        </div>
      </div>
      <div className="text-left">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
      <div className="text-left">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your Message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          onBlur={handleBlur}
        />
        {touched.message && errors.message && (
          <p id="message-error" className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">{errors.message}</p>
        )}
      </div>
      <div className="flex w-full">
        <button
          type="submit"
          className="w-full md:w-auto cursor-pointer px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition duration-300 flex items-center justify-center gap-2 disabled:opacity-60 md:ml-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <span>Sending...</span>
          ) : (
            <>
              <FiSend className="inline-block mr-2" /> Send Message
            </>
          )}
        </button>
      </div>
      <div aria-live="polite" className="min-h-[24px]">
        {status && (
          <p className={`text-sm mt-4 font-medium ${status.includes("success") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {status}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;