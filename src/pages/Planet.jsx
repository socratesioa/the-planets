import { useParams } from 'react-router-dom'
import { planets } from '../data/planets'
import PlanetTabs from '../components/PlanetTabs/PlanetTabs'

function Planet() {
  const { slug } = useParams()
  const planet = planets.find((p) => p.slug === slug)

  if (!planet) {
    return <h1>Planet not found</h1>
  }

  return (
    <div className="planet__page-container">
      
      <PlanetTabs planet={planet} />

      <div className='planet__page-stats--container'>
        <dl className="planet__stats">
          <div className="planet__stat">
            <dt>Rotation Time</dt>
            <dd>{planet.rotation}</dd>
          </div>
          <div className="planet__stat">
            <dt>Revolution Time</dt>
            <dd>{planet.revolution}</dd>
          </div>
          <div className="planet__stat">
            <dt>Radius</dt>
            <dd>{planet.radius}</dd>
          </div>
          <div className="planet__stat">
            <dt>Average Temp.</dt>
            <dd>{planet.temperature}</dd>
          </div>
      </dl>
      </div>
    </div>
  )
}

export default Planet