import React, { Component } from 'react';
import './../App.css';
import { AppContext } from "./../context/applicationContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

class Header extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = { collapse: true };
    }

    componentDidMount() {
       this.getTokenFromLocalStorage();
    }

    getTokenFromLocalStorage() {
        const token = localStorage.getItem('token');
        this.setState({token});
        setTimeout(() => {
            this.getTokenFromLocalStorage();
        }, 500);
    }

    logOut() {
        localStorage.removeItem('token');
    }

    render() {
        return (        
            <Navbar bg="light">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">Home</Link>
                        {this.state.token ? <Link to="/vote">Vote</Link> : null}
                        {this.state.token ? <Link to="/my-vote">My vote</Link> : null}
                        {this.state.token ? <Link to="/result">Results</Link> : null}

                        
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav> {!this.state.token ? <Link to="/login">Login</Link> : null}</Nav>
                        <Nav> {this.state.token ? <Link onClick={this.logOut} to="/">Log out</Link> : null}</Nav>
                    </Navbar.Collapse>
                
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
