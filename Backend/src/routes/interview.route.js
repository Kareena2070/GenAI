const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware.js")
const interviewController = require("../controllers/interview.controller.js")
const upload = require("../middlewares/file.middleware.js")

const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description, resume pdf and job description
 * @access private
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single("resumeFile"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview repost by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)


/**
 * @router GET /api/interview
 * @description get all the interview report of logged in user.
 * @access private
 */

interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportController)



module.exports = interviewRouter