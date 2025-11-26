import React from "react";
import Link from "next/link";
import db from "@/lib/db";

const AdminDashboard = async () => {
  // Fetch real counts from database
  const [
    patientCount,
    doctorCount,
    nurseCount,
    todayAppointments,
    recentPatients,
    upcomingAppointments
  ] = await Promise.all([
    db.patient.count(),
    db.doctor.count(),
    db.nurse.count(),
    db.appointment.count({
      where: {
        appointment_date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }
    }),
    db.patient.findMany({
      take: 4,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        created_at: true,
        img: true
      }
    }),
    db.appointment.findMany({
      take: 4,
      where: {
        appointment_date: {
          gte: new Date()
        },
        status: 'SCHEDULED'
      },
      orderBy: { appointment_date: 'asc' },
      include: {
        patient: {
          select: {
            first_name: true,
            last_name: true
          }
        },
        doctor: {
          select: {
            name: true
          }
        }
      }
    })
  ]);

  const patientGrowth = 12; // TODO: Calculate from historical data

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Patients</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{patientCount}</p>
              <p className="text-sm text-green-500 mt-1">↑ {patientGrowth}% from last month</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Doctors</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">{doctorCount}</p>
              <p className="text-sm text-gray-400 mt-1">Active staff</p>
            </div>
            <div className="text-4xl">👨‍⚕️</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Nurses</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">{nurseCount}</p>
              <p className="text-sm text-gray-400 mt-1">Active staff</p>
            </div>
            <div className="text-4xl">👩‍⚕️</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Today's Appointments</h3>
              <p className="text-3xl font-bold text-orange-600 mt-2">{todayAppointments}</p>
              <p className="text-sm text-gray-400 mt-1">Scheduled today</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/patients/new"
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
          >
            ➕ Add Patient
          </Link>
          <Link
            href="/admin/doctors/new"
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center"
          >
            ➕ Add Doctor
          </Link>
          <Link
            href="/admin/nurses/new"
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-center"
          >
            ➕ Add Nurse
          </Link>
          <Link
            href="/admin/appointments/new"
            className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-center"
          >
            📅 Schedule Appointment
          </Link>
        </div>
      </div>

      {/* Recent Activity & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Patients</h2>
          {recentPatients.length > 0 ? (
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {patient.img ? (
                        <img src={patient.img} alt="" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <span className="text-blue-600 font-semibold">
                          {patient.first_name[0]}{patient.last_name[0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{patient.first_name} {patient.last_name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(patient.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Active
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No patients yet</p>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {apt.patient.first_name} {apt.patient.last_name}
                    </p>
                    <p className="text-sm text-gray-500">{apt.doctor.name}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    {apt.appointment_time}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
          )}
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;