import { useInterview } from "../hooks/useInterview";
import { useState, useRef } from "react"
import { useNavigate } from "react-router";

const Home = () => {

  const { loading, generateReport } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const resumeFileRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeFileRef.current.files[0]
    const data = await generateReport({jobDescription, selfDescription, resumeFile})

    if (data?._id) {
      navigate(`/interview/${data._id}`)
    }
  }

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700">Generating your interview strategy...</h2>
          <p className="text-gray-500 mt-2">This may take a moment. Please wait.</p>
        </div>
      </div>
    )
  }

 return (
   <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4 md:p-10">
    
     <div className="w-full max-w-7xl">


       {/* Heading */}
       <div className="text-center mb-10">
         <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
           Create Your Custom{" "}
           <span className="text-pink-600">Interview Plan</span>
         </h1>
         <p className="text-gray-500 mt-2 text-sm md:text-base">
           Let AI analyze your job requirements and build a winning strategy.
         </p>
       </div>


       {/* Main Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


         {/* Left Card */}
         <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition">
          
           <div className="flex items-center justify-between mb-3">
             <h2 className="font-semibold text-lg text-gray-800">
               Target Job Description
             </h2>
             <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-md">
               REQUIRED
             </span>
           </div>


           <textarea
              onChange={(e)=>{setJobDescription(e.target.value)}}
             placeholder="Paste the full job description here..."
             className="w-full h-64 md:h-80 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
           />
         </div>


         {/* Right Card */}
         <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition flex flex-col gap-5">


           {/* Upload */}
           <div>
             <div className="flex justify-between items-center mb-2">
               <h2 className="font-semibold text-lg text-gray-800">
                 Your Profile
               </h2>
               <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md">
                 BEST RESULTS
               </span>
             </div>


             <label
               htmlFor="resume"
               className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition"
             >
               <p className="text-gray-500 text-sm">
                 Click to upload or drag & drop
               </p>
               <p className="text-xs text-gray-400 mt-1">
                 PDF / DOCX (Max 5MB)
               </p>
               <input ref={resumeFileRef} type="file" id="resume" className="hidden" />
             </label>
           </div>


           {/* OR Divider */}
           <div className="flex items-center gap-3 text-gray-400 text-sm">
             <div className="flex-1 h-px bg-gray-200"></div>
             OR
             <div className="flex-1 h-px bg-gray-200"></div>
           </div>


           {/* Self Description */}
           <div>
             <textarea
              onChange={(e)=>{setSelfDescription(e.target.value)}}
               placeholder="Briefly describe your experience, skills, and goals..."
               className="w-full h-32 md:h-40 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
             />
           </div>


           {/* Info */}
           <p className="text-xs text-gray-500">
             Either a resume or self description is required.
           </p>


           {/* CTA Button */}
           <button 
            onClick={handleGenerateReport}
           className="mt-2 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
             Generate Interview Strategy
           </button>
         </div>


       </div>


       {/* Footer */}
       <div className="text-center text-xs text-gray-400 mt-8">
         Privacy Policy · Terms of Service · Help Center
       </div>


     </div>
   </main>
 );
};


export default Home;