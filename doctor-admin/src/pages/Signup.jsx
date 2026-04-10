import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirm password do not match.')
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'admin',
        }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        const fallback =
          'Signup API is currently rejecting admin registration. Update backend role support for admin registration.'
        throw new Error(payload.message || fallback)
      }

      setSuccess('Admin account created successfully. Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (requestError) {
      setError(requestError.message || 'Unable to create admin account right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-200/60 bg-gradient-to-br from-cyan-700 via-teal-700 to-emerald-700 p-8 text-white shadow-2xl shadow-cyan-900/25 sm:p-10">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

        <p className="mb-3 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50">
          Doctor Appointment Admin
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Create your admin workspace account.
        </h1>
        <p className="mt-4 max-w-lg text-sm text-cyan-50/95 sm:text-base">
          Register an admin profile to configure doctor records, patient access,
          and appointment operations centrally.
        </p>

        <div className="mt-8 grid gap-3 text-sm">
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Optimized onboarding form for admins</p>
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Client-side validation for safer inputs</p>
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Instant handoff to login after success</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-8">
        <h2 className="text-3xl font-bold text-slate-900">Admin Sign Up</h2>
        <p className="mt-2 text-sm text-slate-600">
          Create credentials for secure admin access.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">
              Full Name
            </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Hospital Admin"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="name"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            required
          />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Admin Email
            </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@hospital.com"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            required
          />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
                minLength={6}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
                minLength={6}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                required
              />
            </div>
          </div>

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-cyan-700/30 transition hover:from-cyan-700 hover:to-teal-700"
            disabled={submitting}
          >
            {submitting ? 'Creating Account...' : 'Create Admin Account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-teal-700 hover:text-teal-800">
            Login now
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Signup
