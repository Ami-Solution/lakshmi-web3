import React, { Component } from "react";

import RequestLoanFormSubmit from "./Submit/RequestLoanFormSubmit";

import "./RequestLoanForm.css";

export class RequestLoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.createLoanRequest(this.state);
    }

    render() {
        const { isAwaitingBlockchain } = this.props;

        return (
            <form className="request-form" onSubmit={this.handleSubmit}>

                <RequestLoanFormSubmit disabled={isAwaitingBlockchain} />
            </form>
        );
    }
}
