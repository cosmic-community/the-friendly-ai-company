'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-meadow-50 rounded-3xl border border-meadow-200">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thanks for reaching out! We&apos;ll get back to you faster than you can say &ldquo;marketing made friendly&rdquo; 😄
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          className="btn-secondary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name 👋
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-sunshine-400 focus:ring-2 focus:ring-sunshine-100 outline-none transition-all text-gray-900 placeholder-gray-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address 📧
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-sunshine-400 focus:ring-2 focus:ring-sunshine-100 outline-none transition-all text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
          Subject 📋
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="What's this about?"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-sunshine-400 focus:ring-2 focus:ring-sunshine-100 outline-none transition-all text-gray-900 placeholder-gray-400"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Message 💬
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us what's on your mind..."
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-sunshine-400 focus:ring-2 focus:ring-sunshine-100 outline-none transition-all text-gray-900 placeholder-gray-400 resize-none"
        />
      </div>

      <button type="submit" className="btn-primary w-full text-lg py-4">
        Send Message 🚀
      </button>
    </form>
  );
}