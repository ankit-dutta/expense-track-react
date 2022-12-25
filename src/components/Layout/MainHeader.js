import { Route, Switch } from "react-router-dom";
import Welcome from "../../pages/Welcome";
import AuthForm from "../Form/AuthForm";

const MainHeader = () =>{

    return(
        <>
        <Switch>
          <Route path='/' exact>
            <AuthForm />
          </Route>

          <Route path= '/welcome' exact>
              <Welcome />
          </Route>
        </Switch>
        </>
    )
}

export default MainHeader;