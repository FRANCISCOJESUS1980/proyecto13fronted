import CalendarioDias from '../../../../Clases/components/CalendarioDias/CalendarioDias'

const CalendarSection = ({
  currentMonth,
  selectedDate,
  visibleDates,
  calendarRef,
  handlePrevWeek,
  handleNextWeek,
  setSelectedDate
}) => {
  return (
    <div className='cf-calendar-section'>
      <div className='cf-calendar-header'>
        <h2 className='cf-calendar-title'>Calendario de {currentMonth}</h2>
      </div>

      <CalendarioDias
        selectedDate={selectedDate}
        visibleDates={visibleDates}
        calendarRef={calendarRef}
        handlePrevWeek={handlePrevWeek}
        handleNextWeek={handleNextWeek}
        setSelectedDate={setSelectedDate}
      />
    </div>
  )
}

export default CalendarSection
