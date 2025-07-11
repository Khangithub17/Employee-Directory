// Pagination functionality

let currentPage = 1;
let entriesPerPage = 25;
let totalFilteredEmployees = 0;

/**
 * Initialize pagination
 */
function initializePagination() {
    const entriesSelect = document.getElementById('entriesPerPage');
    
    if (entriesSelect) {
        entriesSelect.addEventListener('change', (e) => {
            entriesPerPage = parseInt(e.target.value);
            currentPage = 1; // Reset to first page
            renderEmployees();
        });
    }
}

/**
 * Render pagination controls
 * @param {number} totalItems - Total number of items
 * @param {number} currentPageNum - Current page number
 * @param {number} itemsPerPage - Items per page
 */
function renderPagination(totalItems, currentPageNum, itemsPerPage) {
    const paginationContainer = document.getElementById('pagination');
    
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Clear existing pagination
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) {
        return; // Don't show pagination if only one page
    }
    
    // Create pagination info
    const startItem = ((currentPageNum - 1) * itemsPerPage) + 1;
    const endItem = Math.min(currentPageNum * itemsPerPage, totalItems);
    
    const paginationInfo = document.createElement('span');
    paginationInfo.className = 'pagination-info';
    paginationInfo.textContent = `Showing ${startItem}-${endItem} of ${totalItems} employees`;
    
    // Create pagination buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'pagination-buttons';
    
    // Previous button
    const prevBtn = createPaginationButton('Previous', currentPageNum - 1, currentPageNum === 1);
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
    buttonsContainer.appendChild(prevBtn);
    
    // Page numbers
    const { startPage, endPage } = calculatePageRange(currentPageNum, totalPages);
    
    // First page button (if not in range)
    if (startPage > 1) {
        buttonsContainer.appendChild(createPaginationButton('1', 1));
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            buttonsContainer.appendChild(ellipsis);
        }
    }
    
    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPaginationButton(i.toString(), i, false, i === currentPageNum);
        buttonsContainer.appendChild(pageBtn);
    }
    
    // Last page button (if not in range)
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            buttonsContainer.appendChild(ellipsis);
        }
        buttonsContainer.appendChild(createPaginationButton(totalPages.toString(), totalPages));
    }
    
    // Next button
    const nextBtn = createPaginationButton('Next', currentPageNum + 1, currentPageNum === totalPages);
    nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
    buttonsContainer.appendChild(nextBtn);
    
    // Append to container
    paginationContainer.appendChild(paginationInfo);
    paginationContainer.appendChild(buttonsContainer);
}

/**
 * Create a pagination button
 * @param {string} text - Button text
 * @param {number} page - Page number
 * @param {boolean} disabled - Whether the button is disabled
 * @param {boolean} active - Whether the button is active
 * @returns {HTMLElement} - Button element
 */
function createPaginationButton(text, page, disabled = false, active = false) {
    const button = document.createElement('button');
    button.className = `pagination-btn ${active ? 'active' : ''}`;
    button.textContent = text;
    button.disabled = disabled;
    
    if (!disabled) {
        button.addEventListener('click', () => {
            goToPage(page);
        });
    }
    
    return button;
}

/**
 * Calculate the range of page numbers to display
 * @param {number} currentPageNum - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {Object} - Start and end page numbers
 */
function calculatePageRange(currentPageNum, totalPages) {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPageNum - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    return { startPage, endPage };
}

/**
 * Go to a specific page
 * @param {number} page - Page number to go to
 */
function goToPage(page) {
    const totalPages = Math.ceil(totalFilteredEmployees / entriesPerPage);
    
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderEmployees();
        
        // Scroll to top of employee grid
        const employeeGrid = document.getElementById('employeeGrid');
        if (employeeGrid) {
            employeeGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

/**
 * Get current page data for employees
 * @param {Array} employeeList - List of employees to paginate
 * @returns {Object} - Pagination result
 */
function getPaginatedEmployees(employeeList) {
    totalFilteredEmployees = employeeList.length;
    
    // Ensure current page is valid
    const totalPages = Math.ceil(totalFilteredEmployees / entriesPerPage);
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    } else if (currentPage < 1) {
        currentPage = 1;
    }
    
    return paginate(employeeList, currentPage, entriesPerPage);
}

/**
 * Reset pagination to first page
 */
function resetPagination() {
    currentPage = 1;
}

/**
 * Update entries per page
 * @param {number} newEntriesPerPage - New number of entries per page
 */
function updateEntriesPerPage(newEntriesPerPage) {
    entriesPerPage = newEntriesPerPage;
    currentPage = 1; // Reset to first page
    renderEmployees();
}
