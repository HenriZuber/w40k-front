import React from 'react';
import './Home.css';
import loading from '../loading.svg';
import { Spinner } from 'react-bootstrap';

const axios = require('axios');

class Home extends React.Component {

    constructor() {
        super();
        this.dispatch_workforce = this.dispatch_workforce.bind(this)
        this.state = {
            button_state: false,
            button_text: 'Dispatch workforce',
            title_from: "Home",
        }
    }

    dispatch_workforce() {
        console.log('starting call ...');
        this.setState({ button_state: true });
        this.setState({ button_text: '' });

        axios.post('https://g1uvtzoixf.execute-api.eu-west-3.amazonaws.com/default/CovidRepartition', {
        })
            .then((response) => {
                console.log(response);
                this.setState({ button_state: false });
                this.setState({ button_text: 'Dispatch workforce' });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ button_state: false });
                this.setState({ button_text: 'Dispatch workforce' });
            });
    }

    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                    <img src={loading} className="Home-logo" alt="loading" />
                    <h1>Hello from {this.state.title_from}</h1>
                </header>
                <div className="Body-button">
                    <button type="button" class="btn btn-primary" disabled={this.state.button_state} onClick={this.dispatch_workforce}> {this.state.button_text}
                        {this.state.button_state && <Spinner animation="border" role="status">
                        </Spinner>}
                    </button>
                </div>
            </div>
        );
    }
}

export default Home;