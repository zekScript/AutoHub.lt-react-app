import  AddUser  from './addUser/AddUser'
import './App.css'
import { User } from './getUser/User'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import  UpdateUser  from './updateUser/UpdateUser'
import AdminUser from './admin/users/AdminUser'
import SignIn from './signin/SignIn'
import LogIn from './login/LogIn'
import AdminTickets from './admin/tickets/AdminTickets'
import Home from './home/Home'
import MakeTicket from './make-ticket/MakeTicket'
import CurrentTicket from './view/viewid/CurrentTicket'
import AllMyTickets from './mytickets/all-made-tickets/AllMyTickets'
import Faqs from './faqs/Faqs'

function App() {
  const route = createBrowserRouter([
    {
        path: '/',
        element:<Home />
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
      path:"/signin",
      element:<SignIn/>
    },
    {
      path:"/login",
      element:<LogIn/>
    },
    {
      path:"/admin/tickets",
      element:<AdminTickets/>
    },
    {
      path:"/admin/users",
      element:<User />
    },
    {
      path:"/make-ticket",
      element:<MakeTicket/>
    },
    {
      path:"/view/:id",
      element:<CurrentTicket/>
    },
    {
      path:"/:id/tickets",
      element:<AllMyTickets/>
    },
    {
      path:"/faqs",
      element:<Faqs/>
    },
    // {
    //   path:"*",
    //   element:<ForOFor/>
    // }

    
    
  ])

  return (
    <>
      {/* <User></User> */}
      <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
