function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">Active Events</h3>
          <p className="text-3xl font-bold text-green-600">42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">Total Predictions</h3>
          <p className="text-3xl font-bold text-purple-600">8,932</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
