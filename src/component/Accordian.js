import React from 'react';
import Collapsible from 'react-collapsible';

import '../test.css';
class Accordion extends React.Component {
    constructor(props) {
      super(props)
    }
    
    render() {
      return (
        <div>
           <Collapsible trigger={'Hello'}>
          <p>On October 29, 2014, the Board of Directors of FCA announced its intention to separate the Ferrari business from FCA. The separation began with a restructuring that established Ferrari N.V. (“Predecessor Ferrari”) as the new holding company of the Ferrari group and the subsequent sale by FCA of 10% of the outstanding</p>
        </Collapsible>
         <Collapsible trigger={'manne'}>
          <p>tWhen issued” trades are trades conditional on the allocation of the underlying shares to the shareholder selling in the trade.est</p>
        </Collapsible>
         <Collapsible trigger={'sdsadsa'}>
          <p>The spin-off was completed on January 3, 2016.</p>
        </Collapsible>

        </div>
      );
    }
  }
export default Accordion
  
  