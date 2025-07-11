// Configuration file for the Employee Directory application

const CONFIG = {
    // Application settings
    app: {
        name: 'Employee Directory',
        version: '1.0.0',
        description: 'A responsive and interactive Employee Directory'
    },
    
    // Pagination settings
    pagination: {
        defaultEntriesPerPage: 25,
        availableEntriesPerPage: [10, 25, 50, 100],
        maxVisiblePageButtons: 5
    },
    
    // Search settings
    search: {
        debounceDelay: 300, // milliseconds
        minSearchLength: 1
    },
    
    // Validation settings
    validation: {
        nameMinLength: 2,
        nameMaxLength: 50,
        emailMaxLength: 100,
        namePattern: /^[a-zA-Z\s'-]+$/,
        emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    
    // UI settings
    ui: {
        toastDuration: 3000, // milliseconds
        animationDuration: 300, // milliseconds
        breakpoints: {
            mobile: 480,
            tablet: 768,
            desktop: 1024
        }
    },
    
    // Department and role options
    data: {
        departments: [
            'HR',
            'IT',
            'Finance',
            'Marketing',
            'Operations'
        ],
        roles: [
            'Manager',
            'Developer',
            'Analyst',
            'Designer',
            'Coordinator'
        ]
    },
    
    // Keyboard shortcuts
    shortcuts: {
        addEmployee: 'Ctrl+N',
        search: 'Ctrl+F',
        filter: 'Ctrl+Shift+F',
        escape: 'Escape'
    },
    
    // Error messages
    messages: {
        success: {
            employeeAdded: 'Employee added successfully!',
            employeeUpdated: 'Employee updated successfully!',
            employeeDeleted: 'Employee deleted successfully!',
            filtersApplied: 'Filters applied successfully!',
            filtersReset: 'Filters reset successfully!',
            appLoaded: 'Employee Directory loaded successfully!'
        },
        error: {
            employeeSaveFailed: 'Failed to save employee',
            employeeDeleteFailed: 'Failed to delete employee',
            formValidationFailed: 'Please fix the errors in the form',
            generalError: 'An error occurred. Please try again.'
        },
        warning: {
            unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?'
        },
        info: {
            noEmployeesFound: 'No employees found',
            emptyDirectory: 'Start by adding some employees to the directory'
        }
    },
    
    // Development settings
    debug: {
        enabled: false, // Set to true for development
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
        showPerformanceMetrics: false
    }
};

// Freeze the configuration to prevent modifications
Object.freeze(CONFIG);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Make available globally
window.CONFIG = CONFIG;
