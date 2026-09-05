function UserProfile() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">User Profile</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded" disabled />
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded" disabled />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Statistics</h3>
          <div className="space-y-2">
            <p>Total Predictions: <span className="font-bold">15</span></p>
            <p>Correct: <span className="font-bold text-green-600">11</span></p>
            <p>Incorrect: <span className="font-bold text-red-600">4</span></p>
            <p>Win Rate: <span className="font-bold">73%</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
