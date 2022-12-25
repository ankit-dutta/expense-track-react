import { useRef, useState } from "react";
import './AuthForm.css'

const AuthForm =()=>{
   const emailRef = useRef()
   const passwordRef = useRef()
   const confrmPasswordRef = useRef()

   const [islogin , setislogin] = useState();


   const submitHadler =(event)=>{
      event.preventDefault();
      
      const enteredEmail = emailRef.current.value
      const enteredPassword = passwordRef.current.value
      const enteredCnfrmPassword = confrmPasswordRef.current.value
      console.log(enteredEmail , enteredCnfrmPassword, enteredPassword);

      if(islogin){

      } else{
         fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`,{
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
          if(res.ok){
            console.log("successfully registered")
  
          }else{
          return  res.json().then(data =>{

            let errorMessage = 'Authentication failed';
            if(data && data.error && data.error.message){
              errorMessage = data.error.message
            }
              console.log(data)

              alert(errorMessage)
            })
          }
         })
      }
    }

    

    return(
        <>
          <div className="form-container">
          
            <form onSubmit={submitHadler}>
            <h1>SIGN UP</h1>
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

                <div>
                <label><strong> Confirm Password </strong></label>
                <input type="password" required ref={confrmPasswordRef}/>
                </div>
                
                </div>

                <div>
                
                <button type="submit"><strong> Signup </strong></button>
                </div>

                <div>
                 <p> <strong>already having account?<span><button>Login</button></span></strong> </p>
                </div>

                </div>

            </form>
          </div>
        </>
    )
}


export default AuthForm;