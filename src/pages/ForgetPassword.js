import { useRef } from 'react';
import './ForgetPassword.css';

const ForgetPassword = () => {
    const emailLink = useRef();

    const forgotLinkHandler = (event) => {
        event.preventDefault()
        const enteredEmailLink = emailLink.current.value;
        console.log("submit", enteredEmailLink);

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_KEY}`,{
            method:"POST",
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:enteredEmailLink
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                return res.json().then((data)=>{
                    let errorMessage = "Password Reses Failed !! ";
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                      }
          
                      throw new Error(errorMessage);
                })
            }
        }).then((data)=>{
            console.log("Reset link has been sent in your email");
        }).catch((err)=>{
            alert(err.message);
        })
    }

    return(
        <>
        <center>
         <form className='forget-form' onSubmit={forgotLinkHandler}>
            <h1>Forgot Password</h1>
            <label className='forget-label'>Enter the email with which you have registered</label>
            <input type= 'email' className='forget-link' placeholder='email' ref={emailLink} />
            <button className='link-btn'>Send Link</button>
         </form>
         </center>
        </>
    )
}

export default ForgetPassword;