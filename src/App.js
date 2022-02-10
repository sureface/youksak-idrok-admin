import React from "react";
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
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
import Group from "./pages/postCourses/group/result/group";
import Individual from "./pages/postCourses/individual/result/individual";
import AddToGroup from "./pages/postCourses/group/group";
import AddToIndividual from "./pages/postCourses/individual/individual";
import More from "./pages/courses/more";

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
                          <Route path="/group">
                              <Group />
                          </Route>
                          <Route path="/add-to-group">
                              <AddToGroup />
                          </Route>
                          <Route path="/add-to-individual">
                              <AddToIndividual />
                          </Route>
                          <Route path="/individual">
                              <Individual />
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
