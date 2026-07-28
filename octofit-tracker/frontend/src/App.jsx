import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier app for tracking workouts, teams, and progress.
              </p>
              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item">React 19 + Vite frontend</li>
                <li className="list-group-item">Express + TypeScript backend</li>
                <li className="list-group-item">MongoDB access via Mongoose</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
