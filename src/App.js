import './App.scss';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/sidebar";
import About from "./pages/about/about";
import Courses from "./pages/courses/courses";

function App() {
  return (
    <Router>
        <Topbar />
        <div className="container">
            <Sidebar />
            <Switch>
                <Route exact path="/">
                    <Courses />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
