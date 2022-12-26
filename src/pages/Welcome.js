import { Link } from 'react-router-dom';
import './Welcome.css'

const Welcome = () =>{
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

        </div>
        </>
    )
}

export default Welcome;