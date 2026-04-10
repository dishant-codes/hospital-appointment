import React, { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddUserModal from '../components/AddUserModal'
import AllDoctors from '../components/AllDoctors'
import Allpatients from '../components/Allpatients'
import Appointments from '../components/Appointments'
import {
  createAppointment,
  createDoctor,
  createPatient,
  getAllAppointments,
  getAllDoctors,
  getAllPatients,
} from '../api/api'

const Dashbaord = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('doctors')
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const token = localStorage.getItem('adminToken')

  const fetchDashboardData = async () => {
    if (!token) {
      navigate('/login')
      return
    }

    try {
      setLoading(true)
      setError('')

      const [doctorsData, patientsData, appointmentsData] = await Promise.all([
        getAllDoctors(token),
        getAllPatients(token),
        getAllAppointments(token),
      ])

      setDoctors(Array.isArray(doctorsData) ? doctorsData : [])
      setPatients(Array.isArray(patientsData) ? patientsData : [])
      setAppointments(Array.isArray(appointmentsData) ? appointmentsData : [])
    } catch (requestError) {
      const apiMessage = requestError?.response?.data?.message
      setError(apiMessage || requestError.message || 'Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stats = useMemo(
    () => ({
      doctors: doctors.length,
      patients: patients.length,
      appointments: appointments.length,
      scheduled: appointments.filter((item) => item.status === 'scheduled').length,
    }),
    [doctors, patients, appointments]
  )

  const modalType = activeTab === 'doctors' ? 'doctor' : activeTab === 'patients' ? 'patient' : 'appointment'

  const handleAddEntry = async (payload) => {
    try {
      setSubmitting(true)
      if (modalType === 'doctor') {
        await createDoctor(payload, token)
      } else if (modalType === 'patient') {
        await createPatient(payload, token)
      } else {
        await createAppointment(payload, token)
      }

      setIsModalOpen(false)
      await fetchDashboardData()
    } catch (requestError) {
      const apiMessage = requestError?.response?.data?.error || requestError?.response?.data?.message
      setError(apiMessage || requestError.message || 'Failed to create entry.')
    } finally {
      setSubmitting(false)
    }
  }

  const onLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminId')
    navigate('/login')
  }

  return (
    <section className="min-h-dvh px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="mb-2 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                Admin Dashboard
              </p>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Hospital Management</h1>
              <p className="mt-1 text-slate-600">
                Manage doctors, patients, appointments, and add new records.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={fetchDashboardData}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Doctors</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{stats.doctors}</p>
            </article>
            <article className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
              <p className="text-sm text-cyan-700">Patients</p>
              <p className="mt-1 text-2xl font-bold text-cyan-800">{stats.patients}</p>
            </article>
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Appointments</p>
              <p className="mt-1 text-2xl font-bold text-emerald-800">{stats.appointments}</p>
            </article>
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-700">Scheduled</p>
              <p className="mt-1 text-2xl font-bold text-amber-800">{stats.scheduled}</p>
            </article>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('doctors')}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  activeTab === 'doctors' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
                }`}
              >
                All Doctors
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('patients')}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  activeTab === 'patients' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
                }`}
              >
                All Patients
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('appointments')}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  activeTab === 'appointments' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'
                }`}
              >
                All Appointments
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-2 text-sm font-semibold text-white"
            >
              {activeTab === 'doctors'
                ? 'Add Doctor'
                : activeTab === 'patients'
                  ? 'Add Patient'
                  : 'Add Appointment'}
            </button>
          </div>
        </header>

        {error ? (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</p>
        ) : null}

        <div className="mt-6">
          {loading ? (
            <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600">
              Loading dashboard data...
            </p>
          ) : null}

          {!loading && activeTab === 'doctors' ? <AllDoctors doctors={doctors} /> : null}
          {!loading && activeTab === 'patients' ? <Allpatients patients={patients} /> : null}
          {!loading && activeTab === 'appointments' ? (
            <Appointments appointments={appointments} doctors={doctors} patients={patients} />
          ) : null}
        </div>
      </div>

      <AddUserModal
        key={`${modalType}-${isModalOpen}`}
        isOpen={isModalOpen}
        type={modalType}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEntry}
        submitting={submitting}
        doctors={doctors}
        patients={patients}
      />
    </section>
  )
}

export default Dashbaord
