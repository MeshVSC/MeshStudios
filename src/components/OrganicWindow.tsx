import { useState } from 'react'
import '../styles/organicEffects.css'

type OrganicType = 'fluid' | 'cells' | 'noise'

interface OrganicWindowProps {
  className?: string
}

export const OrganicWindow = ({ className = '' }: OrganicWindowProps) => {
  const [activeType, setActiveType] = useState<OrganicType>('fluid')

  const organicOptions = [
    {
      id: 'fluid' as OrganicType,
      label: 'Fluid Dynamics',
      description: 'Textural Organic'
    },
    {
      id: 'cells' as OrganicType,
      label: 'Morphing Cells',
      description: 'Natural Forms'
    },
    {
      id: 'noise' as OrganicType,
      label: 'Noise Patterns',
      description: 'Abstract Organic'
    }
  ]

  return (
    <div className={`organic-window-container ${className}`}>
      {/* Geometric Square Window */}
      <div className="organic-window">
        <div className="organic-content">
          {/* Fluid Dynamics */}
          {activeType === 'fluid' && (
            <div className="organic-fluid">
              <div className="fluid-blob blob-1"></div>
              <div className="fluid-blob blob-2"></div>
              <div className="fluid-blob blob-3"></div>
              <div className="fluid-particle particle-1"></div>
              <div className="fluid-particle particle-2"></div>
              <div className="fluid-particle particle-3"></div>
              <div className="fluid-particle particle-4"></div>
            </div>
          )}

          {/* Morphing Cells */}
          {activeType === 'cells' && (
            <div className="organic-cells">
              <div className="cell cell-1"></div>
              <div className="cell cell-2"></div>
              <div className="cell cell-3"></div>
              <div className="cell cell-4"></div>
              <div className="cell cell-5"></div>
            </div>
          )}

          {/* Noise Patterns */}
          {activeType === 'noise' && (
            <div className="organic-noise">
              <div className="noise-layer layer-1"></div>
              <div className="noise-layer layer-2"></div>
              <div className="noise-layer layer-3"></div>
            </div>
          )}
        </div>
      </div>

      {/* Selection Buttons */}
      <div className="organic-controls">
        {organicOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveType(option.id)}
            className={`organic-button ${activeType === option.id ? 'active' : ''}`}
          >
            <div className="button-label">{option.label}</div>
            <div className="button-description">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}