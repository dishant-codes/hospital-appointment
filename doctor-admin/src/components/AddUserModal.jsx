import React, { useState } from 'react'

const initialFormState = {
  name: '',
  email: '',
  age: '',
  contactNumber: '',
  password: '',
  specialization: '',
  experience: '',
  address: '',
  patientId: '',
  doctorId: '',
  appointmentDate: '',
  appointmentTime: '',
  status: 'scheduled',
}

const AddUserModal = ({
  isOpen,
  type,
  onClose,
  onSubmit,
  submitting,
  doctors = [],
  patients = [],
}) => {
  const [formData, setFormData] = useState(initialFormState)
  const [error, setError] = useState('')

  const handleClose = () => {
    setFormData(initialFormState)
    setError('')
    onClose()
  }

  if (!isOpen) {
    return null
  }

  const modalTitle =
    type === 'doctor'
      ? 'Add New Doctor'
      : type === 'patient'
        ? 'Add New Patient'
        : 'Add New Appointment'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    try {
      if (type === 'doctor') {
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          age: Number(formData.age),
          contactNumber: formData.contactNumber.trim(),
          password: formData.password,
          specialization: formData.specialization.trim(),
          experience: Number(formData.experience),
          address: formData.address.trim(),
        }
        onSubmit(payload)
        return
      }

      if (type === 'patient') {
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          age: Number(formData.age),
          contactNumber: formData.contactNumber.trim(),
          password: formData.password,
          address: formData.address.trim(),
        }
        onSubmit(payload)
        return
      }

      const payload = {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        status: formData.status,
      }
      onSubmit(payload)
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit form')
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{modalTitle}</h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-700"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(type === 'doctor' || type === 'patient') && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="rounded-xl border border-slate-300 px-3 py-2.5"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  className="rounded-xl border border-slate-300 px-3 py-2.5"
                  required
                />
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  type="number"
                  min="1"
                  className="rounded-xl border border-slate-300 px-3 py-2.5"
                  required
                />
                <input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact number"
                  className="rounded-xl border border-slate-300 px-3 py-2.5"
                  required
                />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  className="rounded-xl border border-slate-300 px-3 py-2.5"
                  required
                />
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="rounded-xl border border-slate-300 px-3 py-2.5"
                  required
                />
              </div>

              {type === 'doctor' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Specialization"
                    className="rounded-xl border border-slate-300 px-3 py-2.5"
                    required
                  />
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience (years)"
                    type="number"
                    min="0"
                    className="rounded-xl border border-slate-300 px-3 py-2.5"
                    required
                  />
                </div>
              )}
            </>
          )}

          {type === 'appointment' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="rounded-xl border border-slate-300 px-3 py-2.5"
                required
              >
                <option value="">Select patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name} ({patient.email})
                  </option>
                ))}
              </select>

              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="rounded-xl border border-slate-300 px-3 py-2.5"
                required
              >
                <option value="">Select doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} ({doctor.specialization})
                  </option>
                ))}
              </select>

              <input
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                type="date"
                className="rounded-xl border border-slate-300 px-3 py-2.5"
                required
              />
              <input
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                placeholder="10:00 AM - 11:00 AM"
                className="rounded-xl border border-slate-300 px-3 py-2.5"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-xl border border-slate-300 px-3 py-2.5"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-2 font-semibold text-white"
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal
