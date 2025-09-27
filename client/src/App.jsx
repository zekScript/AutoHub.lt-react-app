import  AddUser  from './addUser/AddUser'
import './App.css'
import { User } from './getUser/User'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import  UpdateUser  from './updateUser/UpdateUser'
import AdminUser from './admin/AdminUser'
import SignIn from './signin/SignIn'
import LogIn from './login/LogIn'

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
    },
    {
      path:"/admin",
      element:<AdminUser />
    },
    {
      path:"/signin",
      element:<SignIn/>
    },
    {
      path:"/login",
      element:<LogIn/>
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
