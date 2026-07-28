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

const TeamsView = () => {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`)
        if (!response.ok) {
          throw new Error('Failed to load teams')
        }

        const data = await response.json()
        setTeams(getItems(data))
      } catch (err) {
        setError(err.message)
      }
    }

    fetchTeams()
  }, [])

  return (
    <SectionCard title="Teams" description="Training squads competing for the top spot.">
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {teams.length === 0 ? (
          <div className="col-12 text-muted">No teams found.</div>
        ) : (
          teams.map((team) => (
            <div className="col-md-6" key={team._id || team.name}>
              <div className="border rounded-3 p-3 h-100">
                <h3 className="h6 mb-1">{team.name}</h3>
                <p className="small text-muted mb-2">{team.description}</p>
                <span className="badge bg-success-subtle text-success">{team.members?.length || 0} members</span>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  )
}

export default TeamsView
