import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import ClaimForm from './components/ClaimForm';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';

function App() {
  const [claims, setClaims] = useState([]);
  const [role, setRole] = useState('student'); // 'student' | 'admin'

  const handleSubmit = async (payload) => {
    // Simulate creating a claim locally (no backend yet)
    const newClaim = {
      id: Math.random().toString(36).slice(2),
      studentName: payload.fullName,
      amount: payload.amount || 0,
      category: payload.category,
      description: payload.description,
      status: 'submitted',
    };
    setClaims((prev) => [newClaim, ...prev]);
    alert('Claim submitted! You will receive email updates as it progresses.');
  };

  const quickStats = useMemo(() => {
    const total = claims.length;
    const approved = claims.filter((c) => c.status === 'approved').length;
    const pending = claims.filter((c) => c.status !== 'approved' && c.status !== 'rejected').length;
    return { total, approved, pending };
  }, [claims]);

  return (
    <div className="min-h-screen bg-[radial-gradient(100%_100%_at_0%_0%,rgba(16,185,129,0.08),transparent_40%),radial-gradient(100%_100%_at_100%_0%,rgba(139,92,246,0.08),transparent_40%),#0b1220] text-white">
      <header className="mx-auto w-full max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-fuchsia-500" />
            <span className="text-lg font-semibold tracking-tight">Campus Reimburse</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-6 md:flex text-white/70">
              <a href="#how-it-works" className="hover:text-white">How it works</a>
              <a href="#apply" className="hover:text-white">Apply</a>
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white backdrop-blur"
            >
              <option className="bg-slate-900" value="student">Student</option>
              <option className="bg-slate-900" value="admin">Admin</option>
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-24">
        <Hero3D />

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm text-white/60">Total claims</div>
            <div className="mt-2 text-3xl font-semibold">{quickStats.total}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm text-white/60">Approved</div>
            <div className="mt-2 text-3xl font-semibold text-emerald-300">{quickStats.approved}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm text-white/60">Pending</div>
            <div className="mt-2 text-3xl font-semibold text-amber-300">{quickStats.pending}</div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ClaimForm onSubmit={handleSubmit} />
          <div>
            <HowItWorks />
          </div>
        </div>

        <Dashboard claims={claims} role={role} />
      </main>

      <footer className="border-t border-white/10/20 py-10 text-center text-white/50">
        Built for students • Smooth reimbursements • Modern 3D experience
      </footer>
    </div>
  );
}

export default App;
