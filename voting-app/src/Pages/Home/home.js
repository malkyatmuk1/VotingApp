import React, { Component } from 'react';
import './../../App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        console.log('Ctor home page');
    }
       
    render() {

        return (
            <div className="col-md-12 pt-5">
              <h1 className="text-center">Welcome to the voting system</h1>
            </div>
        );
    }
}

export default Home;