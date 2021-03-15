import React, { Component } from 'react'
import getWeb3 from '../getWeb3';
import Navbar from './Navbar';
import Main from './Main';
import HydroAbi from '../abis/hydro.json';
import EthToBscAbi from '../abis/ethToBsc.json';
import BscToEthAbi from '../abis/bscToEth.json';
import BepHydro from '../abis/bephydro.json';
import './App.css'


class App extends Component {

  state = {
    account: '',
    hydroBalance: '0',
    allowedHydro: '0',
    allowedBep: '0',
    loading: true,
    hydroInstance: null,
    web3: null,
    hydroAddress: null,
    bepHydroAddress: null,
    ethToBscInstance: null,
    BscToEthInstance: null,
    bepHydroInstance: null
   
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
     this.setState({
        web3
      })

      this.setState({
        loading: false
      })
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0]

      this.setState({
        account
      })

      //LOAD HYDROTOKEN CONTRACT
      const hydroAddress = "0xa8377d8A0ee92120095bC7ae2d8A8E1973CcEa95";
      this.setState({
        hydroAddress
      })
      const hydroInstance = new web3.eth.Contract(HydroAbi, hydroAddress );
      this.setState({
        hydroInstance
      })
      
      console.log(this.state.hydroInstance, 'hydro instance')

     console.log( this.displayApprovedFund());

      //LOAD BEPHYDRO TOKEN
      const bepHydroAddress = "0x5B387f4886F043f603f7d0cb55DBd727D6649C73";
      this.setState({
        bepHydroAddress
      });

      const bepHydroInstance = new web3.eth.Contract(BepHydro, bepHydroAddress);
      this.setState({
        bepHydroInstance
      })

      

      //LOAD TOKEN SWAP CONTRACT- Eth TO ETH
      const swapEthToBsc = "0xCDEF517c07eB3DF1F0eD4AFCCaC400215Af88959";
      const ethToBscInstance = new web3.eth.Contract(EthToBscAbi, swapEthToBsc);
      this.setState({
        ethToBscInstance
      })

      console.log(this.state.ethToBscInstance)

      //LOAD TOKEN SWAP CONTRACT- BSC TO ETH
      const swapBscToEth = "0x8D1DC59cB61D33FeabCf9179E2b76a896E305661";
      const BscToEthInstance = new web3.eth.Contract(BscToEthAbi, swapBscToEth);
      this.setState({
        BscToEthInstance
      })

      console.log(this.state.BscToEthInstance);


      

      // Get the contract instance.
     

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  displayApprovedFund= async ()=> {
    const res = await this.state.hydroInstance.methods.allowance(this.state.account, this.state.hydroAddress).call();
   const allowedHydro = this.state.web3.utils.fromWei(res.toString(), 'wei');

   this.setState({
     allowedHydro

   })
   

  }

  addFunds = async (address, amount)=> {

   await this.state.hydroInstance.methods.approve(address, amount).send({
      from: this.state.account,   
      })
  }

  ethToBscSwap = async(amount)=> {

    await this.state.ethToBscInstance.methods.swap(this.state.web3.utils.fromWei(amount.toString(), 'wei')).send({
      from: this.state.account
    })

  }

  bscToEthSwap = async(amount)=> {

    await this.state.BscToEthInstance.methods.swap(this.state.web3.utils.fromWei(amount.toString(), 'wei')).send({
      from: this.state.account
    })

  }

  


  
  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
      allowedHydro={this.state.allowedHydro}
      addFunds={this.addFunds}
      ethToBscSwap={this.ethToBscSwap}
      bscToEthSwap={this.bscToEthSwap}/>
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '400px' }}>
              <div className="content mr-auto ml-auto">
              {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
