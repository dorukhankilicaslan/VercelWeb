// components/ContactForm.tsx
"use client"; // Important for client-side components in Next.js App Router

import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // Assuming you're using react-icons

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage("Mesaj gönderiliyor...");
    setMessageType("");

    if (!formData.name || !formData.email || !formData.message) {
      setFormMessage(
        "Lütfen bütün bölmeleri doldurun (Ad Soyad, Email, Mesaj)."
      );
      setMessageType("error");
      return;
    }

    console.log("Form data submitted:", formData);

    // --- REPLACE THIS WITH YOUR ACTUAL FORM SUBMISSION LOGIC ---
    // Example: Sending to an API route
    /*
        try {
            const response = await fetch('/api/contact', { // Adjust your API route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormMessage('Your message has been sent successfully!');
                setMessageType('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                const errorData = await response.json();
                setFormMessage(`Failed to send message: ${errorData.message || 'Unknown error'}`);
                setMessageType('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setFormMessage('An unexpected error occurred. Please try again later.');
            setMessageType('error');
        }
        */
    // --- END OF REPLACEABLE SECTION ---

    // For demonstration, simulate a successful submission

    setTimeout(() => {
      setFormMessage("Mesajınız başarıyla gönderildi!");
      setMessageType("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <input
            type="text"
            name="name"
            placeholder="ADINIZ VE SOYADINIZ"
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border-1 outline-none
                        border-[var(--foreground)]/50 focus:border-[var(--primary)] transition-color duration-300
                        rounded-full bg-transparent text-[var(--foreground)] placeholder-[var(--foreground)]/50"
          />
        </div>
        <div className="col-span-1">
          <input
            type="email"
            name="email"
            placeholder="MAIL ADRESİNİZ"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-1 outline-none
                        border-[var(--foreground)]/50 focus:border-[var(--primary)] transition-color duration-300
                        rounded-full bg-transparent text-[var(--foreground)] placeholder-[var(--foreground)]/50"
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="subject"
            placeholder="MAIL KONUSU"
            autoComplete="off"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border-1 outline-none
                        border-[var(--foreground)]/50 focus:border-[var(--primary)] transition-color duration-300
                        rounded-full bg-transparent text-[var(--foreground)] placeholder-[var(--foreground)]/50"
          />
        </div>
      </div>
      <div className="col-span-full">
        <textarea
          name="message"
          placeholder="YOUR MESSAGE"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 outline-none resize-y
                    border-1 border-[var(--foreground)]/50
                    rounded-md bg-transparent text-foreground placeholder-[var(--foreground)]/50
                    focus:ring-[var(--primary)] focus:border-[var(--primary)] "
        ></textarea>

        <button
          type="submit"
          className={`group relative inline-flex items-center justify-start rounded-full 
                            w-50 h-12 border-2 border-[var(--foreground)]/10 hover:cursor-pointer mt-2`}
          onClick={() => {}}
        >
          <span
            className={`z-2 mr-4 ml-5 font-semibold font-[Poppins] text-[var(--foreground)]`}
          >
            Mesajı Gönder
          </span>
          <div
            className={`bg-[var(--primary)] h-12 w-12 absolute right-0 flex items-center justify-end 
                        rounded-full  transition-[width] group-hover:w-[calc(100%)] `}
          >
            <div className={`mr-3.5 flex items-center justify-center`}>
              <FaPaperPlane size={24} className="text-[var(--foreground)]" />
            </div>
          </div>
        </button>
      </div>
      <div className="col-span-full">
        {formMessage && (
          <span
            className={`output_message text-center block text-uppercase font-semibold 
                    ${
                      messageType === "success"
                        ? "text-green-500"
                        : messageType === "error"
                        ? "text-red-500"
                        : "text-[var(--foreground)] hidden"
                    }`}
          >
            {formMessage}
          </span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
