// Base class representing a generic Person
class Person {
    constructor(name, id) {
        this.name = name; // Encapsulation: properties are tied to the object
        this.id = id;
    }

    getDetails() {
        // Abstraction: hiding implementation details
        return `Name: ${this.name}, ID: ${this.id}`;
    }
}

// Student class inheriting from Person
class Student extends Person {
    constructor(name, id) {
        super(name, id); // Inheritance: calling the parent constructor
        this.grades = []; // Students have specific grades
    }

    addGrade(grade) {
        if (grade >= 0 && grade <= 100) {
            this.grades.push(grade);
        } else {
            console.log("Grade must be between 0 and 100.");
        }
    }

    getGrades() {
        return this.grades.length ? this.grades.join(", ") : "No grades available.";
    }

    calculateAverage() {
        if (this.grades.length === 0) return "No grades to calculate average.";
        const total = this.grades.reduce((acc, grade) => acc + grade, 0);
        return (total / this.grades.length).toFixed(2);
    }

    getDetails() {
        // Polymorphism: overriding the parent method
        const baseDetails = super.getDetails();
        const grades = this.getGrades();
        const average = this.grades.length ? this.calculateAverage() : "N/A";
        return `${baseDetails}, Grades: [${grades}], Average Grade: ${average}`;
    }
}

// System class to manage students
class StudentManagementSystem {
    constructor() {
        this.students = []; // Encapsulation: managing students list within the system
    }

    addStudent(name, id) {
        if (this.students.find(student => student.id === id)) {
            console.log(`A student with ID ${id} already exists.`);
        } else {
            this.students.push(new Student(name, id));
            console.log(`Student ${name} (ID: ${id}) added successfully.`);
        }
    }

    viewStudent(id) {
        const student = this.students.find(student => student.id === id);
        if (student) {
            console.log(student.getDetails());
        } else {
            console.log(`Student with ID ${id} not found.`);
        }
    }

    addGradeToStudent(id, grade) {
        const student = this.students.find(student => student.id === id);
        if (student) {
            student.addGrade(grade);
            console.log(`Grade ${grade} added to student ID: ${id}.`);
        } else {
            console.log(`Student with ID ${id} not found.`);
        }
    }
}

// Example usage:
const system = new StudentManagementSystem();

system.addStudent("Alex", 1);
system.addStudent("Sam", 2);

system.addGradeToStudent(1, 85);
system.addGradeToStudent(1, 90);
system.addGradeToStudent(2, 78);
system.addGradeToStudent(2, 88);

system.viewStudent(1);
system.viewStudent(2);

// Attempting to view a non-existent student
system.viewStudent(3);

// Attempting to add a duplicate student
system.addStudent("Chris", 1);