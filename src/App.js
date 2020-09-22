import React, {useState, useEffect} from 'react';
import LeftPlane from './LeftPlane.js'
import RightPlane from './RightPlane.js'
import logo from './logo.svg';
import './App.css';

function App() {
  const [slideInfo, setSlideInfo] = useState([
    {
      slideType: "TITLE_AND_BODY",
      title: "This_is_title",
      body: [
        "body1",
        "body2"
      ]
    },
    {
      slideType: "IMAGES",
      imageURL: [
        "https://www.kixlab.org/assets/img/members/hyungyu.jpg"
      ]
    },
    {
      slideType: "TITLE_AND_BODY",
      title: "This_is_title",
      body: [
        "body1",
        "body2"
      ]
    },

  ]);

  const [resourceInfo, setResourceInfo] = useState([
    {
      "sectionTitle": "Abstract",
      "body": [
        "hello world!",
        "this is second one"
      ]
    }
  ])

  return (
    <div className="App">
      <LeftPlane slideInfo={slideInfo} resourceInfo={resourceInfo} setSlideInfo={setSlideInfo} setResourceInfo={setResourceInfo}> </LeftPlane>
      <RightPlane slideInfo={slideInfo} resourceInfo={resourceInfo} setSlideInfo={setSlideInfo} setResourceInfo={setResourceInfo}> </RightPlane>
    </div>
  );
}

export default App;
