function Predictions() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Predictions</h1>
      <div className="grid gap-4">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Event Title</h3>
          <p className="text-gray-600 mb-4">Description of the event goes here...</p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">UP</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">DOWN</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictions
