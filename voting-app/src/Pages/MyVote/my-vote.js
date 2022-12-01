import React, { Component } from 'react';
import './../../App.css';
import axios from 'axios'

class MyVote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectTo: '',
            userName: '', 
            password: '',
            progress: false,
            logged: false,
            party: null
        };

        this.handleChangeSalt = this.handleChangeSalt.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getUserToken();
    }

    getUserToken() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        };

        const userId = localStorage.getItem('userId');
        axios.get(`/vote-api/token/${userId}`, { headers: headers }).then(response => {
            console.log((response?.data?.token || null));
            this.setState({ password: (response?.data?.token || null) });
        });
    }

    handleChangeSalt(event) {
        this.setState({ salt: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value});
    }
    handleSubmit(event) {
        this.getVote();
        event.preventDefault();
    }


    getVote = () => {
        this.setState({ progress: true });
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        };
        axios.get(`/vote-api/vote?salt=${this.state.salt}&password=${this.state.password}`, { headers: headers }).then(response => {
            this.setState({party: response.data?.party});
        }).catch(error => {
            this.setState({ login: false, progress: false });
        })
    }
       
    render() {

        return (
            <div className="container">
                <div className="modal-dialog-sm text-center">
                    <div className="col-sm-5 main-section">
                        {!this.state?.party ? 
                            <div className="modal-content bg-dark pt-3 border border-dark">

                                <div className="col-12">
                                    <h5 className="text-center text-light">Authorize to see your vote.</h5>
                                </div>

                                <div className="col-12 pt-3 form-input">
                                    <form onSubmit={this.handleSubmit}>
                                    <div className="row">


                                    <div className="form-group col-12 my-2">
                                        <input type="text" className="form-control"
                                        value={this.state?.password} 
                                        onChange={this.handleChangePassword}
                                        readonly disabled title="Token" placeholder="Token" />
                                    </div>

                                    <div className="form-group col-12 my-2">
                                        <input type="password" className="form-control" onChange={this.handleChangeSalt}
                                            title="Password" placeholder="Password" />
                                    </div>
                                    

                                    <div className="col-12 my-3">
                                        <button type="submit"
                                                disabled={!(this.state.password && this.state.salt)}
                                                className="btn btn-primary">Authorize</button>
                                    </div>

                                    </div>
                                </form>
                                </div>
                            </div> : null}

                        {this.state?.party ? <div className="modal-content bg-dark pt-3 border border-dark p-3">
                            <h5 className='text-light'>You voted for {this.state.party}</h5>
                        </div> : null}

                            
                        
                    </div>
                </div>

            </div>
        );
    }
}

export default MyVote;