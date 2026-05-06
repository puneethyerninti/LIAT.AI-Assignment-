import { useState } from 'react';
import { motion } from 'framer-motion';

export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message?: string;
};

export const ContactForm = ({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: ContactFormData) => Promise<void>;
  onClose?: () => void;
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    interest: 'leasing',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
        throw new Error('Name, email, and company are required.');
      }

      // Call onSubmit prop (which will call the serverless function)
      await onSubmit(formData);

      setStatus('success');
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', interest: 'leasing', message: '' });
        setStatus('idle');
        if (onClose) {
          onClose();
        }
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-ink-950 mb-2">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-950 placeholder-ink-400 focus:border-ink-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-950 mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@company.com"
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-950 placeholder-ink-400 focus:border-ink-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-950 mb-2">Company / Organization *</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company"
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-950 placeholder-ink-400 focus:border-ink-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-950 mb-2">Interest *</label>
        <select
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-950 focus:border-ink-600 focus:outline-none"
        >
          <option value="leasing">Retail Leasing</option>
          <option value="sponsorship">Sponsorship & Partnership</option>
          <option value="events">Event Booking</option>
          <option value="venues">Venue Information</option>
          <option value="other">Other Inquiry</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-950 mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your inquiry..."
          rows={4}
          className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-950 placeholder-ink-400 focus:border-ink-600 focus:outline-none"
        />
      </div>

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          {errorMsg}
        </motion.div>
      )}

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-green-50 p-4 text-sm text-green-700"
        >
          Thank you! Your inquiry has been submitted. We will be in touch soon.
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full rounded-lg bg-ink-950 px-4 py-3 text-sm font-semibold text-cream transition hover:bg-ink-800 disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Submitted!' : 'Submit Inquiry'}
      </button>
    </form>
  );
};
