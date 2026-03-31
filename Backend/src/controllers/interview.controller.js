const pdfParse = require("pdf-parse")
const mongoose = require("mongoose")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../model/interviewReport.model")

/**
 *@description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterviewReportController(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: "Resume file is required"
        })
    }

    const {selfDescription, jobDescription} = req.body

    if (!jobDescription) {
        return res.status(400).json({
            message: "Job description is required"
        })
    }
    
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
        
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })

}

/**
 * @description controller to get interview report by interviewId
 */

async function getInterviewReportByIdController(req, res) {
    const {interviewId} = req.params

    if (!mongoose.isValidObjectId(interviewId)) {
        return res.status(400).json({
            message: "Invalid interviewId"
        })
    }

    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id
    })

    if(!interviewReport){
        return res.status(400).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview repost fetched successfully.",
        interviewReport
    })
}

/**
 * @description controller to get all the interview report of logged in user.
 */
async function getAllInterviewReportController(req, res) {
    const interviewReports = await interviewReportModel.find({
        user: req.user.id
    }).sort({createdAt: -1}).select("-resume  -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReports
    })
}

module.exports = {generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportController}