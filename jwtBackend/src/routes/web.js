import express from "express";
import homeController from "../controller/homeController.js";
import apiController from "../controller/apiController";
const router = express.Router();

/**
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  //path, handlers
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/users/update-user", homeController.handleUpdateUser);

  //rest api
  // get - r, post - c, post - u, delete - d
  router.get("/api/test-api", apiController.testApi);

  return app.use("/", router);
};

export default initWebRoutes;
