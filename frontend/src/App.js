import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import DashboardScreen from "./screen/DashboardScreen";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import PostEditScreen from "./screen/PostEditScreen";
import PostScreen from "./screen/PostScreen";
import PostsScreen from "./screen/PostsScreen";
import RegisterScreen from "./screen/RegisterScreen";

function App() {
  return (
    <Router>
      <Header />
      <div className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/user/post/search/:keyword" component={DashboardScreen} exact />
          <Route path="/post/:id" component={PostScreen} exact />
          <Route path="/posts" component={PostsScreen} exact />
          <Route path="/post/search/:keyword" component={PostsScreen} exact />
          <Route path="/posts/:pageNumber" component={PostsScreen} />
          <Route path="/dashboard" component={DashboardScreen} exact />
          <Route path="/dashboard/:pageNumber" component={DashboardScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/post/edit/:id" component={PostEditScreen} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
