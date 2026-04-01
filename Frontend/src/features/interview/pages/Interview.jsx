import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'

const NAV_ITEMS = [
  { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
  { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
  { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// Question Card
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm mb-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">
            Q{index + 1}
          </span>
          <p className="text-sm font-medium text-gray-800">
            {item.question}
          </p>
        </div>

        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      {open && (
        <div className="mt-4 space-y-4 text-sm text-gray-700">
          <div>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Intention
            </span>
            <p className="mt-1">{item.intention}</p>
          </div>

          <div>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">
              Model Answer
            </span>
            <p className="mt-1">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Roadmap
const RoadMapDay = ({ day }) => (
  <div className="bg-white border rounded-xl p-4 shadow-sm mb-4">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-semibold bg-black text-white px-3 py-1 rounded-full">
        Day {day.day}
      </span>
      <h3 className="text-sm font-semibold text-gray-800">
        {day.focus}
      </h3>
    </div>

    <ul className="space-y-2 text-sm text-gray-600">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex gap-2">
          <span className="w-2 h-2 mt-2 bg-gray-400 rounded-full" />
          {task}
        </li>
      ))}
    </ul>
  </div>
)

// Main Component
const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical')
  const { report, getReportById, loading } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  if (loading || !report) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-lg font-medium text-gray-600">
          Loading your interview plan...
        </h1>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex w-full">

        {/* Left Nav */}
        <nav className="w-64 bg-white border-r flex flex-col justify-between p-5">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-4">
              Sections
            </p>

            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition 
                ${activeNav === item.id
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="w-px bg-gray-200" />

        {/* Center */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeNav === 'technical' && (
            <section>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">Technical Questions</h2>
                <span className="text-sm text-gray-500">
                  {report.technicalQuestions.length} questions
                </span>
              </div>

              {report.technicalQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </section>
          )}

          {activeNav === 'behavioral' && (
            <section>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">Behavioral Questions</h2>
                <span className="text-sm text-gray-500">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>

              {report.behavioralQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </section>
          )}

          {activeNav === 'roadmap' && (
            <section>
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">Preparation Road Map</h2>
                <span className="text-sm text-gray-500">
                  {report.preparationPlan.length} day plan
                </span>
              </div>

              {report.preparationPlan.map(day => (
                <RoadMapDay key={day.day} day={day} />
              ))}
            </section>
          )}
        </main>

        <div className="w-px bg-gray-200" />

        {/* Sidebar */}
        <aside className="w-72 bg-white border-l p-6">

          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">Match Score</p>

            <div className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center text-2xl font-bold
                        ${report.matchScore >= 80 ? 'bg-green-100 text-green-600' :
                report.matchScore >= 60 ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'}`}>
              {report.matchScore}%
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Strong match for this role
            </p>
          </div>

          <div className="border-t my-6" />

          <div>
            <p className="text-xs text-gray-400 mb-3">Skill Gaps</p>

            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1 rounded-full font-medium
                                    ${gap.severity === 'high' ? 'bg-red-100 text-red-600' :
                      gap.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'}`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  )
}

export default Interview