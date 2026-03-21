import { RouterProvider } from "react-router-dom"
import { routers } from "./app.routers.jsx"
import { AuthProvider } from "./features/auth/services/auth.context.jsx"


function App() {

  return (
    <>
    <AuthProvider>
      <RouterProvider  router={routers}/>
    </AuthProvider>
  
    </>
  )
}

export default App
