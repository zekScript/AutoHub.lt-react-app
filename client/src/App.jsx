import './App.css'
import { User } from './getUser/User'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import  UpdateUser  from './updateUser/UpdateUser'
import SignIn from './signin/SignIn'
import LogIn from './login/LogIn'
import AdminTickets from './admin/tickets/AdminTickets'
import Home from './home/Home'
import MakeTicket from './make-ticket/MakeTicket'
import CurrentTicket from './view/viewid/CurrentTicket'
import AllMyTickets from './mytickets/all-made-tickets/AllMyTickets'
import Faqs from './faqs/Faqs'
import SearchPage from './pages/Search/Search'
import Add_skelbima from './pages/Search/add_skelbima'
import CarListings from './pages/user/CarListings'
import NotFound from './pages/NotFound/NotFound'

function App() {
  const route = createBrowserRouter([
    {
        path: '/',
        element:<Home />
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
    {
      path:"/search",
      element:<SearchPage/>
    },
    {
      path:"/add_skelbima",
      element:<Add_skelbima/>
    },
    {
      path:"/:id/car_listings",
      element:<CarListings/>
    },
    {
      path:"*",
      element:<NotFound/>
    }
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
