// Main application logic

// Application state
let currentFilters = {
    search: '',
    firstName: '',
    department: '',
    role: ''
};

let currentSort = {
    field: 'firstName',
    direction: 'asc'
};

/**
 * Initialize the application
 */
function initializeApp() {
    setupEventListeners();
    setupModalListeners();
    initializePagination();
    renderEmployees();
    
    // Show initial toast
    setTimeout(() => {
        showToast('Employee Directory loaded successfully!', 'success');
    }, 500);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedSearch = debounce((e) => {
            currentFilters.search = e.target.value;
            resetPagination();
            renderEmployees();
        }, 300);
        
        searchInput.addEventListener('input', debouncedSearch);
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort.field = e.target.value;
            renderEmployees();
        });
    }
    
    // Filter functionality
    setupFilterListeners();
    
    // Form submission
    const employeeForm = document.getElementById('employeeForm');
    if (employeeForm) {
        employeeForm.addEventListener('submit', handleFormSubmit);
    }
}

/**
 * Setup filter event listeners
 */
function setupFilterListeners() {
    const applyFilterBtn = document.getElementById('applyFilter');
    const resetFilterBtn = document.getElementById('resetFilter');
    
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilters);
    }
    
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', resetFilters);
    }
}

/**
 * Apply filters from the filter sidebar
 */
function applyFilters() {
    const filterFirstName = document.getElementById('filterFirstName');
    const filterDepartment = document.getElementById('filterDepartment');
    const filterRole = document.getElementById('filterRole');
    
    currentFilters.firstName = filterFirstName ? filterFirstName.value : '';
    currentFilters.department = filterDepartment ? filterDepartment.value : '';
    currentFilters.role = filterRole ? filterRole.value : '';
    
    resetPagination();
    renderEmployees();
    hideFilterSidebar();
    
    showToast('Filters applied successfully!', 'success');
}

/**
 * Reset all filters
 */
function resetFilters() {
    // Reset filter state
    currentFilters = {
        search: '',
        firstName: '',
        department: '',
        role: ''
    };
    
    // Reset UI elements
    const searchInput = document.getElementById('searchInput');
    const filterFirstName = document.getElementById('filterFirstName');
    const filterDepartment = document.getElementById('filterDepartment');
    const filterRole = document.getElementById('filterRole');
    
    if (searchInput) searchInput.value = '';
    if (filterFirstName) filterFirstName.value = '';
    if (filterDepartment) filterDepartment.value = '';
    if (filterRole) filterRole.value = '';
    
    resetPagination();
    renderEmployees();
    
    showToast('Filters reset successfully!', 'success');
}

/**
 * Render employees based on current filters, sorting, and pagination
 */
function renderEmployees() {
    const employeeGrid = document.getElementById('employeeGrid');
    if (!employeeGrid) return;
    
    // Show loading state
    employeeGrid.innerHTML = '<div class="loading">Loading employees...</div>';
    
    // Apply filters
    let filteredEmployees = filterEmployees(employees, currentFilters);
    
    // Apply sorting
    filteredEmployees = sortEmployees(filteredEmployees, currentSort.field, currentSort.direction);
    
    // Apply pagination
    const paginationResult = getPaginatedEmployees(filteredEmployees);
    
    // Render employees
    setTimeout(() => {
        if (paginationResult.data.length === 0) {
            renderEmptyState(employeeGrid);
        } else {
            renderEmployeeCards(paginationResult.data, employeeGrid);
        }
        
        // Render pagination
        renderPagination(paginationResult.totalItems, paginationResult.currentPage, entriesPerPage);
    }, 100); // Small delay to show loading state
}

/**
 * Render employee cards
 * @param {Array} employeeList - List of employees to render
 * @param {HTMLElement} container - Container element
 */
function renderEmployeeCards(employeeList, container) {
    container.innerHTML = '';
    
    employeeList.forEach(employee => {
        const card = createEmployeeCard(employee);
        container.appendChild(card);
    });
}

/**
 * Create an employee card element
 * @param {Object} employee - Employee data
 * @returns {HTMLElement} - Employee card element
 */
function createEmployeeCard(employee) {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
        <div class="employee-info">
            <div class="employee-name">${escapeHtml(formatEmployeeName(employee))}</div>
            <div class="employee-details">
                <div><strong>ID:</strong> ${escapeHtml(employee.id.toString())}</div>
                <div><strong>Email:</strong> ${escapeHtml(employee.email)}</div>
                <div><strong>Department:</strong> ${escapeHtml(employee.department)}</div>
                <div><strong>Role:</strong> ${escapeHtml(employee.role)}</div>
            </div>
        </div>
        <div class="employee-actions">
            <button class="btn btn-secondary edit-btn" data-id="${employee.id}">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-danger delete-btn" data-id="${employee.id}">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    // Add event listeners
    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            const emp = findEmployeeById(employee.id);
            if (emp) {
                showEmployeeModal(emp);
            }
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            const emp = findEmployeeById(employee.id);
            if (emp) {
                showDeleteModal(emp);
            }
        });
    }
    
    return card;
}

/**
 * Render empty state
 * @param {HTMLElement} container - Container element
 */
function renderEmptyState(container) {
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-users"></i>
            <h3>No employees found</h3>
            <p>Try adjusting your search criteria or filters.</p>
        </div>
    `;
}

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const employeeData = {};
    
    // Extract form data
    for (let [key, value] of formData.entries()) {
        employeeData[key] = value.trim();
    }
    
    // Get employee ID if editing
    const employeeId = form.dataset.employeeId ? parseInt(form.dataset.employeeId) : null;
    
    // Validate form
    const validation = validateForm(employeeData, employeeId);
    
    if (!validation.isValid) {
        showFormErrors(validation.errors);
        showToast('Please fix the errors in the form', 'error');
        return;
    }
    
    // Save employee
    try {
        const savedEmployee = saveEmployee(employeeData, employeeId);
        
        if (savedEmployee) {
            hideModal('employeeModal');
            renderEmployees();
            
            const action = employeeId ? 'updated' : 'added';
            showToast(`Employee ${action} successfully!`, 'success');
        } else {
            showToast('Failed to save employee', 'error');
        }
    } catch (error) {
        console.error('Error saving employee:', error);
        showToast('An error occurred while saving the employee', 'error');
    }
}

/**
 * Delete an employee
 * @param {number} employeeId - ID of the employee to delete
 */
function deleteEmployee(employeeId) {
    try {
        const success = removeEmployeeById(employeeId);
        
        if (success) {
            renderEmployees();
            showToast('Employee deleted successfully!', 'success');
        } else {
            showToast('Failed to delete employee', 'error');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        showToast('An error occurred while deleting the employee', 'error');
    }
}

/**
 * Handle keyboard shortcuts
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + N to add new employee
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            showEmployeeModal();
        }
        
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Ctrl/Cmd + Shift + F to open filter sidebar
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            toggleFilterSidebar();
        }
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupKeyboardShortcuts();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible again, refresh data if needed
        renderEmployees();
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close filter sidebar on large screens
    if (window.innerWidth > 768) {
        hideFilterSidebar();
    }
}, 250));
