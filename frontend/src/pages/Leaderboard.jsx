import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboard } from '../store/slices/leaderboardSlice'

function Leaderboard() {
  const dispatch = useDispatch()
  const { leaderboard, loading } = useSelector(state => state.leaderboard)

  useEffect(() => {
    dispatch(fetchLeaderboard())
  }, [dispatch])

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Global Leaderboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">Player</th>
                <th className="px-6 py-3 text-left">Predictions</th>
                <th className="px-6 py-3 text-left">Accuracy</th>
                <th className="px-6 py-3 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <tr key={entry.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">#{index + 1}</td>
                    <td className="px-6 py-4">{entry.name}</td>
                    <td className="px-6 py-4">{entry.totalPredictions}</td>
                    <td className="px-6 py-4">{entry.accuracy}%</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{entry.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-600">
                    No leaderboard data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
