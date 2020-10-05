import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './RightPlane.css';
import Slide from './slide.js';

const RightPlane = (props) => {
    const slideInfo = props.slideInfo;

  return (
    <div className="RightPlane">
        {
            slideInfo.map((item, i) => {
                return (
                    <Slide slideIndex={i} 
                    type={item.slideType} 
                    title={item.title} 
                    body={item.body} 
                    imageURL={item.imageURL}
                    note={item.note}
                     />
                )
            })
        }
    </div>
  );
}

export default RightPlane;
