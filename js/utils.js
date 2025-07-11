// Utility functions for common operations

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Format employee name for display
 * @param {Object} employee - The employee object
 * @returns {string} - The formatted name
 */
function formatEmployeeName(employee) {
    return `${employee.firstName} ${employee.lastName}`;
}

/**
 * Get unique values from an array of objects by a specific key
 * @param {Array} array - The array of objects
 * @param {string} key - The key to extract unique values from
 * @returns {Array} - Array of unique values
 */
function getUniqueValues(array, key) {
    return [...new Set(array.map(item => item[key]))].filter(Boolean).sort();
}

/**
 * Filter employees based on search criteria
 * @param {Array} employees - The array of employees
 * @param {Object} filters - The filter criteria
 * @returns {Array} - Filtered employees
 */
function filterEmployees(employees, filters) {
    return employees.filter(employee => {
        // Search filter (name or email)
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
            const email = employee.email.toLowerCase();
            
            if (!fullName.includes(searchTerm) && !email.includes(searchTerm)) {
                return false;
            }
        }

        // First name filter
        if (filters.firstName) {
            const firstNameFilter = filters.firstName.toLowerCase();
            if (!employee.firstName.toLowerCase().includes(firstNameFilter)) {
                return false;
            }
        }

        // Department filter
        if (filters.department && employee.department !== filters.department) {
            return false;
        }

        // Role filter
        if (filters.role && employee.role !== filters.role) {
            return false;
        }

        return true;
    });
}

/**
 * Sort employees based on a field and direction
 * @param {Array} employees - The array of employees
 * @param {string} field - The field to sort by
 * @param {string} direction - The sort direction ('asc' or 'desc')
 * @returns {Array} - Sorted employees
 */
function sortEmployees(employees, field, direction = 'asc') {
    return [...employees].sort((a, b) => {
        let aValue = a[field];
        let bValue = b[field];

        // Handle string comparisons
        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (direction === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });
}

/**
 * Paginate an array
 * @param {Array} array - The array to paginate
 * @param {number} page - The current page (1-based)
 * @param {number} limit - The number of items per page
 * @returns {Object} - Pagination result with data and metadata
 */
function paginate(array, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = array.slice(startIndex, endIndex);
    
    return {
        data,
        currentPage: page,
        totalPages: Math.ceil(array.length / limit),
        totalItems: array.length,
        hasNext: endIndex < array.length,
        hasPrev: page > 1,
        startIndex: startIndex + 1,
        endIndex: Math.min(endIndex, array.length)
    };
}

/**
 * Show toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast ('success', 'error', 'warning')
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');

    // Set message
    toastMessage.textContent = message;

    // Set type and icon
    toast.className = `toast ${type}`;
    
    switch (type) {
        case 'success':
            toastIcon.className = 'toast-icon fas fa-check-circle';
            break;
        case 'error':
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
            break;
        case 'warning':
            toastIcon.className = 'toast-icon fas fa-exclamation-triangle';
            break;
        default:
            toastIcon.className = 'toast-icon fas fa-info-circle';
    }

    // Show toast
    toast.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Generate a random ID
 * @returns {string} - Random ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Deep clone an object
 * @param {Object} obj - The object to clone
 * @returns {Object} - The cloned object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if an email already exists in the employees array
 * @param {string} email - The email to check
 * @param {number} excludeId - ID to exclude from the check (for editing)
 * @returns {boolean} - True if email exists
 */
function emailExists(email, excludeId = null) {
    return employees.some(emp => 
        emp.email.toLowerCase() === email.toLowerCase() && emp.id !== excludeId
    );
}

/**
 * Find employee by ID
 * @param {number} id - The employee ID
 * @returns {Object|null} - The employee object or null if not found
 */
function findEmployeeById(id) {
    return employees.find(emp => emp.id === id) || null;
}

/**
 * Remove employee by ID
 * @param {number} id - The employee ID
 * @returns {boolean} - True if employee was removed
 */
function removeEmployeeById(id) {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees.splice(index, 1);
        return true;
    }
    return false;
}

/**
 * Add or update employee
 * @param {Object} employeeData - The employee data
 * @param {number|null} id - The employee ID (null for new employee)
 * @returns {Object} - The created/updated employee
 */
function saveEmployee(employeeData, id = null) {
    if (id) {
        // Update existing employee
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            employees[index] = { ...employees[index], ...employeeData };
            return employees[index];
        }
    } else {
        // Create new employee
        const newEmployee = {
            id: nextEmployeeId++,
            ...employeeData
        };
        employees.push(newEmployee);
        return newEmployee;
    }
    return null;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
