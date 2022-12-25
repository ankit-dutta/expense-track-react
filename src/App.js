import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AuthForm from './components/Form/AuthForm';
import Welcome from './pages/Welcome';
import AuthContext from './store/auth-context';


function App() {

 const authctx = useContext(AuthContext)
 const isLoggedin = authctx.isLoggedIn

  return (
    <div className="App">
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
              
        </Switch>

    </div>
  );
}

export default App;
