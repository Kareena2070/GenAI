import { RouterProvider } from "react-router-dom"
import { routers } from "./app.routers.jsx"
import { AuthProvider } from "./features/auth/services/auth.context.jsx"
import { InterviewProvider } from "./features/interview/services/interview.context.jsx"


function App() {

  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={routers} />
        </InterviewProvider>
      </AuthProvider>

    </>
  )
}

export default App
