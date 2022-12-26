import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import './Welcome.css'


const Welcome = () =>{

    const authctx = useContext(AuthContext);

   const verifyHandler = () =>{
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_KEY}`,{
        method:"POST",
        body:JSON.stringify({
            requestType:"VERIFY_EMAIL",
            idToken:authctx.token,
        }),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok){
            return res.json
        }else{
            return res.json().then((data)=>{
                let errorMessage = "Not Getting Fetched Data";
                if(data && data.error && data.errorMessage){
                    errorMessage = data.error.message
                }
                throw new Error(errorMessage);
            })
        }
    }).then((data)=>{
        console.log("Your Email is Verified");
        console.log(data.email  ,"welcome email");
    })
    .catch((err)=>{
        alert(err.message)
    })

    }

    return(
        <>
        <div>

            <div className="welcome-heading">
                <div>
                    <h1 className='left-heading'>Welcome to Expense Tracker</h1>
                </div>

                <div>
                    <h1 className='right-heading'>Your profile is Incomplete: <Link to="/profile">complete now</Link></h1>
                </div>
            </div>
            <hr />


            <section>
                <p>Verify your email</p>
                <button onClick={verifyHandler} >Click here</button>
            </section>

        </div>
        </>
    )
}

export default Welcome;