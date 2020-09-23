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
      "sectionTitle": "1. Introduction",
      "body": [
        "Informal presentations are lightweight ways for people to communicate ideas to others for feedback and modification.",
        "Freeform sketches are easily produced and are sufficiently expressive to convey a wide variety of information." ,
        "Current software tools provide abundant functionality to customize detailed slides for formal presentations.",
        "From the start of designing a presentation, presenters often become obsessed by design details, such as colors and fonts, which are unnecessary for quickly communicating ideas in an informal setting.",
        "we built SketchPoint (see Figure 1), a system supporting informal presentation design",
        "SketchPoint enables users to quickly author presentations by sketching slide content, overall hierarchical structures, and hyperlinks.",
        "Slides are organized in a storyboard from which users can directly present their slides." ,
        "a note-taking workspace allows presenters to pick notes for use in slides.",
      ]
    },
    {
      "sectionTitle": "3. Current Practice",
      "body": [
        "To learn more about the practice of informal presentation for idea communication, we studied researchers both in our laboratory and at our university.",
      ]
    },
    {
      "sectionTitle": "3-1. Idea Communication",
      "body": [
        "Idea communication is an important step in furthering draft ideas by clarifying them and gathering suggestions from others",
        "Informal presentations are often used for communicating ideas in small groups.",
        "Our participants said sketching is also helpful to clarify draft ideas and make abstract ideas concrete." ,
        "frequent internal idea communication still relies on pen-and-paper-based informal presentations.",
        "informal presentations seem to welcome more feedback and resulting modification, which is important for getting an idea right.",
        "more formal presentations are suitable for idea publication (see Figure 2), which is infrequent enough to allow for relatively long and detailed preparation.",
        "note taking is an important preparation step and a source of material for informal presentations.",
      ]
    },
    {
      "sectionTitle": "3-2. Creating Informal Preentations",
      "body": [
        "We asked our participants how they currently create and conduct informal presentations and what kinds of schemes they use to organize their information.",
        "researchers usually started with their paper notebooks, which contain captured ideas from their daily work life and some rough organization of information for presentation.",
        "a tree-like hierarchical structure is the most frequently used organization scheme.",
        "This organization is efficient for presenters to organize content in a logical way, and it is also makes it easy for the audience to understand the big",
        "structures of title-list or title-graphic are common organizations of information (see Figure 3).",
        "we distilled two major information organizations of informal presentation as shown in Figure 4",
      ]
    },
    {
      "sectionTitle": "3-3. Problems Creating Presentations",
      "body": [
        "there was no efficient electronic tool to help our participants with their informal presentations.",
        "People prefer the pen-and-paper metaphor for informal presentations.",
        "Although commercial electronic whiteboard systems make it easier to capture and edit information than with physical whiteboards, it is still difficult to use these systems for informal communication since they do not support higher level semantics.",
      ]
    },
    {
      "sectionTitle": "4. The Sketchpoint System",
      "body": [
        "we designed SketchPoint to support and enhance informal presentations.",
        "The design of SketchPoint is based on the pen-and-paper metaphor."
      ]
    },
  ])

  useEffect(() => {

    for(var i=0;i<resourceInfo.length;i++) {
      for(var j=0;j<resourceInfo[i].body.length;j++) {
        var t = resourceInfo[i].body[j];

      var xhr = new XMLHttpRequest()

        // get a callback when the server responds
        xhr.addEventListener('load', (r) => {
          // update the state of the component with the result here
          console.log(r.currentTarget.responseText)
          console.log(i, j)
        })
        // open the request with the verb and the url
        xhr.open('GET', 'http://hyungyu.com:3333?text=' + t)
        // send the request
        xhr.send()

      }
    }
  })
  return (
    <div className="App">
      <LeftPlane slideInfo={slideInfo} resourceInfo={resourceInfo} setSlideInfo={setSlideInfo} setResourceInfo={setResourceInfo}> </LeftPlane>
      <RightPlane slideInfo={slideInfo} resourceInfo={resourceInfo} setSlideInfo={setSlideInfo} setResourceInfo={setResourceInfo}> </RightPlane>
    </div>
  );
}

export default App;
