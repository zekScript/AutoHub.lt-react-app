import e from "express";

import { logInUser, deleteUser, getAllUsers, getUserById, update, signInUser } from "../controller/userController.js";

const route = e.Router();

// route.post("/user", create) // create
route.get("/users", getAllUsers) // read
route.get("/user/:id", getUserById) // read
route.post("/login", logInUser);
route.put("/update/user/:id", update) // update
route.post("/signin", signInUser)
route.delete("/delete/user/:id", deleteUser) // delete


export default route

