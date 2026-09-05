import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to PredictHub</h1>
        <p className="text-xl mb-8">Test your prediction skills and compete with others</p>
        {!isAuthenticated && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-bold"
            >
              Login
            </button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Make Predictions</h3>
          <p className="text-gray-600">Analyze events and make informed predictions on various outcomes.</p>
        </div>
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-bold mb-2">Compete Globally</h3>
          <p className="text-gray-600">Join leaderboards and compete against players worldwide.</p>
        </div>
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
          <p className="text-gray-600">Build your reputation and earn points for accurate predictions.</p>
        </div>
      </section>

      {/* CTA Section */}
      {isAuthenticated && (
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Predicting?</h2>
          <button
            onClick={() => navigate('/predictions')}
            className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-bold"
          >
            View Active Predictions
          </button>
        </section>
      )}
    </div>
  )
}

export default Home
