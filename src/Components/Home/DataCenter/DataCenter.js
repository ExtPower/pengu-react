import React from 'react'
import Gwi from './Gwi'
import Nft from './Nft'
import Portffolio from './Portffolio'
import "./dataCeenter.css"

function DataCenter() {
  return (
    <div className='dataMainCenter'>
      <h4>
      Data Center
      </h4>
        <div className='flexCenter'>
            <div className='porfolio dataceenter'>
             <Portffolio/>
            </div>
            <div className='nft dataceenter'>
                <Nft/>
            </div>
            <div className='gwi dataceenter'>
                <Gwi/>
            </div>
        </div>
        
    </div>
  )
}

export default DataCenter