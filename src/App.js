import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  // don't have to write constructor
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const winner = await lottery.methods.getWinner().call();

    this.setState({ manager, players, balance, winner });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "You have been entered into the lottery!" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Calculting the winner......" });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    // add code to display the winner address
    this.setState({
      message: "!!!AND THE WINNER IS....!!!",
    });
  };

  render() {
    return (
      <div class="app">
        <h2 style={{ color: "#2196f3" }}>Lottery Contract</h2>
        <p>
          This Contract for a lottery is managed by {this.state.manager}
          <br />
          There are currently {this.state.players.length} players in this
          lottery competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether.
        </p>
        <br />
        <form onSubmit={this.onSubmit}>
          <h4 style={{ color: "#2196f3" }}>Want to try your luck?</h4>
          <div>
            <span>Amount of ether to enter </span>
            <input
              type="text"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <br />
          <button class="button button1">Enter</button>
        </form>
        <h1>{this.state.message}</h1>
        <br />
        <br />
        <br />
        <button class="button button2" onClick={this.onClick}>
          PICK A WINNER
        </button>

        <br />
        <br />
        <br />
        <br />
        <br />
        <a
          className="App-link"
          href="https://github.com/mxj9017/lottery-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Project Github Link
        </a>
      </div>
    );
  }
}
export default App;
