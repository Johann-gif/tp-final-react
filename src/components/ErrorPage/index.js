import React from "react";
import "./styles.css";

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="xs-12 md-6 mx-auto">
            <div id="countUp">
              <div class="number">404</div>
              <div class="text">Page not found</div>
              <div class="text">This may not mean anything.</div>
              <div class="text">
                I'm probably working on something that has blown up.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
