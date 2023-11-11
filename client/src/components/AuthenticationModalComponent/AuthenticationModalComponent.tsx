import React, { useEffect, MouseEvent } from "react";
import './AuthenticationModalComponent.css'


export default function AuthenticationModal() {
    const [isActive,
    setIsActive]=React.useState(false);
    const authenticationModal=useEffect(() =>{ document.getElementById("authenticationModal")});
    const handleEscapeModal = (event: MouseEvent) => {
        if ((event.target as HTMLDialogElement).id==="authenticationModal") {
            (event.target as HTMLDialogElement).close();
        }
    };
    function handleSwitchToSingIn() {
        setIsActive(false);
    }

    function handleSwitchToSingUp(event: MouseEvent) {
        setIsActive(true);
    }

    return (
        <> 
        <dialog className= {`container ${isActive? "active":""}`} id="authenticationModal" onClick={handleEscapeModal}> 
            <div className="form-container sign-up" > 
                <form method="dialog" > 
                    <h1 className="text-4xl font-extrabold dark:text-white">Create Account</h1> 
                    <div className="social-icons" > 
                        <a href="#" className="icon" > <i className="fa-brands fa-google" ></i> </a> 
                        <a href="#" className="icon" > <i className="fa-brands fa-facebook-f" ></i> </a> 
                        <a href="#" className="icon " > <i className="fa-brands fa-apple" ></i> </a> 
                        <a href="#" className="icon" > <i className="fa-solid fa-z" ></i> </a> 
                    </div> 
                    <span>no social accounts? use your email or phone number for registeration</span> 
                    <input type="text" placeholder="Name" required /> <input type="number" placeholder="Email or Phone Number" required /> 
                    <input type="password" placeholder="Password" required /> <button type="submit" >Sign Up</button> 
                    <span>By signing up, you agree you've read and accepted our <span className="text-sky-600"><a href="#">Terms and Conditions</a></span>. Please see our  <span className="text-sky-600"><a href="#">Privacy Policy</a></span> for information on how we process your data.</span> 
                </form> 
            </div> 
            <div className="form-container sign-in" > 
                <form action="" > 
                    <h1 className="text-4xl font-extrabold dark:text-white">Sign up</h1> 
                    <div className="social-icons" > 
                        <a href="#" className="icon" > <i className="fa-brands fa-google" ></i> </a> 
                        <a href="#" className="icon" > <i className="fa-brands fa-facebook-f" ></i> </a> 
                        <a href="#" className="icon" > <i className="fa-brands fa-apple" ></i> </a> 
                        <a href="#" className="icon" > <i className="fa-solid fa-z" ></i> </a> 
                    </div> 
                    <span>no social accounts? use your email or phone number for log in</span> 
                    <input type="text" placeholder="Email or Phone Number" required /> 
                    <input type="password" placeholder="Password" required /> 
                    <a className="text-sky-700" href="#" >Forget Your Password?</a> 
                    <span>By logging in, you agree to the Terms of Service and Privacy Policy</span> 
                    <button type="submit" >Sign In</button> 
                    </form> 
            </div> 
            <div className="toggle-container" > 
                <div className="toggle" > 
                    <div className="toggle-panel toggle-left" > 
                        <h1 className="text-5xl font-extrabold dark:text-white">Already have an account?</h1> 
                        <p>Enter your personal details to use all of site features</p> 
                        <button className="" id="login" onClick= {handleSwitchToSingIn}>Sign In</button> 
                    </div> 
                    <div className="toggle-panel toggle-right" > 
                        <h1 className="text-5xl font-extrabold dark:text-white">Need an account?</h1> 
                        <p>Register with your personal details to use all of site features</p> 
                        <button className="" id="register" onClick= {handleSwitchToSingUp}>Sign Up</button> 
                    </div> 
                </div> 
            </div> 
        </dialog> 
        </>)
}
