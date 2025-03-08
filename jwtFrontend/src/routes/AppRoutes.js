import { BrowserRouter as Route, Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
// import Home from "../components/Home/Home";
// import About from "../components/About/About";

const AppRoutes = (props) => {
  const Project = () => {
    // console.log("Project");
    return (
      <div className="container mt-3">
        <h4>Todo...</h4>
      </div>
    );
  };
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Project} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-roles" component={GroupRole} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {/* <Route path="/about">
          <Register />
        </Route> */}

        <Route path="/" exact>
          {/* <Home /> */}
        </Route>
        <Route path="*">
          <div className="container">404 not found</div>
        </Route>
      </Switch>
    </>
  );
};
export default AppRoutes;
