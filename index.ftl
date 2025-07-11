<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <#-- Freemarker template for Employee Directory -->
    <#assign employeeData = [
        {
            "id": 1,
            "firstName": "Shahbaz",
            "lastName": "Khan",
            "email": "Shahbaz@gmail.com",
            "department": "IT",
            "role": "Manager"
        },
        {
            "id": 2,
            "firstName": "Bob",
            "lastName": "Johnson",
            "email": "bob@example.com",
            "department": "IT",
            "role": "Developer"
        },
        {
            "id": 3,
            "firstName": "Charlie",
            "lastName": "Lee",
            "email": "charlie@example.com",
            "department": "Finance",
            "role": "Analyst"
        }
    ]>

    <!-- Header -->
    <header class="header">
        <div class="container">
            <h1 class="logo">Employee Directory</h1>
            <div class="header-actions">
                <button class="btn btn-primary" id="addEmployeeBtn">
                    <i class="fas fa-plus"></i> Add Employee
                </button>
                <button class="btn btn-secondary" id="filterBtn">
                    <i class="fas fa-filter"></i> Filter
                </button>
            </div>
        </div>
    </header>

    <!-- Search and Controls -->
    <section class="controls">
        <div class="container">
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="Search by name or email...">
                <i class="fas fa-search search-icon"></i>
            </div>
            
            <div class="sort-controls">
                <label for="sortBy">Sort by:</label>
                <select id="sortBy">
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="department">Department</option>
                    <option value="role">Role</option>
                </select>
                
                <label for="entriesPerPage">Show:</label>
                <select id="entriesPerPage">
                    <option value="10">10</option>
                    <option value="25" selected>25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
            </div>
        </div>
    </section>

    <!-- Filter Sidebar -->
    <div class="filter-sidebar" id="filterSidebar">
        <div class="filter-header">
            <h3>Filter Employees</h3>
            <button class="close-filter" id="closeFilter">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="filter-content">
            <div class="filter-group">
                <label for="filterFirstName">First Name:</label>
                <input type="text" id="filterFirstName" placeholder="Enter first name...">
            </div>
            
            <div class="filter-group">
                <label for="filterDepartment">Department:</label>
                <select id="filterDepartment">
                    <option value="">All Departments</option>
                    <#-- Generate department options dynamically -->
                    <#assign departments = ["HR", "IT", "Finance", "Marketing", "Operations"]>
                    <#list departments as dept>
                        <option value="${dept}">${dept}</option>
                    </#list>
                </select>
            </div>
            
            <div class="filter-group">
                <label for="filterRole">Role:</label>
                <select id="filterRole">
                    <option value="">All Roles</option>
                    <#-- Generate role options dynamically -->
                    <#assign roles = ["Manager", "Developer", "Analyst", "Designer", "Coordinator"]>
                    <#list roles as role>
                        <option value="${role}">${role}</option>
                    </#list>
                </select>
            </div>
            
            <div class="filter-actions">
                <button class="btn btn-primary" id="applyFilter">Apply Filter</button>
                <button class="btn btn-secondary" id="resetFilter">Reset</button>
            </div>
        </div>
    </div>

    <!-- Employee List -->
    <main class="main-content">
        <div class="container">
            <div class="employee-grid" id="employeeGrid">
                <#-- Render employee cards using Freemarker -->
                <#if employeeData?has_content>
                    <#list employeeData as employee>
                        <div class="employee-card">
                            <div class="employee-info">
                                <div class="employee-name">${employee.firstName} ${employee.lastName}</div>
                                <div class="employee-details">
                                    <div><strong>ID:</strong> ${employee.id}</div>
                                    <div><strong>Email:</strong> ${employee.email}</div>
                                    <div><strong>Department:</strong> ${employee.department}</div>
                                    <div><strong>Role:</strong> ${employee.role}</div>
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
                        </div>
                    </#list>
                <#else>
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h3>No employees found</h3>
                        <p>Start by adding some employees to the directory.</p>
                    </div>
                </#if>
            </div>
            
            <!-- Pagination -->
            <div class="pagination" id="pagination">
                <!-- Pagination will be generated by JavaScript -->
            </div>
        </div>
    </main>

    <!-- Add/Edit Employee Modal -->
    <div class="modal" id="employeeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle">Add Employee</h2>
                <button class="close-modal" id="closeModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <form id="employeeForm" class="employee-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name *</label>
                        <input type="text" id="firstName" name="firstName" required>
                        <span class="error-message" id="firstNameError"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="lastName">Last Name *</label>
                        <input type="text" id="lastName" name="lastName" required>
                        <span class="error-message" id="lastNameError"></span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                    <span class="error-message" id="emailError"></span>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="department">Department *</label>
                        <select id="department" name="department" required>
                            <option value="">Select Department</option>
                            <#list departments as dept>
                                <option value="${dept}">${dept}</option>
                            </#list>
                        </select>
                        <span class="error-message" id="departmentError"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="role">Role *</label>
                        <select id="role" name="role" required>
                            <option value="">Select Role</option>
                            <#list roles as role>
                                <option value="${role}">${role}</option>
                            </#list>
                        </select>
                        <span class="error-message" id="roleError"></span>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="submitBtn">Add Employee</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" id="deleteModal">
        <div class="modal-content delete-modal">
            <div class="modal-header">
                <h2>Confirm Delete</h2>
                <button class="close-modal" id="closeDeleteModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <p>Are you sure you want to delete this employee?</p>
                <p><strong id="deleteEmployeeName"></strong></p>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" id="cancelDelete">Cancel</button>
                <button class="btn btn-danger" id="confirmDelete">Delete</button>
            </div>
        </div>
    </div>

    <!-- Overlay -->
    <div class="overlay" id="overlay"></div>

    <!-- Toast Notification -->
    <div class="toast" id="toast">
        <div class="toast-content">
            <i class="toast-icon"></i>
            <span class="toast-message"></span>
        </div>
    </div>

    <#-- Initialize employee data for JavaScript -->
    <script>
        // Override the mock data with Freemarker data
        const freemarkerEmployees = [
            <#list employeeData as employee>
                {
                    id: ${employee.id},
                    firstName: "${employee.firstName}",
                    lastName: "${employee.lastName}",
                    email: "${employee.email}",
                    department: "${employee.department}",
                    role: "${employee.role}"
                }<#if employee?has_next>,</#if>
            </#list>
        ];
        
        // Update employees array with Freemarker data
        if (typeof employees !== 'undefined') {
            employees.splice(0, employees.length, ...freemarkerEmployees);
        }
    </script>

    <script src="js/data.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/validation.js"></script>
    <script src="js/modal.js"></script>
    <script src="js/pagination.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
