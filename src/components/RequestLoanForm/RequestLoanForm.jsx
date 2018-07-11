import React, { Component } from "react";

import RequestLoanFormInput from "./Input/RequestLoanFormInput";
import RequestLoanFormSubmit from "./Submit/RequestLoanFormSubmit";

import "./RequestLoanForm.css";

export class RequestLoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 0,
            collateral: 0,
            interestRate: 0,
            expiration: 0,
            termLength: 0,
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
        const { principal, collateral, expiration, termLength, interestRate } = this.state;

        return (
            <form className="request-form" onSubmit={this.handleSubmit}>
                <RequestLoanFormInput
                    label="Principal Amount (WETH)"
                    name="principal"
                    value={principal}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Collateral Amount (REP)"
                    name="collateral"
                    value={collateral}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Interest Rate (as a %)"
                    name="interestRate"
                    value={interestRate}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Term Length (months)"
                    name="termLength"
                    value={termLength}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormInput
                    label="Expiration (weeks)"
                    name="expiration"
                    value={expiration}
                    disabled={isAwaitingBlockchain}
                    handleInputChange={this.handleInputChange}
                />

                <RequestLoanFormSubmit disabled={isAwaitingBlockchain} />
            </form>
        );
    }
}
