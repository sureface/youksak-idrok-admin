import React from "react";
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/sidebar";
import About from "./pages/about/about";
import Courses from "./pages/courses/courses";
import Certifications from "./pages/certifications/certifications";
import News from "./pages/news/news";
import Teachers from "./pages/teachers/teachers";
import Login from "./pages/login/login";
import Category from "./pages/category/category";

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
                          <Route path="/courses">
                              <Courses />
                          </Route>
                          <Route path="/about">
                              <About />
                          </Route>
                          <Route path="/certifications">
                              <Certifications />
                          </Route>
                          <Route path="/news">
                              <News />
                          </Route>
                          <Route path="/teachers">
                              <Teachers />
                          </Route>
                      </PrivateRoute>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
