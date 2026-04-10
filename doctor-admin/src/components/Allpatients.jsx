import React from 'react'

const Allpatients = ({ patients }) => {
  if (!patients.length) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
        No patients found.
      </p>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {patients.map((patient) => (
        <article
          key={patient._id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5"
        >
          <h3 className="text-lg font-bold text-slate-900">{patient.name}</h3>
          <div className="mt-3 space-y-1.5 text-sm text-slate-700">
            <p><span className="font-semibold">Email:</span> {patient.email}</p>
            <p><span className="font-semibold">Age:</span> {patient.age}</p>
            <p><span className="font-semibold">Contact:</span> {patient.contactNumber}</p>
            <p><span className="font-semibold">Address:</span> {patient.address}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Allpatients
