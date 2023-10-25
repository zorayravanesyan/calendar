import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-time-picker/dist/TimePicker.css';
import 'react-calendar/dist/Calendar.css';
import { database, ref, get,  push, query, orderByChild, equalTo } from './firebase'; 
import './CalendarComponent.css';


function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const currentDate = new Date();

  const handleDateSelect = (date) => {
    if (date >= currentDate) {
      setSelectedDate(date);
      setSelectedTime(null);
      setSelectedButton(null);
    }
  };


  const handleTimeSelect = async (time, button) => {
    if (!selectedDate) {
      alert('Please select a date first.');
      return;
    }

    setSelectedTime(time);
    setSelectedButton(button);

    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}.${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}.${selectedDate.getFullYear()}`;
    const dateTime = `${formattedDate} ${time}`;

    const appointmentsQuery = query(
      ref(database, 'appointments'),
      orderByChild('date'),
      equalTo(dateTime)
    );

    try {
      const snapshot = await get(appointmentsQuery);
      if (snapshot.exists()) {
        alert('This time is already booked. Please choose another time.');
        setSelectedTime(null);
        setSelectedButton(null);
      }
    } catch (error) {
      console.error('Error checking appointment:', error);
    }
  };
  
  const handleSave = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = `${selectedDate.getDate()}.${selectedDate.getMonth() + 1}.${selectedDate.getFullYear()}`;
      const dateData = {
        day: formattedDate,
        hours: selectedTime,
      };
      saveAppointment(dateData);
    }
  };

  const saveAppointment = (dateData) => {
    push(ref(database, 'appointments'), dateData)
      .then(() => {
        alert('Appointment saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving appointment:', error);
      });
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <h1>Calendar</h1>
        <Calendar
          onChange={handleDateSelect}
          value={selectedDate}
          minDate={currentDate}
        />
      </div>
      {selectedDate && (
        <div className="time-picker">
          <h2>Select a time:</h2>
          <div className="time-buttons">
            {[...Array(15)].map((_, index) => {
              const hour = 8 + index;
              const timeString = `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;
              return (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(timeString, index)}
                  className={selectedButton === index ? 'selected' : ''}
                >
                  <i className="far fa-clock"></i> {timeString}
                </button>
              );
            })}
          </div>
          {selectedTime && (
            <div className="selected-time">
              <h3>Selected time:</h3>
              {selectedTime}
            </div>
          )}
          <button onClick={handleSave} className="save">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
