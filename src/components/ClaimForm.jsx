import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ClaimForm({ onSubmit }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    studentId: '',
    category: 'Supplies',
    amount: '',
    description: '',
    receipt: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // In a full app this would be a multipart/form-data request
      const payload = { ...form, receipt: undefined };
      await onSubmit?.(payload);
      setForm({
        fullName: '',
        email: '',
        studentId: '',
        category: 'Supplies',
        amount: '',
        description: '',
        receipt: null,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="apply" className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl"
      >
        Submit a reimbursement request
      </motion.h2>
      <p className="mt-2 text-sm text-white/60">
        Upload your expense details and we'll notify you by email as your claim moves forward.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-1">
          <label className="text-sm text-white/70">Full name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-emerald-400/0 transition focus:ring-2" placeholder="Alex Student" />
        </div>
        <div className="col-span-1">
          <label className="text-sm text-white/70">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-emerald-400/0 transition focus:ring-2" placeholder="alex@university.edu" />
        </div>
        <div className="col-span-1">
          <label className="text-sm text-white/70">Student ID</label>
          <input name="studentId" value={form.studentId} onChange={handleChange} required className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-emerald-400/0 transition focus:ring-2" placeholder="U1234567" />
        </div>
        <div className="col-span-1">
          <label className="text-sm text-white/70">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none ring-emerald-400/0 transition focus:ring-2">
            <option className="bg-slate-900" value="Supplies">Supplies</option>
            <option className="bg-slate-900" value="Travel">Travel</option>
            <option className="bg-slate-900" value="Food">Food</option>
            <option className="bg-slate-900" value="Other">Other</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="text-sm text-white/70">Amount</label>
          <input type="number" step="0.01" min="0" name="amount" value={form.amount} onChange={handleChange} required className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-emerald-400/0 transition focus:ring-2" placeholder="45.50" />
        </div>
        <div className="col-span-1">
          <label className="text-sm text-white/70">Receipt</label>
          <input type="file" name="receipt" accept="image/*,application/pdf" onChange={handleChange} className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-3 file:py-2 file:text-sm file:text-white hover:file:bg-emerald-400" />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="text-sm text-white/70">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Briefly describe the expense and purpose." className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-emerald-400/0 transition focus:ring-2" />
        </div>
        <div className="col-span-1 md:col-span-2 mt-2 flex items-center justify-between gap-4">
          <p className="text-xs text-white/50">By submitting, you agree to our policy and certify the information is accurate.</p>
          <button disabled={submitting} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.01] hover:bg-emerald-400 disabled:opacity-60">
            {submitting ? 'Submitting...' : 'Submit claim'}
          </button>
        </div>
      </form>
    </section>
  );
}
