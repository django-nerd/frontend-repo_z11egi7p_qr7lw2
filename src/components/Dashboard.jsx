import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Clock, Mail, XCircle } from 'lucide-react';

export default function Dashboard({ claims = [], role = 'student' }) {
  const statusColors = useMemo(() => ({
    submitted: 'text-blue-300 bg-blue-500/15',
    reviewing: 'text-amber-300 bg-amber-500/15',
    approved: 'text-emerald-300 bg-emerald-500/15',
    rejected: 'text-rose-300 bg-rose-500/15',
  }), []);

  return (
    <section className="mx-auto max-w-6xl py-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-2xl font-semibold text-transparent">Claims overview</h2>
          <p className="mt-1 text-sm text-white/60">Track submissions and stay updated in real-time.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur">
          Role: <span className="text-white">{role}</span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        <div className="grid grid-cols-12 px-4 py-3 text-left text-xs uppercase tracking-wide text-white/60">
          <div className="col-span-4">Claim</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        <div className="divide-y divide-white/10">
          {claims.length === 0 ? (
            <div className="px-4 py-8 text-center text-white/50">No claims yet. Submit your first claim above.</div>
          ) : (
            claims.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-12 items-center px-4 py-4"
              >
                <div className="col-span-4">
                  <div className="font-medium text-white">{c.category} • {c.studentName}</div>
                  <div className="text-xs text-white/50">{c.description}</div>
                </div>
                <div className="col-span-2 text-white">${Number(c.amount).toFixed(2)}</div>
                <div className="col-span-3">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${statusColors[c.status]}`}>
                    {c.status === 'approved' && <BadgeCheck size={16} />}
                    {c.status === 'reviewing' && <Clock size={16} />}
                    {c.status === 'submitted' && <Mail size={16} />}
                    {c.status === 'rejected' && <XCircle size={16} />}
                    {c.status}
                  </span>
                </div>
                <div className="col-span-3 flex items-center justify-end gap-2 text-xs">
                  {role === 'admin' ? (
                    <>
                      <button className="rounded-lg bg-emerald-500/80 px-3 py-1 text-white hover:bg-emerald-500">Approve</button>
                      <button className="rounded-lg bg-rose-500/80 px-3 py-1 text-white hover:bg-rose-500">Reject</button>
                    </>
                  ) : (
                    <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-white/80 hover:bg-white/10">View</button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
