import React, { useMemo } from 'react'

const Appointments = ({ appointments, doctors, patients }) => {
  const doctorsById = useMemo(
    () =>
      doctors.reduce((accumulator, doctor) => {
        accumulator[doctor._id] = doctor
        return accumulator
      }, {}),
    [doctors]
  )

  const patientsById = useMemo(
    () =>
      patients.reduce((accumulator, patient) => {
        accumulator[patient._id] = patient
        return accumulator
      }, {}),
    [patients]
  )

  const getStatusClass = (status) => {
    if (status === 'scheduled') return 'bg-emerald-100 text-emerald-700'
    if (status === 'completed') return 'bg-blue-100 text-blue-700'
    if (status === 'cancelled') return 'bg-rose-100 text-rose-700'
    return 'bg-slate-200 text-slate-700'
  }

  if (!appointments.length) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
        No appointments found.
      </p>
    )
  }

  return (
    <div className="grid gap-4">
      {appointments.map((appointment) => {
        const doctor = doctorsById[appointment.doctorId]
        const patient = patientsById[appointment.patientId]

        return (
          <article
            key={appointment._id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {patient?.name || appointment.patientId}
                </h3>
                <p className="text-sm text-slate-600">Appointment ID: {appointment._id}</p>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>

            <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
              <p><span className="font-semibold">Doctor:</span> {doctor?.name || appointment.doctorId}</p>
              <p><span className="font-semibold">Date:</span> {new Date(appointment.appointmentDate).toLocaleDateString('en-CA')}</p>
              <p><span className="font-semibold">Time:</span> {appointment.appointmentTime}</p>
              <p><span className="font-semibold">Patient Email:</span> {patient?.email || 'N/A'}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Appointments
