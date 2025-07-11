// Modal management functions

/**
 * Show a modal
 * @param {string} modalId - The ID of the modal to show
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    
    if (modal) {
        modal.classList.add('active');
        if (overlay) {
            overlay.classList.add('active');
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first input if available
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

/**
 * Hide a modal
 * @param {string} modalId - The ID of the modal to hide
 */
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    
    if (modal) {
        modal.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

/**
 * Hide all modals
 */
function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('overlay');
    
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

/**
 * Setup modal event listeners
 */
function setupModalListeners() {
    // Employee form modal
    const employeeModal = document.getElementById('employeeModal');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    
    // Delete confirmation modal
    const deleteModal = document.getElementById('deleteModal');
    const closeDeleteModalBtn = document.getElementById('closeDeleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    
    // Overlay
    const overlay = document.getElementById('overlay');
    
    // Filter sidebar
    const filterSidebar = document.getElementById('filterSidebar');
    const filterBtn = document.getElementById('filterBtn');
    const closeFilterBtn = document.getElementById('closeFilter');
    
    // Show employee modal for adding
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', () => {
            showEmployeeModal();
        });
    }
    
    // Close employee modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            hideModal('employeeModal');
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            hideModal('employeeModal');
        });
    }
    
    // Close delete modal
    if (closeDeleteModalBtn) {
        closeDeleteModalBtn.addEventListener('click', () => {
            hideModal('deleteModal');
        });
    }
    
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            hideModal('deleteModal');
        });
    }
    
    // Toggle filter sidebar
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            toggleFilterSidebar();
        });
    }
    
    if (closeFilterBtn) {
        closeFilterBtn.addEventListener('click', () => {
            hideFilterSidebar();
        });
    }
    
    // Close modals when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            hideAllModals();
            hideFilterSidebar();
        });
    }
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAllModals();
            hideFilterSidebar();
        }
    });
    
    // Prevent modal content clicks from closing modal
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    
    // Prevent filter sidebar clicks from closing sidebar
    if (filterSidebar) {
        filterSidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

/**
 * Show employee modal for adding or editing
 * @param {Object|null} employee - The employee to edit (null for adding)
 */
function showEmployeeModal(employee = null) {
    const modal = document.getElementById('employeeModal');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('employeeForm');
    
    if (!modal || !form) return;
    
    // Clear form and errors
    form.reset();
    clearAllErrors();
    
    if (employee) {
        // Edit mode
        modalTitle.textContent = 'Edit Employee';
        submitBtn.textContent = 'Update Employee';
        
        // Populate form with employee data
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        
        // Store employee ID for editing
        form.dataset.employeeId = employee.id;
    } else {
        // Add mode
        modalTitle.textContent = 'Add Employee';
        submitBtn.textContent = 'Add Employee';
        
        // Remove employee ID
        delete form.dataset.employeeId;
    }
    
    // Setup form validation
    setupFormValidation(form, employee ? employee.id : null);
    
    showModal('employeeModal');
}

/**
 * Show delete confirmation modal
 * @param {Object} employee - The employee to delete
 */
function showDeleteModal(employee) {
    const deleteEmployeeName = document.getElementById('deleteEmployeeName');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    
    if (deleteEmployeeName) {
        deleteEmployeeName.textContent = formatEmployeeName(employee);
    }
    
    if (confirmDeleteBtn) {
        // Remove existing event listeners
        const newConfirmBtn = confirmDeleteBtn.cloneNode(true);
        confirmDeleteBtn.parentNode.replaceChild(newConfirmBtn, confirmDeleteBtn);
        
        // Add new event listener
        newConfirmBtn.addEventListener('click', () => {
            deleteEmployee(employee.id);
            hideModal('deleteModal');
        });
    }
    
    showModal('deleteModal');
}

/**
 * Toggle filter sidebar
 */
function toggleFilterSidebar() {
    const filterSidebar = document.getElementById('filterSidebar');
    const overlay = document.getElementById('overlay');
    
    if (filterSidebar) {
        const isActive = filterSidebar.classList.contains('active');
        
        if (isActive) {
            hideFilterSidebar();
        } else {
            showFilterSidebar();
        }
    }
}

/**
 * Show filter sidebar
 */
function showFilterSidebar() {
    const filterSidebar = document.getElementById('filterSidebar');
    const overlay = document.getElementById('overlay');
    
    if (filterSidebar) {
        filterSidebar.classList.add('active');
        if (overlay) {
            overlay.classList.add('active');
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Hide filter sidebar
 */
function hideFilterSidebar() {
    const filterSidebar = document.getElementById('filterSidebar');
    const overlay = document.getElementById('overlay');
    
    if (filterSidebar) {
        filterSidebar.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}
