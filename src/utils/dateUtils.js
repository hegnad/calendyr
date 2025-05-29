// src/utils/dateUtils.js

/**
 * Get display title for the calendar header
 * @param {Date} date - Current date
 * @param {string} view - Current view ('month', 'week', 'day')
 * @returns {string} Formatted date string
 */
export const getDisplayTitle = (date, view) => {
    const options = {
        month: 'long',
        year: 'numeric',
        ...(view === 'day' && { day: 'numeric' })
    };
    return date.toLocaleDateString('en-US', options);
};

/**
 * Get all days to display in month view
 * @param {Date} date - Current date
 * @returns {Array} Array of Date objects and null values for empty cells
 */
export const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of month and how many days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
    }

    return days;
};

/**
 * Check if a date is today
 * @param {Date|null} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

/**
 * Navigate to previous period based on view
 * @param {Date} currentDate - Current date
 * @param {string} view - Current view ('month', 'week', 'day')
 * @returns {Date} New date
 */
export const navigatePrevious = (currentDate, view) => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
        newDate.setDate(newDate.getDate() - 7);
    } else {
        newDate.setDate(newDate.getDate() - 1);
    }
    return newDate;
};

/**
 * Navigate to next period based on view
 * @param {Date} currentDate - Current date
 * @param {string} view - Current view ('month', 'week', 'day')
 * @returns {Date} New date
 */
export const navigateNext = (currentDate, view) => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
        newDate.setDate(newDate.getDate() + 7);
    } else {
        newDate.setDate(newDate.getDate() + 1);
    }
    return newDate;
};