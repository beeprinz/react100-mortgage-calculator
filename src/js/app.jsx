import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { balance: 0, rate: 0, term: 15, result: 0 }; //does it have to be 0 or can it be blank

    this.handleChange = this.handleChange.bind(this);
    this.calcMortgagePayment = this.calcMortgagePayment.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: parseFloat(event.target.value) });
    //Why [] on name and () on value
  }

  calcMortgagePayment(event) {
    event.preventDefault();
    const { balance, rate, term } = this.state;
    let B = balance;
    let I = rate / 100 / 12;
    let N = term * 12;
    let calc = B * I * Math.pow(1 + I, N) / (Math.pow(1 + I, N) - 1);
    console.log({ B, I, N, calc });
    this.setState({ result: calc.toFixed(2) });
  }

  render() {
    return (
      <div className="container">
        <div className="m-5 row"> 
        <div className="col-md-8">
          <div className="card"> 
            <div className="card-body">
              <div>
              <div className="container">
                <h3>Mortgage Calculator</h3>
                <form className="form-horizontal">
                  <div className="form-group">
                    <label
                      htmlFor="inputLoanBalance"
                      className="col-sm-2 control-label"
                    >
                      Loan Balance
                    </label>
                    <div className="col-sm-10">
                      <input
                        name="balance"
                        type="number"
                        value={this.state.balance}
                        onChange={this.handleChange}
                        id="balance"
                        placeholder="Loan Balance"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputInterestRate"
                      className="col-sm-2 control-label"
                    >
                      Interest Rate
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        name="rate"
                        step="0.01"
                        value={this.state.rate}
                        onChange={this.handleChange}
                        id="inputInterestRate"
                        placeholder="Interest Rate"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="selectLoanTerm"
                      className="col-sm-2 control-label"
                    >
                      Loan Term (years)
                    </label>
                    <select name="term" onChange={this.handleChange}>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      {/* do i need onChange in option? */}
                    </select>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button
                        type="calculate"
                        name="submit"
                        onClick={this.calcMortgagePayment}
                      >
                        Calculate
                      </button>
                    </div>
                  </div>
                  <div>
                    <div id="output" value={this.state.output}>
                      {/* {"bind result of calculate function here"} */}
                      <p>${this.state.result} is your payment.</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}
