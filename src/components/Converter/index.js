import React from "react";
import Spinner from "../Spinner/";
import "./materialize.css";

export default class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      inputDevises: "EUR",
      outputDevises: "USD",
      oldinputDevises: null,
      oldoutputDevises: null,
      montant: 0,
      taux: null,
      loading: false,
      class: null
    };
    this.deviseChanged = this.deviseChanged.bind(this);
  }

  async deviseChanged(event) {
    await this.setState({ [event.target.name]: event.target.value });
    if (parseInt(this.state.montant, 10) === 0) {
      this.setState({
        class: "valid",
        result: 0
      });
    } else if (isNaN(this.state.montant)) {
      this.setState({
        class: "invalid",
        result: 0
      });
    } else if (!this.state.montant) {
      this.setState({
        class: "invalid",
        result: 0
      });
    } else if (this.state.inputDevises === this.state.outputDevises) {
      this.setState({
        class: "valid",
        result: this.state.montant
      });
    } else if (
      this.state.inputDevises === this.state.oldinputDevises &&
      this.state.outputDevises === this.state.oldoutputDevises
    ) {
      this.setState({
        class: "valid",
        result: this.state.montant * this.state.taux
      });
    } else {
      this.setState({ loading: true, class: "valid" }, () => {
        setTimeout(() => {
          fetch(
            "https://api.exchangeratesapi.io/latest?symbols=" +
              this.state.outputDevises +
              "&base=" +
              this.state.inputDevises
          )
            .then((res) => res.json())
            .then((result) => {
              this.setState({
                loading: false,
                result:
                  this.state.montant * result.rates[this.state.outputDevises],
                taux: result.rates[this.state.outputDevises],
                oldinputDevises: this.state.inputDevises,
                oldoutputDevises: this.state.outputDevises
              });
            });
        }, 500);
      });
    }
  }

  render() {
    return (
      <div className="row">
        <h3>Convertisseur</h3>
        <div className="col s8">
          <div className="row">
            <div className="col s6">
              <select
                className="browser-default"
                name="inputDevises"
                id="inputDevises"
                value={this.state.inputDevises}
                onChange={this.deviseChanged}
              >
                <option value="EUR">EUR</option>
                <option value="CHF">CHF</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div className="col s6">
              <select
                value={this.state.outputDevises}
                className="browser-default"
                name="outputDevises"
                id="outputDevises"
                onChange={this.deviseChanged}
              >
                <option value="EUR">EUR</option>
                <option value="CHF">CHF</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="amount"
                type="text"
                name="montant"
                placeholder="0"
                className={this.state.class}
                onChange={this.deviseChanged}
                value={this.state.montant}
              />

              <span
                className="helper-text"
                data-error="Erreur"
                data-success="Valide"
              ></span>
              <label className="active" htmlFor="amount">
                Montant
              </label>
            </div>
            <div className="input-field col s12">
              <h5>
                Résultat :{" "}
                {this.state.loading ? <Spinner /> : this.state.result}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
