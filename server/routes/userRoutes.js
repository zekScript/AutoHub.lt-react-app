import e from "express";

import { create, deleteUser, getAllUsers, getUserById, update } from "../controller/userController.js";

const route = e.Router();

route.post("/user", create) // create
route.get("/users", getAllUsers) // read
route.get("/user/:id", getUserById) // read
route.put("/update/user/:id", update) // update

route.delete("/delete/user/:id", deleteUser) // delete

export default route

