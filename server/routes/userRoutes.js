import e from "express";

import { logInUser, deleteUser, getAllUsers, getUserById, update, signInUser, getAllTickets, updateTicketStatus, getTicketById } from "../controller/userController.js";
import {authenticate, requireAdmin} from "../middleware/middleware.js"
import { createTicket } from "../controller/userController.js";
const route = e.Router();

// route.post("/user", create) // create
route.get("/users", requireAdmin, getAllUsers) // read
route.get("/user/:id", getUserById) // read
route.post("/login", logInUser);
route.put("/update/user/:id", requireAdmin, update) // update
route.post("/signin", signInUser)
route.delete("/delete/user/:id", deleteUser) // delete
// TICKET RESTFUL
route.get("/ticket/:id", getTicketById)
route.post("/ticket", authenticate, createTicket);
route.get("/tickets", requireAdmin, getAllTickets)
route.put("/update/ticket/:id", requireAdmin, updateTicketStatus)


export default route

