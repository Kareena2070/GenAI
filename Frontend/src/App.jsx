import { RouterProvider } from "react-router-dom"
import { routers } from "./app.routers.jsx"



function App() {

  return (

    <>
    <RouterProvider  router={routers}/>

    <h1>Kareena Yadav</h1>
    </>
     
  
  )
}

export default App
