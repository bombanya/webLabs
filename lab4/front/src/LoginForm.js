import React, {Component} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Card} from "primereact/card";

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : ''
        }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
        this.props.errorDropF();
    }

    render() {
        const inputsClassName = this.props.loginError ? "p-invalid" : '';
        return(
            <div className="card">
                <div className="p-grid p-justify-center">
                    <Card className="p-xl-4 p-md-6 p-sm-8" title="Login">
                        <div className="p-grid">
                            <div className="p-col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"/>
                                    </span>
                                    <InputText placeholder="Username"
                                               name="username"
                                               onChange={this.handleChange}
                                               value={this.state.username}
                                               className={inputsClassName}
                                    />
                                </div>
                            </div>

                            <div className="p-col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-key"/>
                                    </span>
                                    <Password placeholder="Password"
                                              name="password"
                                              onChange={this.handleChange}
                                              value={this.state.password}
                                              feedback={false}
                                              toggleMask
                                              className={inputsClassName}
                                              aria-describedby="errorMessage"
                                    />
                                </div>
                                <small id="errorMessage" className="p-error p-d-block">
                                    {this.props.loginError && this.props.errorMessage}
                                </small>
                            </div>

                            <div className="p-col-12">
                                <Button label="Sign In" icon="pi pi-user" loading={this.props.loading} onClick={(e) =>
                                    this.props.loginF(this.state.username, this.state.password, e)}/>
                            </div>

                            <div className="p-col-12">
                                <Button label="Sign Up" icon="pi pi-user-plus" loading={this.props.loading} onClick={(e) =>
                                    this.props.signupF(this.state.username, this.state.password, e)}/>
                            </div>
                        </div>

                    </Card>

                </div>
            </div>
        )
    }
}

export default LoginForm;