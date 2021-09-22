import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="py-3">
        <Container>
          <h1>Hello</h1>
        </Container>
      </div>
    </Router>
  );
}

export default App;
