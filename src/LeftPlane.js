import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './LeftPlane.css';

const LeftPlane = (props) => {
    const resourceInfo = props.resourceInfo;
    const mapped = resourceInfo.map((item, i) => (<div> {item.body} </div> ) );

    console.log(mapped);

  return (
    <div className="LeftPlane">
        {
            resourceInfo.map((item, i) => {
                return [
                    <div className='sectionTitle'> {item.sectionTitle} </div>
                    ,
                    item.body.map((item2, index) => {
                        return (
                            <div myKey={index} className='statements'> {item2} </div>
                        )
                    })
                ]
              })
            }
    </div>
  );
}

export default LeftPlane;
