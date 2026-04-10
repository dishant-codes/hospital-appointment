import React from 'react'

const AllDoctors = ({ doctors }) => {
  if (!doctors.length) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
        No doctors found.
      </p>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <article
          key={doctor._id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5"
        >
          <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
          <div className="mt-3 space-y-1.5 text-sm text-slate-700">
            <p><span className="font-semibold">Email:</span> {doctor.email}</p>
            <p><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
            <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
            <p><span className="font-semibold">Contact:</span> {doctor.contactNumber}</p>
            <p><span className="font-semibold">Address:</span> {doctor.address}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default AllDoctors
