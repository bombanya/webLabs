import React, {Component} from "react";
import {Checkbox} from "primereact/checkbox";

class RadioCheckbox extends Component{

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <h5>{this.props.title}: {this.props.checkedLabel}</h5>
                </div>

                {this.props.labels.map((label) =>
                    <div className="p-col-4 p-field-checkbox" key={this.props.title + label.toString()}>
                        <Checkbox inputId={label.toString()} value={label} onChange={this.props.changer}
                                  checked={this.props.checkedLabel === label}/>
                        <label htmlFor={label.toString()}>{label}</label>
                    </div>)}
            </div>

        )
    }
}

export default RadioCheckbox;