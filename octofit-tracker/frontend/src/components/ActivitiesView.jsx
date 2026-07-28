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

const ActivitiesView = () => {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`)
        if (!response.ok) {
          throw new Error('Failed to load activities')
        }

        const data = await response.json()
        setActivities(getItems(data))
      } catch (err) {
        setError(err.message)
      }
    }

    fetchActivities()
  }, [])

  return (
    <SectionCard title="Activities" description="Recent workouts and logged effort.">
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {activities.length === 0 ? (
          <div className="col-12 text-muted">No activities found.</div>
        ) : (
          activities.map((activity) => (
            <div className="col-md-6" key={activity._id || activity.type}>
              <div className="border rounded-3 p-3 h-100">
                <h3 className="h6 mb-1">{activity.type}</h3>
                <p className="small text-muted mb-2">{activity.description}</p>
                <div className="small text-muted">Duration: {activity.duration || 'N/A'} • Distance: {activity.distance || 'N/A'}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  )
}

export default ActivitiesView
