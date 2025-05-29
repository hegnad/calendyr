import React, { useState } from 'react';
import CalendarHeader from './components/Calendar/CalendarHeader/CalendarHeader';
import { getMonthDays, isToday, navigatePrevious, navigateNext } from './utils/dateUtils';
import './App.css';

const CalendarApp = () => {
    // State for current date and view mode
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'month', 'week', 'day'
    const [events, setEvents] = useState([]);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Navigation handlers
    const handleNavigatePrevious = () => {
        setCurrentDate(navigatePrevious(currentDate, view));
    };

    const handleNavigateNext = () => {
        setCurrentDate(navigateNext(currentDate, view));
    };

    // Handle day click
    const handleDayClick = (date) => {
        if (!date) return;
        setSelectedDate(date);
        setShowEventModal(true);
    };

    // Render month view
    const renderMonthView = () => {
        const days = getMonthDays(currentDate);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div className="calendar-grid">
                {/* Week day headers */}
                <div className="week-header">
                    {weekDays.map(day => (
                        <div key={day} className="week-day-header">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="days-grid">
                    {days.map((date, index) => (
                        <div
                            key={index}
                            onClick={() => handleDayClick(date)}
                            className={`
                day-cell
                ${!date ? 'empty-day' : ''}
                ${isToday(date) ? 'today' : ''}
              `}
                        >
                            {date && (
                                <div className="day-number">
                                    {date.getDate()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Placeholder for other views
    const renderWeekView = () => (
        <div className="placeholder-view">
            Week view coming soon...
        </div>
    );

    const renderDayView = () => (
        <div className="placeholder-view">
            Day view coming soon...
        </div>
    );

    return (
        <div className="app-container">
            {/* Header */}
            <CalendarHeader
                currentDate={currentDate}
                view={view}
                onNavigatePrevious={handleNavigatePrevious}
                onNavigateNext={handleNavigateNext}
                onViewChange={setView}
            />

            {/* Calendar content */}
            <div className="calendar-content">
                {view === 'month' && renderMonthView()}
                {view === 'week' && renderWeekView()}
                {view === 'day' && renderDayView()}
            </div>

            {/* Simple modal */}
            {showEventModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="modal-title">
                            Add Event - {selectedDate?.toLocaleDateString()}
                        </h3>
                        <p className="modal-text">Event creation form coming soon...</p>
                        <button
                            onClick={() => setShowEventModal(false)}
                            className="close-button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarApp;