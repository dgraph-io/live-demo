import React, { Component } from "react";
import SplitPane from "react-split-pane";

import "./App.css";

import Header from "./components/Header";
import EditorPanel from "./components/EditorPanel";
import Result from "./components/Result";

import { runQuery } from "./lib/helpers";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      result: "",
      fontSize: 17
    };
  }

  handleQueryRun = query => {
    runQuery(query)
      .then(result => {
        console.log(result);
        this.setState({ result });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleUpdateQuery = val => {
    this.setState({ query: val });
  };

  handleClearQuery = () => {
    this.setState({ query: "", result: "" });
  };

  handleIncrementFontSize = () => {
    this.setState({
      fontSize: this.state.fontSize + 1
    });
  };

  handleDecrementFontSize = () => {
    this.setState({
      fontSize: this.state.fontSize - 1
    });
  };

  render() {
    const { query, result, fontSize } = this.state;

    return (
      <div className="app">
        <Header
          query={query}
          onRunQuery={this.handleQueryRun}
          onClearQuery={this.handleClearQuery}
          onIncrementFontSize={this.handleIncrementFontSize}
          onDecrementFontSize={this.handleDecrementFontSize}
        />

        <main>
          <SplitPane split="vertical" defaultSize="40%">
            <EditorPanel
              query={query}
              onRunQuery={this.handleQueryRun}
              onUpdateQuery={this.handleUpdateQuery}
              fontSize={fontSize}
            />
            <Result result={result} fontSize={fontSize} />
          </SplitPane>
        </main>
      </div>
    );
  }
}

export default App;
