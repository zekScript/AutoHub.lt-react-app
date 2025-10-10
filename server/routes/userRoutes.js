import e from "express";

import { logInUser, addSkelbima, deleteUser, getAllUsers, getUserById, update, signInUser, getAllTickets, updateTicketStatus, getTicketById, addTicketMessage, FindTicketMadeByUser, getSkelbimasMadeByUser, searchSkelbimai } from "../controller/userController.js";
import {authenticate, requireAdmin} from "../middleware/middleware.js"
import { createTicket } from "../controller/userController.js";
import multer from "multer";
import path from "path";
const route = e.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

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
route.post(
  "/add_skelbima",
  authenticate,
  upload.array("images", 10), // allow up to 10 images
  addSkelbima
);
route.get("/skelbimai/:id", getSkelbimasMadeByUser)
route.get("/listings/search", searchSkelbimai)

export default route

