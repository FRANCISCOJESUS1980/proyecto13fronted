import { useEffect, useRef } from 'react'
import { isToday, isPast } from 'date-fns'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './CalendarioDias.css'
const CalendarioDias = ({
  selectedDate,
  visibleDates,
  calendarRef,
  handlePrevWeek,
  handleNextWeek,
  setSelectedDate
}) => {
  const todayRef = useRef(null)

  useEffect(() => {
    if (todayRef.current && calendarRef.current) {
      calendarRef.current.scrollTo({
        left: todayRef.current.offsetLeft - calendarRef.current.offsetLeft,
        behavior: 'smooth'
      })
    }
  }, [visibleDates])

  return (
    <div className='cf-calendario-container'>
      <div className='cf-calendario-controls'>
        <button
          className='cf-calendario-nav-btn'
          onClick={handlePrevWeek}
          aria-label='Semana anterior'
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className='cf-calendario-nav-btn'
          onClick={handleNextWeek}
          aria-label='Semana siguiente'
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className='cf-calendario-dias' ref={calendarRef}>
        {visibleDates.map((date) => {
          const dayName = format(date, 'EEEE', { locale: es })
          const dayNumber = format(date, 'd')
          const month = format(date, 'MMM', { locale: es })
          const isSelected =
            format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          const isPastDay =
            isPast(new Date(date.setHours(23, 59, 59, 999))) && !isToday(date)

          return (
            <button
              key={date.toString()}
              ref={isToday(date) ? todayRef : null}
              className={`cf-calendario-dia ${
                isSelected ? 'cf-calendario-dia-selected' : ''
              } ${isToday(date) ? 'cf-calendario-dia-today' : ''} ${
                isPastDay ? 'cf-calendario-dia-past' : ''
              }`}
              onClick={() => setSelectedDate(date)}
              disabled={isPastDay}
            >
              <span className='cf-calendario-dia-name'>
                {dayName.slice(0, 3)}
              </span>
              <span className='cf-calendario-dia-number'>{dayNumber}</span>
              <span className='cf-calendario-dia-month'>{month}</span>
              {isToday(date) && (
                <span className='cf-calendario-dia-today-indicator'></span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarioDias
