import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import ActivitiesView from './components/ActivitiesView'
import LeaderboardView from './components/LeaderboardView'
import TeamsView from './components/TeamsView'
import UsersView from './components/UsersView'
import WorkoutsView from './components/WorkoutsView'

const links = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function HomeView() {
  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-md-5">
        <p className="text-uppercase small fw-semibold text-primary">OctoFit Tracker</p>
        <h1 className="display-6 fw-bold mb-3">Build momentum with a connected fitness dashboard.</h1>
        <p className="lead text-muted mb-4">
          Explore athletes, teams, recent activities, training suggestions, and live ranking data from the backend API.
        </p>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="border rounded-3 p-3 h-100">
              <h2 className="h6 mb-2">Community overview</h2>
              <p className="small text-muted mb-0">Review members, squads, and performance data in one place.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border rounded-3 p-3 h-100">
              <h2 className="h6 mb-2">Environment-aware API</h2>
              <p className="small text-muted mb-0">The frontend automatically targets the correct backend host in Codespaces or localhost.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="bg-dark text-white">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <p className="text-uppercase small mb-1 text-light-emphasis">Fitness command center</p>
              <h1 className="h3 mb-0">OctoFit Tracker</h1>
            </div>
            <nav className="d-flex flex-wrap gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `nav-link px-3 py-2 rounded-3 ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/teams" element={<TeamsView />} />
          <Route path="/activities" element={<ActivitiesView />} />
          <Route path="/leaderboard" element={<LeaderboardView />} />
          <Route path="/workouts" element={<WorkoutsView />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
