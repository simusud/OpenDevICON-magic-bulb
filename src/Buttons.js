// import React from 'react';
import React, { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import IconService from "icon-sdk-js";
import Light from './Light';

const { IconBuilder, IconAmount, IconConverter } = IconService;

const magic = new Magic("pk_test_BAD78299B2E4EA9D", {
  extensions: {
    icon: new IconExtension({
      rpcUrl: "https://bicon.net.solidwallet.io/api/v3"
    })
  }
});

class Buttons extends React.Component{
    constructor(props) {

        super(props);
        this.state = {
            tx:'',
            color:''
        };
    
        // I've just put these binding in the constructor 
        // so as not to clock up the render method and they only
        // get called once during the lifetime of the component
        // this.handleActionClick = this.handleActionClick.bind(this);
        this.handlerSendTransaction=this.handlerSendTransaction.bind(this)
      }
      
    
    handlerSendTransaction = async (color) => {
        

        const metadata = await magic.user.getMetadata();
    
        const txObj = new IconBuilder.CallTransactionBuilder()
          .from(metadata.publicAddress)
          .to('cxd9d1950dfdaad7fcc73a1803d1ea0fa0f6993a04')
        //   .value(IconAmount.of(2, IconAmount.Unit.ICX).toLoop())
          .stepLimit(IconConverter.toBigNumber(1000000))
          .nid(IconConverter.toBigNumber(3))
          .nonce(IconConverter.toBigNumber(1))
          .version(IconConverter.toBigNumber(3))
          .timestamp(new Date().getTime() * 1000)
          .method('set_color')
          .params({
            "_color": "BLUE"
          })
          .build();
          console.log("called")
        const txhash = await magic.icon.sendTransaction(txObj);
    
        // setTxHash(txhash);
        this.setState({tx:txhash,
            color:this.value
            
        })
        
        console.log("transaction result", txhash);
    };
    onInputChange=(event)=>{
        this.setState({color:this.value});
        console.log(this.color)
    };

    render(){
        return(
            <div className='btn'>
                <Light color='Red'/>
                <button onClick={this.handlerSendTransaction} value='RED' onChahange={this.OnInputChange}>Red</button>
                <button onClick={this.handlerSendTransaction }>Green</button>
                <button onClick={'/'}>Blue</button>
                <button onClick={'/'}>Yellow</button>

                <div>
                    {this.state.tx ? (
                    <div>
                        <div>Send transaction success</div>
                        <div className="info">
                        <a
                            href={`https://bicon.tracker.solidwallet.io/transaction/${this.state.tx}`}
                            target="_blank"
                        >
                            {this.state.tx}
                        </a>
                        </div>
                    </div>
                    ) : (
                    <div />
                    )}
                
                </div>
           </div>

        );
    }
}
export default Buttons;


// const Buttons=()=>{
//     return(
//         <div className='btn'>
//             <button onClick={'/'}>Red</button>
//             <button onClick={'/'}>Green</button>
//             <button onClick={'/'}>Blue</button>
//             <button onClick={'/'}>Yellow</button>
//         </div>
//     );
// }
// export default Buttons;