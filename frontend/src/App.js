import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import DashboardScreen from "./screen/DashboardScreen";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";

function App() {
  return (
    <Router>
      <Header />
      <div className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/register" component={RegisterScreen} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
