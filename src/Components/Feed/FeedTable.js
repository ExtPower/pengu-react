import React from 'react'
import {
   FeedPoint,
   FeedSettings
    
  } from "../../../src/assets/index";

function FeedTable() {
  return (
    <div>
        <div className='tableFeed'>
            <div className='tbleHead'>
                <div className='headitem'>
                    <div className='heaasind'>
                        <h4>
                        Portfolio Monitor
                        </h4>
                        <label>
                        10 Alerts in the last hour

                        </label>
                    </div>
                    <div className='headButns'>
                    <img src={FeedPoint}>

                    </img>
                    <img src={FeedSettings}>
                        
                    </img>
                </div>
                </div>
                <div className='headitem'>
                    <div className='heaasind'>
                        <h4>
                        Portfolio Monitor
                        </h4>
                        <label>
                        10 Alerts in the last hour

                        </label>
                    </div>
                    <div className='headButns'>
                    <img src={FeedPoint}>

                    </img>
                    <img src={FeedSettings}>
                        
                    </img>
                </div>
                </div>
                <div className='headitem'>
                    <div className='heaasind'>
                        <h4>
                        Portfolio Monitor
                        </h4>
                        <label>
                        10 Alerts in the last hour

                        </label>
                    </div>
                    <div className='headButns'>
                    <img src={FeedPoint}>

                    </img>
                    <img src={FeedSettings}>
                        
                    </img>
                </div>
                </div>
                <div className='headitem'>
                    <div className='heaasind'>
                        <h4>
                        Portfolio Monitor
                        </h4>
                        <label>
                        10 Alerts in the last hour

                        </label>
                    </div>
                    <div className='headButns'>
                    <img src={FeedPoint}>

                    </img>
                    <img src={FeedSettings}>
                        
                    </img>
                </div>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default FeedTable