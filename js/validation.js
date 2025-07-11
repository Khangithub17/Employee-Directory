// Form validation functions

/**
 * Validation rules and messages
 */
const validationRules = {
    firstName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
        messages: {
            required: 'First name is required',
            minLength: 'First name must be at least 2 characters long',
            maxLength: 'First name must be less than 50 characters',
            pattern: 'First name can only contain letters, spaces, hyphens, and apostrophes'
        }
    },
    lastName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
        messages: {
            required: 'Last name is required',
            minLength: 'Last name must be at least 2 characters long',
            maxLength: 'Last name must be less than 50 characters',
            pattern: 'Last name can only contain letters, spaces, hyphens, and apostrophes'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        maxLength: 100,
        messages: {
            required: 'Email is required',
            pattern: 'Please enter a valid email address',
            maxLength: 'Email must be less than 100 characters',
            exists: 'This email is already in use'
        }
    },
    department: {
        required: true,
        messages: {
            required: 'Please select a department'
        }
    },
    role: {
        required: true,
        messages: {
            required: 'Please select a role'
        }
    }
};

/**
 * Validate a single field
 * @param {string} fieldName - The name of the field
 * @param {string} value - The value to validate
 * @param {number|null} excludeId - ID to exclude for email uniqueness check
 * @returns {Object} - Validation result
 */
function validateField(fieldName, value, excludeId = null) {
    const rules = validationRules[fieldName];
    if (!rules) {
        return { isValid: true, message: '' };
    }

    const trimmedValue = value.trim();

    // Required validation
    if (rules.required && !trimmedValue) {
        return { isValid: false, message: rules.messages.required };
    }

    // Skip other validations if field is not required and empty
    if (!rules.required && !trimmedValue) {
        return { isValid: true, message: '' };
    }

    // Min length validation
    if (rules.minLength && trimmedValue.length < rules.minLength) {
        return { isValid: false, message: rules.messages.minLength };
    }

    // Max length validation
    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
        return { isValid: false, message: rules.messages.maxLength };
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(trimmedValue)) {
        return { isValid: false, message: rules.messages.pattern };
    }

    // Email uniqueness validation
    if (fieldName === 'email' && emailExists(trimmedValue, excludeId)) {
        return { isValid: false, message: rules.messages.exists };
    }

    return { isValid: true, message: '' };
}

/**
 * Validate the entire form
 * @param {Object} formData - The form data to validate
 * @param {number|null} excludeId - ID to exclude for email uniqueness check
 * @returns {Object} - Validation result with errors
 */
function validateForm(formData, excludeId = null) {
    const errors = {};
    let isValid = true;

    // Validate each field
    Object.keys(validationRules).forEach(fieldName => {
        const value = formData[fieldName] || '';
        const validation = validateField(fieldName, value, excludeId);
        
        if (!validation.isValid) {
            errors[fieldName] = validation.message;
            isValid = false;
        }
    });

    return { isValid, errors };
}

/**
 * Display validation error for a field
 * @param {string} fieldName - The name of the field
 * @param {string} message - The error message
 */
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear validation error for a field
 * @param {string} fieldName - The name of the field
 */
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (field) {
        field.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Clear all validation errors
 */
function clearAllErrors() {
    Object.keys(validationRules).forEach(fieldName => {
        clearFieldError(fieldName);
    });
}

/**
 * Display multiple validation errors
 * @param {Object} errors - Object containing field errors
 */
function showFormErrors(errors) {
    // Clear existing errors first
    clearAllErrors();
    
    // Show new errors
    Object.keys(errors).forEach(fieldName => {
        showFieldError(fieldName, errors[fieldName]);
    });
}

/**
 * Real-time validation for a field
 * @param {HTMLElement} field - The field element
 * @param {number|null} excludeId - ID to exclude for email uniqueness check
 */
function setupFieldValidation(field, excludeId = null) {
    const fieldName = field.name;
    
    // Validate on blur
    field.addEventListener('blur', () => {
        const validation = validateField(fieldName, field.value, excludeId);
        if (!validation.isValid) {
            showFieldError(fieldName, validation.message);
        } else {
            clearFieldError(fieldName);
        }
    });
    
    // Clear errors on input
    field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
            clearFieldError(fieldName);
        }
    });
}

/**
 * Setup validation for the entire form
 * @param {HTMLFormElement} form - The form element
 * @param {number|null} excludeId - ID to exclude for email uniqueness check
 */
function setupFormValidation(form, excludeId = null) {
    const fields = form.querySelectorAll('input, select');
    
    fields.forEach(field => {
        if (field.name && validationRules[field.name]) {
            setupFieldValidation(field, excludeId);
        }
    });
}
