import React, { Component } from "react";

import { RequestLoanForm } from "../RequestLoanForm/RequestLoanForm";

import "./App.css";

import Dharma from "@dharmaprotocol/dharma.js";

/*
 * Step 1:
 * Instantiate a new instance of Dharma, passing in the host of the local blockchain.
 */
const dharma = new Dharma();

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAwaitingBlockchain: false
        };

        this.createLoanRequest = this.createLoanRequest.bind(this);
    }

    async createLoanRequest(formData) {
        this.setState({
            isAwaitingBlockchain: true
        });

        const { LoanRequest } = Dharma.Types;

        /*
         * Step 2:
         * Fetch the current accounts from the blockchain.
         */
        const accounts = await dharma.blockchain.getAccounts();

        if (!accounts) {
            console.error("No acccounts detected from web3 -- ensure a local blockchain is running.");

            this.setState({ isAwaitingBlockchain: false });

            return;
        }

        // The user's Metamask address
        const debtorAddress = accounts[0];

        /* Values for this loan, determined off-chain! */
        const principal = 0.5;
        const probabilityOfRepayment = 0.75;
        const termLength = 24;
        const termUnit = "months";
        const interestRate = 1;
        const expiration = 1;
        const expirationUnit = "weeks";

        /*
         * Step 3:
         * Create a Dharma Debt Order when the form is submitted by the user.
         */
        const loanRequest = await LoanRequest.create(dharma, {
            principalAmount: principal,
            principalToken: "WETH",
            collateralAmount: principal * probabilityOfRepayment,
            collateralToken: "WETH",
            interestRate: interestRate,
            termDuration: termLength,
            termUnit: termUnit,
            debtorAddress: debtorAddress,
            expiresInDuration: expiration,
            expiresInUnit: expirationUnit,
            underwriter: "0x0559c499b71766038da6cb0b09bd340edff302bd",
            underwriterRiskRating: probabilityOfRepayment
        });

        this.setState({
            isAwaitingBlockchain: false
        });
        window.close();

    }

    render() {
        const { isAwaitingBlockchain } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Loan proposal</h1>
                    <p>We’ll instantly transfer 50,000 INR to your wallet if you agree to paying back 2,300 INR per month for 24 months.</p>
                </header>

                <RequestLoanForm
                    createLoanRequest={this.createLoanRequest}
                    isAwaitingBlockchain={isAwaitingBlockchain}
                />
            </div>
        );
    }
}
