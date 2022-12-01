import React, { Component } from 'react';
import './../../App.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Vote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectTo: '',
            userName: '', 
            password: '',
            progress: false,
            logged: false,
            party: null,
            parties: null,
            voteSuccessfull: false,
            votedFor: '',
            navigateToMyVote: false
        };

        this.getAllParties();

        this.handleChangeSalt = this.handleChangeSalt.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeParty = this.handleChangeParty.bind(this);
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
            if (response?.data?.isVoted) {
                this.setState({ navigateToMyVote: true });
            } else {
                this.setState({ password: (response?.data?.token || null) });
            }
        });
    }

    getAllParties() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        };
        axios.get(`/vote-api/parties`, { headers: headers }).then(response => {
            this.setState({parties: (response?.data || [])});
        });
    }

    handleChangeSalt(event) {
        this.setState({ salt: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value});
    }
    handleChangeParty(event) {
        console.log(event.target.value);
        this.setState({ party: event.target.value});
    }
    handleSubmit(event) {
        this.vote();
        event.preventDefault();
    }

    vote() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        };
        const body = {
            password: this.state.password, salt: this.state.salt, partyId: this.state.party
        }
        axios.put(`/vote-api/add/vote`, body, { headers: headers }).then(response => {
            this.setState({voteSuccessfull: true, votedFor: response.data.party});
            this.markUserAsVoted();
        });
    }

    markUserAsVoted() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        };

        const userId = localStorage.getItem('userId');
        axios.put(`/vote-api/user/voted/` + userId, {}, { headers: headers }).then(response => {
        
        });
    }

    render() {
        if (this.state?.navigateToMyVote) {
            return <Navigate to="/my-vote" />
        }

        const parties = this.state.parties ? this.state.parties.map(parti => {
            return <option key={parti.id} value={parti.id}>{parti.number} - {parti.nameOfParty}</option>
            }) : null;

        return (
            <div className="container">
                <div className="modal-dialog-sm text-center">
                    <div className="col-sm-5 main-section">
                        {!this.state?.voteSuccessfull ? 
                            <div className="modal-content bg-dark pt-3 border border-dark">

                                <div className="col-12">
                                    <h5 className="text-center text-light">Please authorize and vote.</h5>
                                </div>

                                <div className="col-12 pt-3 form-input">
                                    <form onSubmit={this.handleSubmit}>
                                    <div className="row">


                                    <div className="form-group col-12 my-2">
                                        <input type="text" className="form-control" 
                                        value={this.state.password}
                                        onChange={this.handleChangePassword}
                                        readonly disabled title="Token" placeholder="Token" />
                                    </div>

                                    <div className="form-group col-12 my-2">
                                        <input type="password" className="form-control" onChange={this.handleChangeSalt}
                                            title="Password" placeholder="Password" />
                                    </div>

                                    <div className="form-group col-12 my-2">
                                        <select className='form-control' onChange={this.handleChangeParty}>
                                            <option value='' hidden>Select party</option>
                                            {parties}
                                        </select>
                                    </div>                                    

                                    <div className="col-12 my-3">
                                        <button type="submit"
                                                disabled={!(this.state.password && this.state.salt && this.state.party)}
                                                className="btn btn-primary">Vote</button>
                                    </div>

                                    </div>
                                </form>
                                </div>
                            </div> : null}

                        {(this.state?.voteSuccessfull) ? <div className="modal-content bg-dark pt-3 border border-dark p-3">
                            <h5 className='text-light'>You voted for {this.state.votedFor}</h5>
                        </div> : null}

                    </div>
                </div>

            </div>
        );
    }
}

export default Vote;