import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './slide.css';

const Slide = (props) => {
    const slideType = props.type;
    const title = props.title;
    const body = props.body;
    const slideIndex = props.slideIndex;
    const imageURL = props.imageURL;

    console.log(slideType);
    console.log(title);
    console.log(body);

  return (
    <div className="Slide">
        <div className='slideIndex'> {slideIndex} </div>
          {
              slideType == 'TITLE_AND_BODY' ?
                  <div className='slideBoundary' >
                      <div className='slideTitle'> {title} </div>
                      <div className='slideBody'>
                          {
                              body.map((item, i) => (
                                  <li> {item} </li>
                              ))
                          }
                      </div>
                  </div>
                  :
                  <div className='slideBoundary' >
                      {
                          imageURL.map((item, i) => (
                              <img className='singleImage' src={item} />
                          ))
                      }
                  </div>

          }
    </div>
  );
}

export default Slide;


