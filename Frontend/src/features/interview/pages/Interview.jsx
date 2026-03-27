const Interview = () => {
 return (
   <main className="h-screen w-full bg-gray-50">
     <div className="h-full w-full bg-white grid grid-cols-1 md:grid-cols-4">


       {/* LEFT PANEL */}
       <div className="border-r p-6 flex flex-col gap-6">
         <h2 className="text-sm font-semibold text-gray-500 uppercase">
           Sections
         </h2>


         <div className="flex flex-col gap-2">
           <button className="text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
             Technical Questions
           </button>


           <button className="text-left px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
             Behavioral Questions
           </button>


           <button className="text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
             Road Map
           </button>
         </div>
       </div>


       {/* CENTER PANEL */}
       <div className="md:col-span-2 p-8 flex flex-col gap-6 overflow-y-auto">
        
         {/* Header */}
         <div className="flex items-center justify-between">
           <h2 className="text-xl font-semibold">
             Behavioral Questions
           </h2>
           <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
             2 questions
           </span>
         </div>


         {/* Questions */}
         <div className="flex flex-col gap-4">


           <div className="border rounded-xl p-4 hover:shadow-sm transition cursor-pointer">
             <div className="flex gap-3 items-start">
               <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-2 py-1 rounded">
                 Q1
               </span>
               <p className="text-gray-700">
                 Describe a time when you had to optimize a piece of code that was causing production delays. How did you identify the bottleneck?
               </p>
             </div>
           </div>


           <div className="border rounded-xl p-4 hover:shadow-sm transition cursor-pointer">
             <div className="flex gap-3 items-start">
               <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-2 py-1 rounded">
                 Q2
               </span>
               <p className="text-gray-700">
                 How do you approach learning a new technology, such as your recent work with APIs?
               </p>
             </div>
           </div>


         </div>
       </div>


       {/* RIGHT PANEL */}
       <div className="border-l p-6 flex flex-col gap-6">


         <div className="flex flex-col items-center gap-2">
           <h3 className="text-sm text-gray-500 uppercase">
             Match Score
           </h3>


           <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center text-xl font-bold text-green-600">
             88%
           </div>


           <p className="text-green-600 text-sm font-medium">
             Strong match
           </p>
         </div>


         <div>
           <h3 className="text-sm text-gray-500 uppercase mb-3">
             Skill Gaps
           </h3>


           <div className="flex flex-col gap-2">
             <span className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md">
               Message Queues
             </span>
             <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-md">
               Docker & CI/CD
             </span>
             <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-md">
               Distributed Systems
             </span>
             <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md">
               Redis (Intermediate)
             </span>
           </div>
         </div>


       </div>
     </div>
   </main>
 );
};


export default Interview;
