import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from '../api/api'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and password are required.')
      return
    }

    try {
      setSubmitting(true)
      const payload = await adminLogin({
        email: formData.email,
        password: formData.password,
      })

      if (payload.token) {
        localStorage.setItem('adminToken', payload.token)
      }
      localStorage.setItem('adminEmail', formData.email)
      if (payload.adminId) {
        localStorage.setItem('adminId', payload.adminId)
      }
      navigate('/dashboard')
    } catch (requestError) {
      const apiMessage = requestError?.response?.data?.message
      setError(apiMessage || requestError.message || 'Unable to login at the moment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-teal-200/60 bg-gradient-to-br from-teal-700 via-emerald-700 to-cyan-700 p-8 text-white shadow-2xl shadow-teal-900/25 sm:p-10">
        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

        <p className="mb-3 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50">
          Doctor Appointment Admin
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Control your clinic operations from one place.
        </h1>
        <p className="mt-4 max-w-lg text-sm text-emerald-50/95 sm:text-base">
          Sign in as admin to monitor appointments, review doctor activity, and
          keep patient operations smooth.
        </p>

        <div className="mt-8 grid gap-3 text-sm">
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Role-based admin authentication</p>
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Fast dashboard handoff after login</p>
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Clean, responsive form flow</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-8">
        <h2 className="text-3xl font-bold text-slate-900">Admin Login</h2>
        <p className="mt-2 text-sm text-slate-600">
          Enter your admin credentials to continue.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            minLength={6}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            required
          />
          </div>

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-teal-700/30 transition hover:from-teal-700 hover:to-emerald-700"
            disabled={submitting}
          >
            {submitting ? 'Signing In...' : 'Login as Admin'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Need a new admin account?{' '}
          <Link to="/signup" className="font-semibold text-teal-700 hover:text-teal-800">
            Create one here
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Login
