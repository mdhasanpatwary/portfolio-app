"use client";

import { FC, FormEvent, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const Contact: FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        emailjs
            .sendForm(
                "service_90axswo",      // replace with your actual Service ID
                "template_znmpmjw",     // replace with your actual Template ID
                form.current,
                "e3p000moSeEYQGGdV"       // replace with your Public Key (User ID)
            )
            .then(() => {
                setStatus("Message sent successfully!");
                form.current?.reset();
            })
            .catch((error) => {
                setStatus("Failed to send message.");
                console.error("EmailJS Error:", error);
            });
    };

    return (
        <section
            id="contact"
            className="w-full py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <FiSend className="text-indigo-600 dark:text-indigo-400 text-3xl" />
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Get In Touch
                    </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-12">
                    Drop a message and I’ll get back to you via email.
                </p>

                <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Your Name"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border text-gray-800 dark:text-white outline-none"
                        />
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Your Email"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border text-gray-800 dark:text-white outline-none"
                        />
                    </div>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border text-gray-800 dark:text-white outline-none"
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border text-gray-800 dark:text-white outline-none resize-none"
                    />

                    <button
                        type="submit"
                        className="w-full md:w-auto cursor-pointer px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition duration-300"
                    >
                        Send Message
                    </button>

                    {status && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-4">
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;
