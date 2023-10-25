import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarComponent from './CalendarComponent';


function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Календарь</h1>
      <Calendar
        onChange={handleDateSelect}
        value={selectedDate}
      />
    </div>
  );
}

export default CalendarComponent;
