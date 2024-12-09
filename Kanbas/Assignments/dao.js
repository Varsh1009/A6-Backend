import model from "./model.js";

export function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
}

export function createAssignment(assignment) {
    delete assignment._id;
    // console.log("Creating assignment", assignment);
    return model.create(assignment);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}

export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}


// import Database from "../Database/index.js";
// export function findAssignmentsForCourse(courseId) {
//     const { assignments } = Database;
//     return assignments.filter((assignment) => assignment.course === courseId);
// }
// export function createAssignment(assignment) {
//     const newAssignment = { ...assignment, _id: Date.now().toString() };
//     Database.assignments = [...Database.assignments, newAssignment];
//     // console.log(Database.assignments);
//     return newAssignment;
// }

// export function updateAssignment(assignmentId, assignmentUpdates) {
//     const { assignments } = Database;
//     const assignment = assignments.find((assignment) => assignment._id === assignmentId);
//     if (!assignment) {
//         throw new Error(`Assignment with ID ${assignmentId} not found.`);
//     }
//     Object.assign(assignment, assignmentUpdates);
//     return assignment;
// }

// export function deleteAssignment(assignmentId) {
//     const { assignments } = Database;
//     Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
// }



