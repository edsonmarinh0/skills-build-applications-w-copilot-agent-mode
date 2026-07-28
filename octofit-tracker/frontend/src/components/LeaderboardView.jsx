import { useEffect, useState } from 'react'
import SectionCard from './SectionCard'

const getApiBaseUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codeSpaceName) {
    return `https://${codeSpaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const getItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  return []
}

const LeaderboardView = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`)
        if (!response.ok) {
          throw new Error('Failed to load leaderboard')
        }

        const data = await response.json()
        setLeaderboard(getItems(data))
      } catch (err) {
        setError(err.message)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <SectionCard title="Leaderboard" description="The current ranking of top performers.">
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {leaderboard.length === 0 ? (
          <div className="text-muted">No leaderboard entries found.</div>
        ) : (
          leaderboard.map((entry, index) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || `${entry.name}-${index}`}>
              <div>
                <div className="fw-semibold">{entry.name}</div>
                <div className="small text-muted">{entry.team || 'Independent'}</div>
              </div>
              <span className="badge bg-warning-subtle text-warning">{entry.points || 0} pts</span>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  )
}

export default LeaderboardView
