import React, { Component } from 'react'
import EthToBsc from './eth_bsc';
import BscToEth from './bsc_eth';


class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'eth to bsc'
    }
  }

  render() {
    let content
    if(this.state.currentForm === 'eth to bsc') {
      content = <EthToBsc
        allowedHydro={this.props.allowedHydro}
        addFunds={this.props.addFunds}
        ethToBscSwap ={this.props.ethToBscSwap}
       
      />
    } 
    else{
      content = <BscToEth
      allowedBep={this.props.allowedBep}
      bscToEthSwap={this.props.bscToEthSwap}
      addBep ={this.props.addBep}
       />
    }

    return (
      <div id="content" className="mt-3 swap-form">

        <div className="d-flex justify-content-between mb-3">
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'eth to bsc' })
              }}
            >
            Eth_to_Bsc
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'sell' })
              }}
            >
            Bsc_to_Eth
          </button>
        </div>
        <div className="card mb-4" >

          <div className="card-body main-form">

            {content}

          </div>

        </div>

      </div>
    );
  }
}

export default Main;
