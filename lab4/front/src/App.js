import React, {Component} from "react";
import LoginForm from "./LoginForm";
import MainPage from "./MainPage";
import Navbar from "./Navbar";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : '',
            isLogged : false,
            serverURL : "http://localhost:8080/",
            loginLoading : false,
            loginError : false,
            errorMessage : ''
        }

        this.login = this.login.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
    }

    async login(currentUsername, currentPassword, event) {
        event.preventDefault();
        this.setState({loginLoading : true});

        try{
            const response = await fetch(this.state.serverURL + "auth", {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'authorization' : 'Basic ' + btoa(currentUsername + ":" + currentPassword),
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.ok) {
                this.setState({username : currentUsername, password : currentPassword, isLogged : true,
                                    loginError : false, errorMessage : ''});
            }
            else this.setState({loginError : true, errorMessage : "Login or password is not suitable"});
        }
        finally {
            this.setState({loginLoading : false});
        }
    }

    async createNewUser(currentUsername, currentPassword, event){
        event.preventDefault();

        if (currentUsername.length === 0 || currentUsername.length > 50){
            this.setState({loginError : true, errorMessage : "Login cannot be an empty " +
                    "string or longer than 50 chars"});
            return;
        }

        if (currentPassword.length === 0 || currentPassword.length > 100){
            this.setState({loginError : true, errorMessage : "Password cannot be an " +
                    "empty string or longer than 100 chars"});
            return;
        }

        this.setState({loginLoading : true});

        const bcrypt = require('bcryptjs');

        const hash = await bcrypt.hash(currentPassword, 12);
        const data = {username: currentUsername, password: hash};

        try{
            const response = await fetch(this.state.serverURL + "auth/signUp", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                this.setState({username: currentUsername, password: currentPassword, isLogged: true,
                                    loginError : false, errorMessage : ''});
            }
            else response.text().then((text) => {
                this.setState({loginError : true, errorMessage : text})
            });
        }
        finally {
            this.setState({loginLoading : false});
        }
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Navbar
                        text={this.state.isLogged ? this.state.username : "Proshkin Nikita P3231 Var 9144"}
                        logoutF={() => this.setState({username : '', password : '', isLogged : false })}
                        isLogged={this.state.isLogged}
                    />
                </div>

                <div className="p-col-12">
                    {!this.state.isLogged && <LoginForm loginF={this.login}
                                                        signupF={this.createNewUser}
                                                        loading={this.state.loginLoading}
                                                        loginError={this.state.loginError}
                                                        errorMessage={this.state.errorMessage}
                                                        errorDropF={() => this.setState({loginError : false})}
                    />}

                    {this.state.isLogged && <MainPage data={this.state}/>}
                </div>
            </div>
        );
    }
}

export default App;