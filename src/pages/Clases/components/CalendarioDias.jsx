import { isToday } from 'date-fns'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CalendarioDias = ({
  selectedDate,
  visibleDates,
  calendarRef,
  handlePrevWeek,
  handleNextWeek,
  setSelectedDate
}) => {
  return (
    <div className='calendario-container'>
      <button className='scroll-button left' onClick={handlePrevWeek}>
        <ChevronLeft size={20} />
      </button>
      <button className='scroll-button right' onClick={handleNextWeek}>
        <ChevronRight size={20} />
      </button>

      <div className='calendario-dias' ref={calendarRef}>
        {visibleDates.map((date) => {
          const dayName = format(date, 'EEEE', { locale: es })
          const dayNumber = format(date, 'd')
          const month = format(date, 'MMM', { locale: es })
          const isSelected =
            format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

          return (
            <button
              key={date.toString()}
              className={`dia-btn ${isSelected ? 'activo' : ''} ${
                isToday(date) ? 'hoy' : ''
              } ${isPast ? 'pasado' : ''}`}
              onClick={() => setSelectedDate(date)}
              disabled={isPast}
            >
              <span className='dia-nombre'>{dayName.slice(0, 3)}</span>
              <span className='dia-numero'>{dayNumber}</span>
              <span className='dia-mes'>{month}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarioDias
