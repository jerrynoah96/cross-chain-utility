import React, { Component } from 'react'
import BuyForm from './BuyForm'


class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy'
    }
  }

  render() {
    let content
    if(this.state.currentForm === 'buy') {
      content = <BuyForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
      />
    } 

    return (
      <div id="content" className="mt-3 swap-form">
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
