const SectionCard = ({ title, description, children }) => (
  <section className="card shadow-sm border-0 mb-4">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="h4 mb-1">{title}</h2>
          <p className="text-muted mb-0">{description}</p>
        </div>
      </div>
      {children}
    </div>
  </section>
)

export default SectionCard
