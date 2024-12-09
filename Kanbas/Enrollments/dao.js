import Database from "../Database/index.js";
// export function enrollUserInCourse(userId, courseId) {
//     const { enrollments } = Database;
//     enrollments.push({ _id: Date.now(), user: userId, course: courseId });
// }
// export function unenrollUserFromCourse(userId, courseId) {
//     const { enrollments } = Database;
//     Database.enrollments = enrollments.filter(
//         (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
//     );
// }
// function to find all enrollments for a user (helper function)
export function findCoursesForEnrolledUser(userId) {
    const { enrollments } = Database;
    const enrollmentData = enrollments.filter((enrollment) => enrollment.user === userId);
    return enrollmentData;
}

// function to find all enrollments (helper function)
export function findAllEnrollments() {
    return Database.enrollments;
}

// function to find all enrollments for a course (helper function)
export function findUsersForEnrolledCourse(courseId) {
    const { enrollments } = Database;
    const enrollmentData = enrollments.filter((enrollment) => enrollment.course === courseId);
    return enrollmentData;
}

// function to enroll another user using username. also check if the user is already enrolled in the course
// export function enrollUserInCourseByUsername(username, courseId) {
//     const { users, courses, enrollments } = Database;
//     const user = users.find((user) => user.username === username);
//     const course = courses.find((course) => course._id === courseId);

//     if (!user || !course) {
//         return false; // user or course not found
//     }

//     // checking if the user is already enrolled in the course
//     const isAlreadyEnrolled = enrollments.some(
//         (enrollment) => enrollment.user === user._id && enrollment.course === courseId
//     );

//     if (isAlreadyEnrolled) {
//         return false; // user is already enrolled
//     }

//     enrollUserInCourse(user._id, course._id);
//     return true;
// }

// new 

import model from "./model.js";

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    // console.log("Enrollments", enrollments);
    return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    // console.log("Finding users for course", courseId);
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

export function findEnrollmentsByUserId(userId) {
    return model.find({ user: userId });
}


import userModel from "../Users/model.js"
import courseModel from "../Courses/model.js";
// function to enroll another user using username. also check if the user is already enrolled in the course
export async function enrollUserInCourseByUsername(username, courseId) {
    // Find the user by username
    const user = await userModel.findOne({ username });
    if (!user) {
        // console.log("User not found");
        return false;
    }

    // Find the course by courseId
    const course = await courseModel.findById(courseId);
    if (!course) {
        // console.log("Course not found");
        return false;
    }

    // Check if the user is already enrolled in the course
    const isAlreadyEnrolled = await model.exists({ user: user._id, course: course._id });
    if (isAlreadyEnrolled) {
        // console.log("User is already enrolled in the course");
        return false;
    }

    // Enroll the user in the course
    await enrollUserInCourse(user._id, course._id);
    // console.log("User successfully enrolled in the course");
    return true;
}