import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
import roleController from "../controller/roleController";

const router = express.Router();

/**
 * @param {*} app : express app
 */

// const checkUserLogin = (req, res, next) => {
//   const nonSecurePaths = ["/", "/register", "/login"];
//   if (nonSecurePaths.includes(req.path)) {
//     return next();
//   }
//   //authenticate user
//   if(user){
//     next();
//   } else{

//   }

// }

const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);
  //rest api
  // get - r, post - c, post - u, delete - d
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.get("/account", userController.getUserAccount);
  router.post("/logout", apiController.handleLogout);

  //crud
  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  //role routes
  router.get("/roles/read", roleController.readFunc);
  router.post("/roles/create", roleController.createFunc);
  // router.put("/roles/update", roleController.updateFunc);
  router.delete("/roles/delete", roleController.deleteFunc);
  router.get("/roles/by-group/:groupId", roleController.getRoleByGroup);
  router.post("/roles/assign-to-group", roleController.assignRoleToGroup);

  //group route

  router.get("/group/read", groupController.readFunc);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
