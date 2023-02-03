import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { currentString: "", cancelStatus: false, isStarted: false };
        this.convertToBase64 = this.convertToBase64.bind(this);
        this.convertCancel = this.convertCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);        
    }

    handleInputChange = event => {        
        this.setState({
            currentString: event.target.value
        });
    };

    getRandomInt(max) {
        return  Math.floor(Math.random() * max) + 1;
    }

    async addOneChar(str, i) {

        if (!this.state.cancelStatus) {
            
            await fetch('convert?str=' + str + '&i=' + i)
                .then(res => res.json())
                .then((result) => {

                    if (result.convertMessage !== "Not Found") {
                        
                        document.getElementById('txtOutput').value += result.convertMessage;
                        var randomPause = this.getRandomInt(5);

                        console.log(result.convertMessage + " Pause=" + randomPause);
                        setTimeout(() => { this.addOneChar(str, i + 1); }, 1000 * randomPause);
                    }
                    else {
                        this.setState({ cancelStatus: false, isStarted: false });
                    }
                    
                }
            );

        }
    }

    
    convertToBase64() {                             
        document.getElementById('txtOutput').value = "";
        this.setState({ cancelStatus: false, isStarted: true });
        setTimeout(() => { this.addOneChar(this.state.currentString, 0); });                      
    }


    convertCancel() {
        document.getElementById('txtOutput').value = "";
        this.setState({ cancelStatus: true, isStarted: false });        
    }

    


  render() {
    return (
        <div className="row">
            <div className="col col-sm-12 col-md-6 col-lg-4 mx-auto">
                <h1 className="mb-5 text-center">Simple SPA</h1>
                <p className="mb-1">Enter a text</p>
                <div className="mb-3"><input className="e-input form-control" name="txtInput" type="text" value={this.currentString} onChange={this.handleInputChange} placeholder="" /></div>
                <div className="mb-3 text-end">
                    <button className="btn btn-primary me-2" disabled={this.state.isStarted ? true : false} onClick={this.convertToBase64}>Conver To Base64</button>
                    <button className="btn btn-danger ms-2" onClick={this.convertCancel}>Cancel</button>
                </div>
                <div className="mb-3"><input className="e-input form-control" id="txtOutput" type="text" readOnly={true} /></div>                                    
            </div>
        </div>
    );
    }

    
}
