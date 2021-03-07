import React, { Component } from 'react'


class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          this.props.buyTokens(etherAmount)
        }}>
        <div>
          <label className="float-left">Value</label>
          <span className="float-right text-muted">
            Bal: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const etherAmount = this.input.value.toString()
              this.setState({
                output: etherAmount * 100
              })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src= "https://raw.githubusercontent.com/HydroBlockchain/projecthydro.org-2021/master/assets/images/hydrologo.png" height='25' alt=""/>
            </div>
          </div>
        </div>
        <div>
          <label className="float-left">You get</label>
          <span className="float-right text-muted">
            Bal: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src="https://raw.githubusercontent.com/HydroBlockchain/projecthydro.org-2021/master/assets/images/hydrologo.png" height='25' alt=""/> 
            </div>
          </div>
        </div>
        
        <button type="submit" className="btn btn-block btn-lg swap-btn">Swap</button>
      </form>
    );
  }
}

export default BuyForm;
