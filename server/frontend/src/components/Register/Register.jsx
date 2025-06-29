import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const gohome = () => {
        window.location.href = "/"; //Routes the user to Home.html
    };

    let url_for_register = window.location.origin + "/djangoapp/registration"

    const register = async (e) =>{

        e.preventDefault(); //Prevents default behavour 

        if(userName && password && firstName && lastName && email){

            const res = await fetch(url_for_register, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userName": userName,
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password
                }),
            });
            
            const json = await res.json();

            if(json.message === "Registered"){
                sessionStorage.setItem('username', json.userName);
                window.location.href = "/"; //Routes the user to Home.html
            } else{
                alert(json.message);
            }

        } else{
            alert("Invalid: Some fields are missing");
        }
    };

    return(
        <>
        <div className="register_container" style={{width: "50%"}}>
            <div className="header" style={{display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
            <span className="text" style={{flexGrow:"1"}}>SignUp</span> 
            <div style={{display: "flex",flexDirection: "row", justifySelf: "end", alignSelf: "start" }}>
            <a href="/" onClick={()=>{gohome()}} style={{justifyContent: "space-between", alignItems:"flex-end"}}>
                <img style={{width:"1cm"}} src={close_icon} alt="X"/>
            </a>
            </div>
            <hr/>
            </div>

            <form onSubmit={register}>
                <div className="inputs">

                    <div className="input">

                    <img src={user_icon} className="img_icon" alt='Username'/>
                    <input type="text" className="input_field" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>

                    </div>
                    {/* ================================================================================ */}
                    <div className="input">

                    <img src={user_icon} className="img_icon" alt='Firstname'/>
                    <input type="text" className="input_field" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>

                    </div>
                    {/* ================================================================================ */}
                    <div className="input">

                    <img src={user_icon} className="img_icon" alt='Lastname'/>
                    <input type="text" className="input_field" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>

                    </div>
                    {/* ================================================================================ */}
                    <div className="input">

                    <img src={email_icon} className="img_icon" alt='Email'/>
                    <input type="text" className="input_field" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

                    </div>
                    {/* ================================================================================ */}
                    <div className="input">

                    <img src={password_icon} className="img_icon" alt='Password'/>
                    <input type="text" className="input_field" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

                    </div>

                    <div className="submit_panel">
                        {/* Attribute type="submit" feeds the onSubmit of the <form/> */}
                        <input className="submit" type="submit" value="Register"/> 
                    </div>

                </div>
            </form>

        </div>
        </>
    );

};

export default Register;