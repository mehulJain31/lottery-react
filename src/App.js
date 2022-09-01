import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { manager: "" };
  }
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();

    this.setState({ manager });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Lottery Contract</h2>
          <h3>
            This Contract for a lottery is managed by {this.state.manager}
          </h3>
          <a
            className="App-link"
            href="https://github.com/mxj9017/lottery-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Github Link
          </a>
        </header>
      </div>
    );
  }
}
export default App;
