import React from "react";
import classnames from "classnames";

import logo from "../assets/images/logo.svg";
import "../assets/css/Header.css";

const Header = ({
  query,
  fontSize,
  onRunQuery,
  onUpdateQuery,
  onClearQuery,
  onIncrementFontSize,
  onDecrementFontSize
}) => {
  return (
    <div className="navbar navbar-light bg-faded">
      <div className="container">
        <a href="/" className="navbar-brand">
          <img src={logo} alt="logo" className="logo" />
        </a>

        <div className="actions">
          <a
            href="#run"
            className={classnames("action run-btn", {
              actionable: query !== ""
            })}
            onClick={e => {
              e.preventDefault();
              if (query === "") {
                return;
              }

              onRunQuery(query);
            }}
          >
            <i className="fa fa-play" /> Run
          </a>
          <a
            href="#clear"
            className={classnames("action clear-btn", {
              actionable: query !== ""
            })}
            onClick={e => {
              e.preventDefault();
              if (query === "") {
                return;
              }

              onClearQuery();
            }}
          >
            <i className="fa fa-close" /> Clear
          </a>
          <a
            href="#inc-font"
            className={classnames("action run-btn", {
              actionable: query !== ""
            })}
            onClick={e => {
              e.preventDefault();
              onIncrementFontSize();
            }}
          >
            Font +
          </a>
          <a
            href="#dec-font"
            className={classnames("action run-btn")}
            onClick={e => {
              e.preventDefault();
              onDecrementFontSize();
            }}
          >
            Font -
          </a>
        </div>
      </div>
    </div>
  );
};
export default Header;
