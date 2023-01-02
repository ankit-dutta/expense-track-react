import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AuthForm from './components/Form/AuthForm';
import ExpenseTrack from './pages/Expenses/ExpenseTrack';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import AuthContext from './store/auth-context';

import DarkThemeProvider from './components/Layout/themeProvider';
import styled from "styled-components";
import theme from "styled-theming";

export const backgroundColor = theme("theme", {
  light: "#fff",
  dark: "#2d2d2d",
});

export const textColor = theme("theme", {
  light: "#000",
  dark: "#fff",
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  font-family: san-serif;
  background-color: ${backgroundColor};
  color: ${textColor};`
;


function App() {

 const authctx = useContext(AuthContext)
 const isLoggedin = authctx.isLoggedIn

  return (
    <DarkThemeProvider>
      <Container>
    {/* <div className="App"> */}
       <Switch>

          <Route path="/" exact>
              <AuthForm />
            </Route>

            <Route path="/auth">
              <AuthForm />
            </Route>

            <Route path="/welcome">
              <Welcome />
            </Route>

            <Route path= '/profile'>
              <Profile />
            </Route>

            <Route path= '/forget-password' exact>
              <ForgetPassword />
            </Route>

            <Route path= '/expense' exact>
              <ExpenseTrack />
            </Route>
              
        </Switch>

    {/* </div> */}
    </Container>
    </DarkThemeProvider>
  );
}

export default App;
