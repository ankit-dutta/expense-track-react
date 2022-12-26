import { useContext, useRef } from 'react';
import AuthContext from '../store/auth-context';
import './Profile.css';

const Profile = () =>{
    const nameRef = useRef();
    const photoRef = useRef()
    const authCtx = useContext(AuthContext);
//   console.log("token", authCtx.token)
//   const token = localStorage.getItem("token");


    const updateHandler = (event) =>{
        event.preventDefault()
        console.log('submit')
        console.log(authCtx.token,"token")

        const enteredName = nameRef.current.value;
        const enteredUrl = photoRef.current.value;

        console.log(enteredName , enteredUrl)


      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_KEY}` , {
        method:"POST",
        body: JSON.stringify({
            idToken: authCtx.token,
            displayName: enteredName,
            photoUrl: enteredUrl,
            returnSecureToken: true,
        }),
        headers:{
            'Content-Type':'application/json'
        }
      }).then((res)=>{
        if(res.ok){
            return res.json();
        }else{
            return res.json().then((data)=>{
                let errorMessage = "could not update profile";

                if(data && data.error && data.error.message){
                    errorMessage = data.error.message
                }

                throw new Error(errorMessage);
            });
        }
      }).then((data)=>{
        alert("Profile has been updated");
        console.log("profile updated succesfully");
        console.log(data);
      }).catch((err)=>{
        alert(err.message);
      })
    }

    return(
        <>
          
          <div className="welcome-heading">
                <div>
                    <h1 className='left-heading'>Winner never quite, Quitter never win</h1>
                </div>

                <div>
                    <h1 className='right-heading'>Your profile is 64% completed. A complete profile has higher chances of landing a job. <a href="#">complete now</a></h1>
                </div>
            </div>

            <hr />

            <div className="content-container">
                <div className="contact-heading">
                <h1>Contact Details</h1>
                <button className='cncl-btn'>Cancel</button>
                </div>

                <div >
                    <form onSubmit={updateHandler}>
                    <div className='name-section'>
                        <p><strong>Full Name</strong></p>
                        <input type='text' ref={nameRef} />
                    </div>

                    <div>
                        <p><strong>Profile URL</strong></p>
                        <input type='text' ref={photoRef} />
                    </div>

                    <div>
                    <button type='submit' className='update-btn'>Update</button>
                    </div>
                    </form>
                </div>

              
               
            </div>

        </>
    )
}

export default Profile;