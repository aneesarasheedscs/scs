import React from 'react';
import Formfile from './purchasehistory/FormFile';
import './style.scss'
 


function PurchaseOrder() {
  return(
    <>
     <div className='form-page'>
            <h3 className='form-heading' style={{background: ''}}>PURCHASE ORDER HISTORY</h3>
            <Formfile />
      </div>
    </>
  );
}

export default PurchaseOrder;
