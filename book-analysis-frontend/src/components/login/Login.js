import React, {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../../UserContext";
import "./login.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {useUpdateEffect} from "react-use";

export const Login = () => {
    const {setUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);


    useUpdateEffect(() => {
        window.alert(errorMsg);
    }, [errorMsg]);


    async function sendLoginRequest(e) {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8082/auth', {
                username: username,
                password: password
            }).then((response) => {
                console.log(response.data);
                if (response.data === 200) {
                    console.log("logged in successfully");
                    setUser(username);
                    localStorage.setItem('logged_user', username);
                    window.location.reload();
                } else if (response.data === 404) {
                    setErrorMsg("Invalid username or password");
                } else {
                    setErrorMsg("Something went wrong, try again later...");
                }
            });
        } catch (error) {
            console.log(`error: `, error)
        }
    }
    return (
        <div className={"Auth-form-container"}>
            <form className={"Auth-form"}>
                <div className={"Auth-form-content"}>
                    <h3 className="Auth-form-title">Log In</h3>
                    <div className="form-group mt-3">
                        <label htmlFor={username}> Username:</label>
                        <input placeholder={"Enter Username"}
                               className={"form-control mt-1"}
                               type={"text"}
                               id={"username"}
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor={password}> Password:</label>
                        <input placeholder={"Enter password"}
                               className={"form-control mt-1"}
                               type={"password"} id={"password"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button className={"btn btn-primary"} type={"submit"} onClick={(e) => sendLoginRequest(e)}> Submit </button>
                    </div>
                </div>
            </form>
        </div>
    );
};