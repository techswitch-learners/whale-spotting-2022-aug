import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/homepage/Home";
import { Navbar } from "./components/navbar/Navbar";
import { LoginManager } from "./components/login/LoginManager";
import { Footer } from "./components/footer/Footer";
import { BrowseSightings } from "./components/browse-sightings-page/BrowseSightings";
import { CreateUser } from "./components/create-user-page/CreateUser";
import { News } from "./components/news-page/News";
import { PendingSightings } from "./components/pending-sightings-page/PendingSightings";
import { ReportSightings } from "./components/report-sightings-page/ReportSightings";
import { Whaleopedia } from "./components/whaleopedia-page/Whaleopedia";
import { Login } from "./components/login/Login";

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/report-sightings">
        <ReportSightings />
      </Route>
      <Route path="/browse-sightings">
        <BrowseSightings />
      </Route>
      <Route path="/whaleopedia">
        <Whaleopedia />
      </Route>
      <Route path="/news">
        <News />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/approve-sightings">
        <PendingSightings />
      </Route>
      <Route path="/create-user">
        <CreateUser />
      </Route>
      <Route path="/logout">
        <Home />
      </Route>
    </Switch>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <LoginManager>
        <Navbar />
        <main>
          <Routes />
        </main>
        <Footer />
      </LoginManager>
    </Router>
  );
};

export default App;
