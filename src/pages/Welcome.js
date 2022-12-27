import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import './Welcome.css'


const Welcome = () =>{

    const authctx = useContext(AuthContext);
    const history = useHistory();


   const logoutHandler =() =>{
        history.replace('/auth')
        console.log("Logout Succesfully")
        localStorage.clear();
    }

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
                <button onClick={logoutHandler} className='logout-btn'>Logout</button>
            </section>

            <center>
            <section className='email-section'>
                <p className='email-para'> You Need To Verify your email</p>
                <button onClick={verifyHandler} className="email-btn" >Click here</button>
            </section>
            </center>

        </div>

        <div>
            <h1>Track your Expense 📝</h1>
            <Link to='/expense' >Click Here</Link>
        </div>
        </>
    )
}

export default Welcome;