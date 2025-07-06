import { memo } from 'react'
import { TABS } from '../constants/personalRecordsConstants.js'
import PersonalRecordsList from '../components/PersonalRecords/PersonalRecordList/PersonalRecordList.jsx'
import PersonalRecordsChart from '../components/PersonalRecords/PersonalRecordChart/PersonalRecordChart.jsx'
import Button from '../../../../../components/Button/Button'

const RecordsContent = memo(
  ({
    activeTab,
    records,
    recordsByCategory,
    uniqueExercises,
    error,
    onDelete,
    onEdit,
    onRetry
  }) => {
    if (error) {
      return (
        <div className='cf-marcas-error'>
          <div className='cf-marcas-error-icon'></div>
          <p>Error: {error}</p>
          <Button onClick={onRetry}>Reintentar</Button>
        </div>
      )
    }

    if (activeTab === TABS.CHART) {
      return (
        <div className='cf-marcas-chart-container'>
          <PersonalRecordsChart
            records={records}
            uniqueExercises={uniqueExercises}
          />
        </div>
      )
    }

    return (
      <div className='cf-marcas-list-container'>
        <PersonalRecordsList
          records={
            activeTab === TABS.ALL
              ? records
              : recordsByCategory[activeTab] || []
          }
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    )
  }
)

RecordsContent.displayName = 'RecordsContent'

export default RecordsContent
