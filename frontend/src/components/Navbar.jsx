import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          🎯 PredictHub
        </div>
        <div className="flex gap-6 items-center">
          <a href="/" className="hover:text-blue-200">Home</a>
          {isAuthenticated && (
            <>
              <a href="/predictions" className="hover:text-blue-200">Predictions</a>
              <a href="/leaderboard" className="hover:text-blue-200">Leaderboard</a>
              <a href="/dashboard" className="hover:text-blue-200">Dashboard</a>
            </>
          )}
          <a href="/leaderboard" className="hover:text-blue-200">Rankings</a>
          
          {isAuthenticated ? (
            <>
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={() => navigate('/profile')}
                className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-700"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded bg-red-500 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-2 rounded bg-green-500 hover:bg-green-700"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-3 py-2 rounded bg-green-500 hover:bg-green-700"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
