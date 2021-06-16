import React, {Component} from "react";
import {ReactComponent as SVG} from './graph.svg';
import {Card} from "primereact/card";
import RadioCheckbox from "./RadioCheckbox";
import {Slider} from "primereact/slider";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

class MainPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            x : -3,
            xGroup: [-3, -2, -1, 0, 1, 2, 3, 4, 5],
            r : 1,
            rGroup: [1, 2, 3, 4, 5],
            y : 0,
            userPoints: [],
            xFromMouse : '',
            yFromMouse : '',
            sendingLoading : false
        }
    }

    getAllUserPoints = () => {
        fetch(this.props.data.serverURL + "api/allpoints/"
            + this.props.data.username, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'authorization' : 'Basic ' + btoa(this.props.data.username + ":" + this.props.data.password),
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(r => r.json())
            .then(data => this.setState({userPoints: data}))
            .then(() => this.managePoints());
    }

    createNewPoint = (pointX, pointY) => {
        const data = {
            x : pointX.toFixed(2),
            y : pointY.toFixed(2),
            r : this.state.r
        }

        fetch(this.props.data.serverURL + "api/newpoint", {
            credentials: 'include',
            method: 'POST',
            body : JSON.stringify(data),
            headers: {
                'authorization' : 'Basic ' + btoa(this.props.data.username + ":" + this.props.data.password),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => this.setState({userPoints: [...this.state.userPoints, data]}))
            .then(() => this.managePoints());
    }

    svgMouseMoveHandler = (event) => {
        const svgSize = document.getElementById("svg").clientWidth;
        const x = (event.pageX - document.getElementById("svgDiv").offsetLeft -
            document.getElementById("svg").clientLeft - svgSize / 2) * 560 / 225 / svgSize * this.state.r;
        const y = -(event.pageY - document.getElementById("svgDiv").offsetTop -
            document.getElementById("svg").clientTop - svgSize / 2) * 560 / 225 / svgSize * this.state.r;
        this.setState({xFromMouse : x, yFromMouse : y});
    }

    managePoints = () => {
        const currentRadius = this.state.r;

        this.state.userPoints.forEach(function (point, ) {
            let dot;
            if (document.getElementById("point" + point.id) == null){
                dot = document.getElementById("newDot").cloneNode(false);
                if (point.boolResult) dot.setAttribute("fill", "green");
                else dot.setAttribute("fill", "red");
                dot.setAttribute("id", "point" + point.id);
                document.getElementById("svg").appendChild(dot);
            }
            else dot = document.getElementById("point" + point.id);
            dot.setAttribute("cx", (point.x  / currentRadius
                * 225 + 280).toString());
            dot.setAttribute("cy", (-point.y / currentRadius
                * 225 + 280).toString());
        })
        if (this.state.sendingLoading) this.setState({sendingLoading : false});
    }

    radiusChanger = (event) => {
        if (event.checked) this.setState({r : event.value}, () => this.managePoints());

        document.getElementById("negX").textContent = (-event.value).toString();
        document.getElementById("negX/2").textContent = (-event.value/2).toString();
        document.getElementById("posX").textContent = event.value;
        document.getElementById("posX/2").textContent = (event.value/2).toString();
        document.getElementById("posY").textContent = event.value;
        document.getElementById("posY/2").textContent = (event.value/2).toString();
        document.getElementById("negY").textContent = (-event.value).toString();
        document.getElementById("negY/2").textContent = (-event.value/2).toString();
    }

    componentDidMount() {
        this.getAllUserPoints();
    }

    render() {
        return(
            <div className="p-grid p-justify-around">
                <div className="p-col-10 p-xl-4">
                    <Card title="Points form">
                        <RadioCheckbox labels={this.state.xGroup}
                                       title="Coordinate X"
                                       checkedLabel={this.state.x}
                                       changer={(event) => {
                                           if (event.checked) this.setState({x : event.value});
                                       }}/>

                        <div className="p-grid">
                            <div className="p-col-12"><h5>Coordinate Y: {this.state.y}</h5></div>

                            <div className="p-col-7">
                                <Slider value={this.state.y}
                                        onChange={(e) => this.setState({y: Math.round(e.value * 10) / 10})}
                                        min={-3}
                                        max={5}
                                        step={0.2}

                                />

                            </div>
                        </div>

                        <RadioCheckbox labels={this.state.rGroup}
                                       title="Radius"
                                       checkedLabel={this.state.r}
                                       changer={this.radiusChanger}/>

                        <Button label="Submit"
                                icon="pi pi-send"
                                loading={this.state.sendingLoading}
                                onClick={() => {
                                    this.setState({sendingLoading : true});
                                    this.createNewPoint(this.state.x, this.state.y);
                                }}/>
                    </Card>
                </div>

                <div className="p-col-10 p-xl-4">
                    <Card  title="Graph">
                        <div id="svgDiv">
                            <SVG onMouseMove={this.svgMouseMoveHandler} onClick={() =>
                                this.createNewPoint(this.state.xFromMouse, this.state.yFromMouse)}/>
                        </div>
                        <div>
                            {this.state.xFromMouse === '' &&
                            <h6>You can select the coordinates of a point by clicking on the graph</h6>}

                            {this.state.xFromMouse !== '' &&
                            <h6>
                                Point coords: x: {this.state.xFromMouse.toFixed(2)}
                                ; y: {this.state.yFromMouse.toFixed(2)}
                            </h6>}

                        </div>
                    </Card>
                </div>

                <div className="p-col-10 p-xl-6">
                    <Card title="Points table">
                        <DataTable value={this.state.userPoints} scrollable scrollHeight="500px" >
                            <Column field="timeOfRequest" headerStyle={{ width: '150px' }} header="Time of request"/>
                            <Column field="workTime" headerStyle={{ width: '150px' }} header="Script work time"/>
                            <Column field="r" headerStyle={{ width: '100px' }} header="R"/>
                            <Column field="x" headerStyle={{ width: '100px' }} header="X"/>
                            <Column field="y" headerStyle={{ width: '100px' }} header="Y"/>
                            <Column field="result" headerStyle={{ width: '200px' }} header="Result"/>
                        </DataTable>
                    </Card>
                </div>

            </div>
        )
    }
}

export default MainPage;