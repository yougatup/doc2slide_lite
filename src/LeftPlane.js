import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './LeftPlane.css';
import Statement from './statement.js'
import {Slider} from '@material-ui/core'

const LeftPlane = (props) => {
    const resourceInfo = props.resourceInfo;

    function getSum () {
      var retValue = 0;

      for(var i=0;i<resourceInfo.length;i++) {
        retValue += resourceInfo[i].body.length;
      }

      return retValue;
    }


    useEffect( () => {
      for(var i=0;i<resourceInfo.length;i++) {
        resourceInfo[i].portion = 0;
      }
    }, [true])

    function handleOnChangeSlider(e, val) {
      var cur = e.target;

      var objs = document.getElementsByClassName('sectionPortionSliders');

      for (var i = 0; i < objs.length; i++) {
        var sliderIndex = parseInt(objs[i].attributes[1].nodeValue);
        var value = parseInt(objs[i].getElementsByTagName("input")[0].defaultValue);

        resourceInfo[sliderIndex].portion = value;
      }
    }

    function handleGenerateSlideClick() {
      var curValue = parseInt(document.getElementById("myRange").value);

      props.computeThreshold(curValue);
    }

  return (
    <div className="LeftPlane">
      <div className='objectivePlane'> 
      <table id='portionTable'>
        <tr>
          <th className='sectionTitleRow'> sectionTitle </th>
          <th className='portionRow'> portion </th>
        </tr>
        {
          resourceInfo.map( (item, i) => (
            <tr>
              <td className='sectionBodyRow'> {item.sectionTitle} </td>
              <td className='portionBodyRow'>
                <div className='sectionPortionSliders' sliderId={i}>
                  <Slider
                    defaultValue={item.portion == null ? 0 : item.portion}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    onChangeCommitted={handleOnChangeSlider}
                  />
                </div>
              </td>
            </tr>
          ))
        }
      </table>

      <div id='textImageSlider'>
        Text-heavy
        <input className='slider' type="range" min="0" max={getSum()} class="slider" id="myRange" />
        Image-heavy
      </div>

        <div id='generateDiv'>
          <button id='generateBtn' onClick={handleGenerateSlideClick}> Generate slides </button>
        </div>
      </div>
      {
        resourceInfo.map((item, i) => {
          return [
            <div className='sectionTitle'> {item.sectionTitle} </div>
            ,
            item.body.map((item2, index) => {
              return (
                <Statement stmt={item2.bodyText} entities={item2.entity} > </Statement>
                // <div myKey={index} className='statements'> {item2} </div>
              )
            })
          ]
        })
      }
    </div>
  );
}

export default LeftPlane;
