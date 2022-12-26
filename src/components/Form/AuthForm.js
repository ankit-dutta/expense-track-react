import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import './AuthForm.css'

const AuthForm =()=>{

   const emailRef = useRef()
   const passwordRef = useRef()
   const confrmPasswordRef = useRef()

   const authctx = useContext(AuthContext)
   const history = useHistory();

   const [islogin , setIsLogin] = useState(true);
   const [isLoading , setIsLoading] = useState(false);

   const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


   const submitHadler =(event)=>{
      event.preventDefault();
      
      const enteredEmail = emailRef.current.value
      const enteredPassword = passwordRef.current.value
      // const enteredCnfrmPassword = confrmPasswordRef.current.value
      // console.log(enteredEmail , enteredCnfrmPassword, enteredPassword);

      setIsLoading(true)
      let url;

      if(islogin){
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
      } else{
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
      }
      
         fetch(url,{
          method:"POST",
          body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken: true
          }),
          headers:{
            'Content-Type' : 'application/json'
          }
         }).then(res =>{
          setIsLoading(false)
          if(res.ok){
            console.log("successfully registered")
            return res.json();
  
          }else{
          return  res.json().then(data =>{
            console.log(data)
            let errorMessage = 'Authentication failed';
            if(data && data.error && data.error.message){
              errorMessage = data.error.message
            }

              throw new Error(errorMessage);

            })
          }
         }).then(data => {
          console.log(data)
          localStorage.setItem("email", enteredEmail);

          console.log('succesfully login')
          authctx.login(data.idToken)
           history.push("/welcome")
         }).catch(err =>{
            alert(err.message)
         })
      }
    

    

    return(
        <>
          <div className="form-container">
          
            <form onSubmit={submitHadler}>
            <h1>{islogin ? 'Login' :'SIGN UP'}</h1>
              <div class="icon">
                <i class="fas fa-user-circle"></i>
              </div>

                <div className="formcontainer">

                <div className="container">
                <div>
                <label><strong> Email </strong></label>
                <input type="email" required ref={emailRef}/>
                </div>


                <div>
                <label><strong> Password </strong></label>
                <input type="password" required ref={passwordRef}/>
                </div>

               { !islogin && <div>
                <label><strong> Confirm Password </strong></label>
                <input type="password" required ref={confrmPasswordRef}/>
                </div>}
                
                </div>

                <div>
                
                 {!isLoading  &&  <button className="action" type="submit">{islogin? 'Login' : 'Create Account'}</button>}  
                 {isLoading && <p>Sending request....</p>}
                </div>

              
                </div>

              

            </form>
          </div>
              
              
                <div className="action">
                <center>
               <button onClick={switchAuthModeHandler} className="toggle togglebtn">{islogin ? "Don't have an account? Sign up!": "Have an account? Login" }</button>
               </center>
                </div>
                

        </>
    )
}


export default AuthForm;