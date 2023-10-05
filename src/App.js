import logo from "./logo.svg";
import "./App.css";
import { HashRouter as Router, Route, Switch, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import GenerateWorkout from "./pages/GenerateWorkout";
import Workouts from "./pages/Workouts";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

//Redux -- imports

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route path="/generate_workout" element={<GenerateWorkout />} />
            {/* <Route path="/workouts" element={<Workouts />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
