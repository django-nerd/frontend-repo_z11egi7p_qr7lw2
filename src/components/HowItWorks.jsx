import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Shield, FileText } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Submit your claim',
    desc: 'Upload your receipt and provide a quick description. Takes less than 2 minutes.'
  },
  {
    icon: Shield,
    title: 'Automatic checks',
    desc: 'We run smart validations to catch duplicates, missing details, and policy issues early.'
  },
  {
    icon: Mail,
    title: 'Email notifications',
    desc: 'Stay updated at every step: received, under review, approved, or needs more info.'
  },
  {
    icon: CheckCircle,
    title: 'Fast approvals',
    desc: 'Once approved, funds are sent to your registered method quickly and securely.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl py-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl"
      >
        How it works
      </motion.h2>
      <p className="mt-2 text-center text-white/60">Simple, transparent, and built for speed.</p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              <s.icon size={22} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">{s.title}</h3>
            <p className="mt-1 text-sm text-white/60">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
