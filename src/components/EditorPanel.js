import React from "react";

import Editor from "./Editor";

import "../assets/css/EditorPanel.css";

class EditorPanel extends React.Component {
  render() {
    const { query, fontSize, onRunQuery, onUpdateQuery } = this.props;

    return (
      <div className="editor-panel">
        <Editor
          query={query}
          onUpdateQuery={onUpdateQuery}
          onRunQuery={onRunQuery}
          fontSize={fontSize}
        />
      </div>
    );
  }
}

export default EditorPanel;
