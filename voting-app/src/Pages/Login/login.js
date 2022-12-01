import React, { Component } from 'react';
import './../../App.css';
import './login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectTo: '',
            userName: '', 
            password: '',
            progress: false,
            logged: false
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({ userName: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value});
    }
    handleSubmit(event) {
        this.login();
        event.preventDefault();
    }

    login = () => {
        this.setState({ progress: true });
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        };
        axios.post(`/admin-api/api/public/login`, JSON.stringify({
            "username": this.state.userName,
            "password": this.state.password
        }), { headers: headers }).then(response => {
            for (let entry of response.headers) {
                console.log(entry);
                if (entry && entry[0] && entry[0] === 'authorization') {
                    localStorage.setItem('token', entry[1]);
                }
                if (response?.data?.id) {
                    localStorage.setItem('userId', response.data.id);
                }
            }

            this.setState({logged: true});
        });
    }

       
    render() {

        if (this.state?.logged) {
            return <Navigate to="/vote" />
        }

        return (
            <div className="container">
                <div className="modal-dialog-sm text-center">
                    <div className="col-sm-5 main-section">
                        <div className="modal-content bg-dark pt-3 border border-dark">

                            <div className="col-12">
                                <h5 className="text-center text-light">Log in</h5>
                            </div>

                            <div className="col-12 pt-3 form-input">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">

                                <div className="form-group col-12 my-2">
                                    <input type="text" className="form-control" onChange={this.handleChangeUsername}
                                           title="Username" placeholder="Username" />
                                </div>
                    
                                <div className="form-group col-12 my-2">
                                    <input type="password" className="form-control" onChange={this.handleChangePassword}
                                        title="Password" placeholder="Password" />
                                </div>

                                <div className="col-12 my-3">
                                    <button type="submit"
                                            disabled={!(this.state.password && this.state.userName)} 
                                            className="btn btn-primary">Log in</button>
                                </div>

                                </div>
                            </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;