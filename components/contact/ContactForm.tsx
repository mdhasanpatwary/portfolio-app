import React, { FC, FormEvent, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { FiRotateCcw } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm: FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

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
        toast.success("Message sent successfully!");
        form.current?.reset();
      })
      .catch((error) => {
        toast.error("Failed to send message.");
        console.error("EmailJS Error:", error);
      })
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    form.current?.reset();
    setErrors({});
    setTouched({});
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
      noValidate
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Send Message
      </h3>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Name <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <input
              id="user_name"
              type="text"
              name="user_name"
              placeholder="Your name"
              required
              aria-required="true"
              aria-invalid={!!errors.user_name}
              aria-describedby={errors.user_name ? "user_name-error" : undefined}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              onBlur={handleBlur}
            />
            {touched.user_name && errors.user_name && (
              <p id="user_name-error" className="text-sm text-red-700 dark:text-red-300 mt-1">
                {errors.user_name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="user_email" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Email <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <input
              id="user_email"
              type="email"
              name="user_email"
              placeholder="your.email@example.com"
              required
              aria-required="true"
              aria-invalid={!!errors.user_email}
              aria-describedby={errors.user_email ? "user_email-error" : undefined}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              onBlur={handleBlur}
            />
            {touched.user_email && errors.user_email && (
              <p id="user_email-error" className="text-sm text-red-700 dark:text-red-300 mt-1">
                {errors.user_email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="What's this about?"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
            Message <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about your project or idea..."
            rows={5}
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            onBlur={handleBlur}
          />
          {touched.message && errors.message && (
            <p id="message-error" className="text-sm text-red-700 dark:text-red-300 mt-1">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="reset"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            disabled={loading}
          >
            <FiRotateCcw className="text-sm" />
            Reset
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <FiSend className="text-sm" />
                Send Message
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;