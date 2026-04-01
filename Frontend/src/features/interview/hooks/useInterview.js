import {generateInterviewReport, getInterviewReportById, getAllInterviewReport} from "../services/interview.api.js"
import {useContext} from "react"
import {InterviewContext} from "../services/interview.context.jsx"

export const useInterview = () => {
    const context  = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)
        let response = null

        try {
            response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response?.interviewReport ?? null)
        } catch (error) {
            console.error("Error generating interview report: ", error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null

        try {
            response = await getInterviewReportById(interviewId)
            setReport(response?.interviewReport ?? response?.interivewReport ?? null)
        } catch (error) {
            console.error("Error fetching interview report: ", error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReport ?? response?.interivewReport
    }

    const getAllReports = async () => {
        setLoading(true)
        let response = null

        try {
            response = await getAllInterviewReport()
            setReports(response?.interviewReports ?? response?.interviewReport ?? [])
        } catch (error) {
            console.error("Error fetching interview reports: ", error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReports ?? response?.interviewReport
    }

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports
    }
}