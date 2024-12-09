import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {

    app.get("/api/enrollments/:userId", async (req, res) => {
        const { userId } = req.params;
        // const enrollments = dao.findCoursesForEnrolledUser(userId);
        const enrollments = await dao.findEnrollmentsByUserId(userId);
        res.json(enrollments);
    });

    // write to enroll and unenroll users in courses
    app.post("/api/enrollments", (req, res) => {
        // console.log(req.body);
        const { user, course } = req.body;
        dao.enrollUserInCourse(user, course);
        // console.log("User ", user, " enrolled in course ", course);
        // console.log("All Enrollments", dao.findAllEnrollments());
        res.sendStatus(201);
    });
    app.delete("/api/enrollments/:user/:course", (req, res) => {
        const { user, course } = req.params;
        if (!user || !course) {
            return res.status(400).json({ error: "User and course are required." });
        }
        dao.unenrollUserFromCourse(user, course);
        // console.log("User", user, "unenrolled from course", course);
        res.sendStatus(204);
    });

    // write to find all enrollments for a course
    app.get("/api/enrollments/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        // const enrollments = dao.findUsersForEnrolledCourse(courseId);
        const enrollments = await dao.findUsersForCourse(courseId);
        res.json(enrollments);
    });

    // write to find all enrollments
    app.get("/api/enrollments", (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.json(enrollments);
    });

    // write to enroll another user using username
    app.post("/api/enrollments/username", async (req, res) => {
        // console.log("Enrolling User", req.body);
        const { username, courseId } = req.body;
        const isEnrolled = await dao.enrollUserInCourseByUsername(username, courseId);
        if (isEnrolled) {
            res.sendStatus(201);
        } else {
            res.status(400).json({ error: "User is already enrolled in the course or user/course not found." });
        }
    });
}