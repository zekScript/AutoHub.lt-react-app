import e from "express";

import { logInUser, addSkelbima, deleteUser, getAllUsers, getUserById, update, signInUser, getAllTickets, updateTicketStatus, getTicketById, addTicketMessage, FindTicketMadeByUser } from "../controller/userController.js";
import {authenticate, requireAdmin} from "../middleware/middleware.js"
import { createTicket } from "../controller/userController.js";
const route = e.Router();

// route.post("/user", create) // create
route.get("/users", authenticate, requireAdmin, getAllUsers) // read
route.get("/user/:id", getUserById) // read
route.post("/login", logInUser);
route.put("/update/user/:id", authenticate, requireAdmin, update) // update
route.post("/signin", signInUser)
route.delete("/delete/user/:id", deleteUser) // delete
// TICKET RESTFUL
route.get("/ticket/:id", getTicketById)
route.post("/ticket", authenticate, createTicket);
route.get("/tickets", authenticate, requireAdmin, getAllTickets)
route.put("/update/ticket/:id", updateTicketStatus)
route.post("/ticket/:id/message", authenticate, addTicketMessage);
route.get("/:id/mytickets", FindTicketMadeByUser)

// Skelbimo restful
route.post("/add_skelbima", authenticate, addSkelbima)


export default route

