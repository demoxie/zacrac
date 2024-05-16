import {Express, Router} from "express";
import {UserController} from "../controller/user.controller";

export class Routes{
    router: Router;
    userController: UserController;
    constructor(app: Router, userController: UserController) {
        this.router = app;
        this.userController = userController
    }
    public getRoutes = ()=>{
        const {createProfile, getUserProfiles, getUserProfile, updateUserProfile, deleteUserProfile} = this.userController;

        this.router.post("/profiles",createProfile);
        this.router.get("/profiles",getUserProfiles);
        this.router.get("/profiles/:userId",getUserProfile);
        this.router.put("/profiles/:userId",updateUserProfile);
        this.router.delete("/profiles/:userId",deleteUserProfile);
        return this.router;
    }
}