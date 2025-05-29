// src/components/Calendar/CalendarHeader/CalendarHeader.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDisplayTitle } from '../../utils/dateUtils';
import { VIEW_OPTIONS } from '../../utils/constants';
import './CalendarHeader.css';

const CalendarHeader = ({
    currentDate,
    view,
    onNavigatePrevious,
    onNavigateNext,
    onViewChange
}) => {
    return (
        <div className="calendar-header">
            <h1 className="app-title">Calendar Planner</h1>

            <div className="controls-row">
                <div className="navigation">
                    <button
                        onClick={onNavigatePrevious}
                        className="nav-button"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <h2 className="date-title">
                        {getDisplayTitle(currentDate, view)}
                    </h2>

                    <button
                        onClick={onNavigateNext}
                        className="nav-button"
                        aria-label="Next"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="view-switcher">
                    {VIEW_OPTIONS.map(option => (
                        <button
                            key={option.value}
                            onClick={() => onViewChange(option.value)}
                            className={`view-button ${view === option.value ? 'active' : ''}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarHeader;