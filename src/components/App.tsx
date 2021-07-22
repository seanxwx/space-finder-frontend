import React from "react";
import { AuthService } from "../services/AuthService";
import { User } from "../model/Model";
import { Login } from "./Login";
import { Router, Route, Switch } from "react-router-dom";
import history from "../utils/history";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { Profile } from "./Profile";
import { Spaces } from "./spaces/Spaces";
import { DataService } from "../services/DataService";

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, AppState> {
  private authSerivice: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
    };
    this.setUser = this.setUser.bind(this);
  }

  private setUser(user: User) {
    this.setState({
      user: user,
    });
    console.log("setUser: " + user);
  }

  render() {
    return (
      <div className="wrapper">
        <Router history={history}>
          <div>
            <Navbar user={this.state.user} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login">
                <Login authService={this.authSerivice} setUser={this.setUser} />
              </Route>
              <Route exact path="/profile">
                <Profile
                  authService={this.authSerivice}
                  user={this.state.user}
                />
              </Route>
              <Route exact path="/spaces">
                <Spaces dataService={this.dataService} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
