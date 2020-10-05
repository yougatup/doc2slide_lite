import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './slide.css';

const Slide = (props) => {
    const slideType = props.type;
    const note = props.note;
    const title = props.title;
    const body = props.body;
    const slideIndex = props.slideIndex;
    const imageURL = props.imageURL;

    const [curImageSrc, setCurImageSrc] = useState('')
    const [curImageIndex1, setCurImageIndex1] = useState(0);
    const [curImageIndex2, setCurImageIndex2] = useState(0);

    useEffect( () => {
        if(imageURL != null)  {
            setCurImageSrc(imageURL[0][0].items[0].link);
            setCurImageIndex1(0);
            setCurImageIndex2(0);
        }
    })

    function handleLeftClick(e) {

    }

    function handleRightClick(e) {

    }

  return (
    <div className="Slide">
        <div className='slideIndex'> {slideIndex} </div>
              <div>
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
                          <div>
                              <button className='leftImage' onClick={handleLeftClick}> left </button>
                              <div className='slideBoundary' >

                                  <img className='singleImage' src={curImageSrc} />

                              </div>
                              <button className='rightImage' onClick={handleRightClick}> right </button>
                              <div className='slideNote' >
                                  {note}
                              </div>

                          </div>
                  }
              </div>
    </div>
  );
}

export default Slide;


