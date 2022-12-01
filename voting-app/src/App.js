import React, { Component } from 'react';
import './App.css';
import Header from './Components/header';
import NAVIGATION from './navigation';

import * as interceptor from './Helpers/Interceptor/interceptor';

class App extends Component {
    constructor(props) {
        super(props);
        this.setStateCustom = (param, value) => {
            for (let key in this.state) {
                if (this.state.hasOwnProperty(key)) {
                    if (key === param) {
                        this.setState({ [key]: value });
                    }
                }
            }
        }
        this.state = {
            setStateCustom: this.setStateCustom,
            redirectTo: ''
        };
        console.log(interceptor);
    }

    render() {
        return (
            <div>
                <Header />

                <div className="container container-body">
                    <NAVIGATION />
                </div>

                <footer className="navbar-default navbar-fixed-bottom">
                    <div className="container-fluid text-center">
                        <span>Voting app - Tanya Naydenova</span>
                    </div>
                </footer>
            </div>
        );
    }
}
export default App;