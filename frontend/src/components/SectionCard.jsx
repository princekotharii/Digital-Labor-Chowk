function SectionCard({ title, children, className = '' }) {
  return (
    <article className={`card ${className}`.trim()}>
      <h2>{title}</h2>
      {children}
    </article>
  )
}

export default SectionCard
