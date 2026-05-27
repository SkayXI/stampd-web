const cities = [
  'Cairo', 'Alexandria', 'Riyadh', 'Dubai', 'Amman',
  'Casablanca', 'Beirut', 'Kuwait City', 'Doha', 'Giza',
]

export default function LogoMarquee() {
  // Duplicate for seamless loop
  const track = [...cities, ...cities]

  return (
    <div id="logos">
      <p className="logos-label">Trusted by cafés in</p>
      <div className="logos-track-wrap">
        <div className="logos-track">
          {track.map((city, i) => (
            <span key={i}>{city}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
