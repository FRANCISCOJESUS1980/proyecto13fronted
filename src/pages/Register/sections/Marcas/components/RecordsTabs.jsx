import { memo } from 'react'
import { TABS } from '../constants/personalRecordsConstants.js'

const RecordsTabs = memo(({ activeTab, recordsByCategory, onTabChange }) => {
  return (
    <div className='cf-marcas-tabs'>
      <button
        className={`cf-marcas-tab-btn ${
          activeTab === TABS.ALL ? 'cf-marcas-active' : ''
        }`}
        onClick={() => onTabChange(TABS.ALL)}
      >
        <span className='cf-marcas-tab-icon cf-marcas-all-icon'></span>
        Todas
      </button>

      {Object.keys(recordsByCategory).map((category) => (
        <button
          key={category}
          className={`cf-marcas-tab-btn ${
            activeTab === category ? 'cf-marcas-active' : ''
          }`}
          onClick={() => onTabChange(category)}
        >
          <span className='cf-marcas-tab-icon cf-marcas-category-icon'></span>
          {category}
        </button>
      ))}

      <button
        className={`cf-marcas-tab-btn ${
          activeTab === TABS.CHART ? 'cf-marcas-active' : ''
        }`}
        onClick={() => onTabChange(TABS.CHART)}
      >
        <span className='cf-marcas-tab-icon cf-marcas-chart-icon'></span>
        Gráficos
      </button>
    </div>
  )
})

RecordsTabs.displayName = 'RecordsTabs'

export default RecordsTabs
