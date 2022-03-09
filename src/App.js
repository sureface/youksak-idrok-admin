import React from "react";
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/sidebar";
import Courses from "./pages/courses/courses";
import News from "./pages/news/news";
import Teachers from "./pages/teachers/teachers";
import Login from "./pages/login/login";
import Category from "./pages/category/category";
import UpdateCategories from "./pages/category/updateCategories";
import UpdateCourses from "./pages/courses/updateCourses";
import UpdateTeachers from "./pages/teachers/updateTeachers";
import NewsEdit from "./pages/news/newsEdit";
import Individual from "./pages/postCourses/individual/individuals";
import Group from "./pages/postCourses/group/group";
import More from "./pages/courses/more";
import CardGroup from "./pages/postCourses/group/cardGroup";
import EditGroups from "./pages/postCourses/group/editGroups";
import EditIndividuals from "./pages/postCourses/individual/editIndividuals";
import CardIndividuals from "./pages/postCourses/individual/cardIndividuals";

function App() {

    function PrivateRoute ({ children, ...rest}) {
        return(
            <Route {...rest} render={() => {
                return localStorage.getItem("TOKEN-YUKSAK-IDROK")
                    ? children
                    : <Redirect to="/" />
            }}/>
        )
    }

  return (
      <div>
          <ToastContainer style={{zIndex: "99999999"}}/>
          <Router>
              <Topbar />
              <div className="container">
                  <Sidebar />
                  <Switch>
                      <Route exact path="/">
                          <Login />
                      </Route>
                      <PrivateRoute>
                          <Route path="/category">
                              <Category />
                          </Route>
                          <Route path="/category-edit/:id">
                              <UpdateCategories />
                          </Route>
                          <Route path="/courses">
                              <Courses />
                          </Route>
                          <Route path="/courses-edit/:id">
                              <UpdateCourses />
                          </Route>
                          <Route path="/courses-more/:id">
                              <More />
                          </Route>
                          <Route path="/news">
                              <News />
                          </Route>
                          <Route path="/news-edit/:id">
                              <NewsEdit />
                          </Route>
                          <Route path="/teachers">
                              <Teachers />
                          </Route>
                          <Route path="/add-to-group">
                              <Group />
                          </Route>
                          <Route path="/card-group">
                              <CardGroup />
                          </Route>
                          <Route path="/groups-edit/:id/">
                              <EditGroups />
                          </Route>
                          <Route path="/individual-edit/:id">
                              <EditIndividuals />
                          </Route>
                          <Route path="/individual">
                              <Individual />
                          </Route>
                          <Route path="/card-individuals">
                              <CardIndividuals />
                          </Route>
                          <Route path="/teachers-edit/:id">
                              <UpdateTeachers />
                          </Route>
                      </PrivateRoute>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
