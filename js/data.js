// Mock employee data
const mockEmployees = [
    {
        id: 1,
        firstName: "Arjun",
        lastName: "Sharma",
        email: "arjun@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 2,
        firstName: "Priya",
        lastName: "Patel",
        email: "priya@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 3,
        firstName: "Rahul",
        lastName: "Singh",
        email: "rahul@example.com",
        department: "Finance",
        role: "Analyst"
    },
    {
        id: 4,
        firstName: "Sneha",
        lastName: "Gupta",
        email: "sneha@example.com",
        department: "Marketing",
        role: "Designer"
    },
    {
        id: 5,
        firstName: "Vikram",
        lastName: "Kumar",
        email: "vikram@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 6,
        firstName: "Kavya",
        lastName: "Reddy",
        email: "kavya@example.com",
        department: "HR",
        role: "Coordinator"
    },
    {
        id: 7,
        firstName: "Aditya",
        lastName: "Agarwal",
        email: "aditya@example.com",
        department: "Operations",
        role: "Manager"
    },
    {
        id: 8,
        firstName: "Ananya",
        lastName: "Joshi",
        email: "ananya@example.com",
        department: "Finance",
        role: "Analyst"
    },
    {
        id: 9,
        firstName: "Karan",
        lastName: "Verma",
        email: "karan@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 10,
        firstName: "Meera",
        lastName: "Nair",
        email: "meera@example.com",
        department: "Marketing",
        role: "Manager"
    },
    {
        id: 11,
        firstName: "Rohan",
        lastName: "Chopra",
        email: "rohan@example.com",
        department: "Operations",
        role: "Coordinator"
    },
    {
        id: 12,
        firstName: "Ishita",
        lastName: "Mishra",
        email: "ishita@example.com",
        department: "HR",
        role: "Analyst"
    },
    {
        id: 13,
        firstName: "Aman",
        lastName: "Bansal",
        email: "aman@example.com",
        department: "IT",
        role: "Manager"
    },
    {
        id: 14,
        firstName: "Pooja",
        lastName: "Malhotra",
        email: "pooja@example.com",
        department: "Finance",
        role: "Coordinator"
    },
    {
        id: 15,
        firstName: "Siddharth",
        lastName: "Rao",
        email: "siddharth@example.com",
        department: "Marketing",
        role: "Designer"
    },
    {
        id: 16,
        firstName: "Riya",
        lastName: "Kapoor",
        email: "riya@example.com",
        department: "Operations",
        role: "Analyst"
    },
    {
        id: 17,
        firstName: "Aryan",
        lastName: "Shah",
        email: "aryan@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 18,
        firstName: "Deepika",
        lastName: "Iyer",
        email: "deepika@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 19,
        firstName: "Nikhil",
        lastName: "Sinha",
        email: "nikhil@example.com",
        department: "Finance",
        role: "Analyst"
    },
    {
        id: 20,
        firstName: "Tanya",
        lastName: "Bhatt",
        email: "tanya@example.com",
        department: "Marketing",
        role: "Coordinator"
    },
    {
        id: 21,
        firstName: "Harsh",
        lastName: "Pandey",
        email: "harsh@example.com",
        department: "Operations",
        role: "Developer"
    },
    {
        id: 22,
        firstName: "Shreya",
        lastName: "Saxena",
        email: "shreya@example.com",
        department: "IT",
        role: "Manager"
    },
    {
        id: 23,
        firstName: "Manish",
        lastName: "Tiwari",
        email: "manish@example.com",
        department: "HR",
        role: "Designer"
    },
    {
        id: 24,
        firstName: "Nisha",
        lastName: "Bose",
        email: "nisha@example.com",
        department: "Finance",
        role: "Coordinator"
    },
    {
        id: 25,
        firstName: "Akash",
        lastName: "Mehta",
        email: "akash@example.com",
        department: "Marketing",
        role: "Analyst"
    }
];

// Initialize employees data - this simulates loading from a backend
let employees = [...mockEmployees];
let nextEmployeeId = Math.max(...employees.map(emp => emp.id)) + 1;
