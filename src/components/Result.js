import React from "react";
import TreeView from "react-treeview";
import classnames from "classnames";
import Showmore from "react-show-more";

import "../assets/css/Result.css";
import logo from "../assets/images/gopherconsg.svg";

function isObject(val) {
  if (val === null) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
}

function isString(val) {
  return typeof val === "string";
}

function renderTree(node) {
  if (Array.isArray(node)) {
    return node.map((val, idx) => {
      return renderTree(val);
    });
  } else if (isObject(node)) {
    return Object.keys(node).map((key, i) => {
      const val = node[key];

      let hasTreeChild = false;
      if (isObject(val) || Array.isArray(val)) {
        hasTreeChild = true;
      }

      return (
        <TreeView
          key={key + "|" + i}
          nodeLabel={`${key}:`}
          defaultCollapsed={false}
          itemClassName={classnames({ "has-tree-child": hasTreeChild })}
        >
          {renderTree(val)}
        </TreeView>
      );
    });
  } else {
    if (isString(node)) {
      return (
        <div className="nodetype-string">
          <Showmore lines={1} more="more">
            <span className="test">
              {node}
            </span>
          </Showmore>
        </div>
      );
    }

    let klass;
    if (!isNaN(node)) {
      klass = "nodetype-number";
    }
    return <span className={klass}>{node}</span>;
  }
}

const Result = ({ result, fontSize }) => {
  if (!result) {
    return (
      <div className="empty-result-container">
        <img src={logo} alt="hello" className="placeholder-img" />
      </div>
    );
  }

  const { server_latency: omit, ...data } = result;

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      {renderTree(data)}
    </div>
  );
};
export default Result;
