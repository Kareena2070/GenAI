const mongoose = require('mongoose');

/**
 * - job description schema: string
 * - resume text: string
 * - self description: string
 * 
 * - matchScore : Number
 * 
 * - technical questions and answers : 
 *      [{
 *      question: "",
 *      intention: "",
 *      answer: "",
 *      }]
 * - behavioral questions : 
 *       [{
 *      question: "",
 *      intention: "",
 *      answer: "",
 *      }]
 * - skill gaps: 
 *      [{
 *      skill: "",
 *      severity: {
 *      type: string,
 *      enum: ["low", "medium", "high"]    
 *      }
 *      }]
 * - preparation plan :
 *      [{
 *      day: number,
 *      focus: string,
 *      task: [string]
 *      }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true, "Technical question is required"]
    },

    intention:{
        type: String,
        required: [true, "Intention is required"]
    },
    
    answer:{
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true, "Technical question is required"]
    },

    intention:{
        type: String,
        required: [true, "Intention is required"]
    },
    
    answer:{
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String, 
        enum: ["low", "medium", "high"],
        required: [true, "Skill is required"]
    },

    severity:{
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
}, {
    _id: false
})

const preparationReportSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [true,  "Day is required"]
    },

    focus:{
        type: String,
        required: [true, "Focus is required"]
    },

    task:[{
        type: String,
        required: [true, "task is required"]
    }]
    
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required : [true, "Job description is required"]
    },

    resume: {
        type: String,
    },

    selfDescription: {
        type: String,
    },

    matchScore: {
        type: Number,
        min: 0,
        max:100,
    },

    technicalQuestion: [technicalQuestionSchema],

    behavioralQuestion: [behavioralQuestionSchema],

    skillGap: [skillGapSchema],

    preparationReport: [preparationReportSchema],

}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema )

module.exports = interviewReportModel;