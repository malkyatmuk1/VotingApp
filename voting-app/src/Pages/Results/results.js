import React, { Component } from 'react';
import './../../App.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            totalVotes: 0
        }
    }

    componentDidMount() {
        this.getVoteResults();
    }

    getVoteResults() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        };
        axios.get(`/vote-api/results`, { headers: headers }).then(response => {
            this.setState({results: (response?.data?.voteBeanList || []), totalVotes: response?.data?.totalVote});
        });
    }

       
    render() {
        const tableRows = this.state.results.map(el => {
            return <tr>
                <td>{el.voteParty.number}</td>
                <td>{el.voteParty.nameOfParty}</td>
                <td>{el.total}</td>
                <td>{el.percent}%</td>
            </tr>;
        })

        if (!tableRows?.length) {
            return <div className="col-md-12 mt-5 text-center"><h5>There are no results!</h5></div>
        }

        return (
            <div className="col-md-12 mt-5">
              <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Party</th>
                            <th>Votes</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                        <tr>
                            <td colSpan={2} className="text-right">Total:</td>
                            <td>{this.state.totalVotes}</td>
                            <td>100%</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Results;