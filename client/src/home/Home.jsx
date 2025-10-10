import React, {useState} from 'react'
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { getCurrentUser } from '../getCurrentUser/getCurrentUser';
import Search from "../components/Search.jsx"

const Home = () => {
  
    
  return (
    <>
    <Search />
    </>
  );
}

export default Home