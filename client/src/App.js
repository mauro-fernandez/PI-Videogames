import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Landing from "./components/Landing.jsx"
import Home from "./components/Home.jsx"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
