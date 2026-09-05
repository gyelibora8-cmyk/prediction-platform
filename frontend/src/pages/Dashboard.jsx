function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Your Stats</h3>
          <div className="space-y-2">
            <p>Total Predictions: <span className="font-bold">15</span></p>
            <p>Accuracy Rate: <span className="font-bold text-green-600">73%</span></p>
            <p>Current Rank: <span className="font-bold">42</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <p className="text-gray-600">Your activity will appear here...</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
