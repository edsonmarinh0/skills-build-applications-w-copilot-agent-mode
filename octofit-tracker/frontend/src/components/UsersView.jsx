import { useEffect, useState } from 'react'
import SectionCard from './SectionCard'
import { getApiBaseUrl, getItems } from './api'

const UsersView = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`)
        if (!response.ok) {
          throw new Error('Failed to load users')
        }

        const data = await response.json()
        setUsers(getItems(data))
      } catch (err) {
        setError(err.message)
      }
    }

    fetchUsers()
  }, [])

  return (
    <SectionCard title="Users" description="Members of the OctoFit community.">
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {users.length === 0 ? (
          <div className="col-12 text-muted">No users found.</div>
        ) : (
          users.map((user) => (
            <div className="col-md-6 col-xl-4" key={user._id || user.email}>
              <div className="border rounded-3 p-3 h-100">
                <h3 className="h6 mb-1">{user.name}</h3>
                <p className="small text-muted mb-2">{user.email}</p>
                <span className="badge bg-primary-subtle text-primary">{user.role || 'Member'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  )
}

export default UsersView
