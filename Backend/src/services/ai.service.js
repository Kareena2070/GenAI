const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY

})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical question that can be asked in the interview along wih their intention and how to answer them"),

    behaviouralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral question that can be asked in the interview along wih their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with the servity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("he main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        task: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
                Generate a COMPLETE interview report in STRICT JSON format.

                STRICT RULES:
                - DO NOT leave any array empty
                - Generate:
                - 5 technicalQuestions
                - 5 behaviouralQuestions
                - 3 skillGaps
                - 7 preparationPlan days
                - Each preparationPlan.task MUST be an array of strings
                - Follow schema EXACTLY
                - No placeholders
                - No empty values

                Return ONLY JSON.

                Candidate:
                Resume: ${resume}
                Self Description: ${selfDescription}
                Job Description: ${jobDescription}
                `

    const response = await ai.models.generateContent({
        model: "Gemini 2.5 Flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
            temperature: 0.3 // more deterministic
        }
    })

    // console.log(response.text)
    return JSON.parse(response.text)

}

module.exports = generateInterviewReport
