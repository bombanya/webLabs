import React, {Component} from "react";
import {Button} from "primereact/button";

class Navbar extends Component{

    render() {
        return(
            <div className="p-menubar p-grid p-justify-between">
                <div className="p-col-7 p-text-bold">
                    {this.props.text}
                </div>

                {this.props.isLogged &&
                <div className="p-col-5 p-justify-end p-grid">
                    <Button
                        className="p-button-text p-button-secondary"
                        label="Logout"
                        icon="pi pi-power-off"
                        onClick={this.props.logoutF}
                    />
                </div>}

            </div>
        )
    }

}

export default Navbar;