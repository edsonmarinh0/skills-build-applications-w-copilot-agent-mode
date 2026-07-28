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

const WorkoutsView = () => {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`)
        if (!response.ok) {
          throw new Error('Failed to load workouts')
        }

        const data = await response.json()
        setWorkouts(getItems(data))
      } catch (err) {
        setError(err.message)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <SectionCard title="Workouts" description="Suggested training plans to keep momentum high.">
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {workouts.length === 0 ? (
          <div className="col-12 text-muted">No workouts found.</div>
        ) : (
          workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.name}>
              <div className="border rounded-3 p-3 h-100">
                <h3 className="h6 mb-1">{workout.name}</h3>
                <p className="small text-muted mb-2">{workout.description}</p>
                <span className="badge bg-info-subtle text-info">{workout.focus || 'General'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  )
}

export default WorkoutsView
