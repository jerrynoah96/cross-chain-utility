import React, { Component } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
class EthToBsc extends Component {
  state = {
      output: '0',
      modal: false,
      addedFund: '0',
      hydroAddress: "0xa8377d8A0ee92120095bC7ae2d8A8E1973CcEa95",
      swapAmount: null
    }
    componentDidMount = async () => {
        alert('kindly ensure you are on rinekby test network')
     
      
    }

    handleInputAmount = (e)=> {
      this.setState({
        addedFund: e.target.value
      })
    }

    addFund = (e)=> {
      e.preventDefault();
      this.props.addFunds(this.state.hydroAddress, '50000000');
      console.log(this.state.addedFund);
      console.log(this.state.hydroAddress);

    }

    handleSwapAmount = (e)=> {
      this.setState({
        swapAmount: e.target.value

      })
    }

    swap = (e)=> {
      e.preventDefault();
      this.props.ethToBscSwap(this.state.swapAmount);
      console.log(this.state.swapAmount, "swap")
    }

  

  openModal =()=> {
    this.setState({
      modal: true
    })
  }

  render() {
    return (
    <div className="tx-interface">
     
        <button className="open-add-fund"
            onClick={this.addFund}>Add funds</button>
      <form className="mb-3" onSubmit={this.swap} >
          <h3>Erc20 to Bep20</h3>
        <div>
          <label className="float-left">Value</label>
          <span className="float-right text-muted">
            Bal: {this.props.allowedHydro}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const amount = this.input.value.toString()
              this.setState({
                output: amount * 1,
                swapAmount: amount
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
    </div>
    );
  }
}

export default EthToBsc;
