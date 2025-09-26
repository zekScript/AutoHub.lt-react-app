import  AddUser  from './addUser/AddUser'
import './App.css'
import { User } from './getUser/User'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import  UpdateUser  from './updateUser/UpdateUser'

function App() {
  const route = createBrowserRouter([
    {
        path: '/',
        element:<User />
    },
    {
      path:"/add",
      element: <AddUser/>
    },
    {
      path:"/update/:id",
      element:<UpdateUser/>
    }
    
  ])

  return (
    <>
      {/* <User></User> */}
      <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
