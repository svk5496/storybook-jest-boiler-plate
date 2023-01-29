import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { routes } from "./pages/routes";
import { GlobalStyles, lightTheme } from "./styles";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles></GlobalStyles>
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                <Home></Home>
              </Route>
              <Route path={routes.login} exact>
                <Login></Login>
              </Route>
              <Route path={routes.signUp} exact>
                <SignUp></SignUp>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
