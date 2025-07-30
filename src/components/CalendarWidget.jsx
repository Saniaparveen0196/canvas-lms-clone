import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/dashboard.module.css';

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, date: '2023-06-15', title: 'Web Dev Assignment Due' },
    { id: 2, date: '2023-06-18', title: 'DSA Chapter 5 Quiz' },
    { id: 3, date: '2023-06-20', title: 'Project Proposal Deadline' }
  ]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event => 
        format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      return dayEvents.length > 0 ? (
        <div className={styles.calendarDot}></div>
      ) : null;
    }
  };

  return (
    <div className={styles.calendarWidget}>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        className={styles.reactCalendar}
      />
      <div className={styles.upcomingEvents}>
        <h3>Upcoming Events</h3>
        {events
          .filter(event => new Date(event.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3)
          .map(event => (
            <div key={event.id} className={styles.eventItem}>
              <strong>{format(new Date(event.date), 'MMM dd')}</strong>: {event.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarWidget;