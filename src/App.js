import React, { useState, useEffect } from 'react';
import LeftPlane from './LeftPlane.js'
import RightPlane from './RightPlane.js'
import logo from './logo.svg';
import './App.css';

function App() {
  const initialLoadingFlag = false;

  const [probList, setProbList] = useState([]);
  const [thresholdValue, setThresholdValue] = useState(0);
  
  const [slideInfo, setSlideInfo] = useState([]);

  const [resourceInfo, setResourceInfo] = useState([])

  function computeThreshold(cnt) {
    setThresholdValue(probList[probList.length-cnt-1]);
  }

  function computeScores() {
    var prob = [];

    prob.push(0);
    prob.push(1);

    for (var k = 0; k < resourceInfo.length; k++) {
      var resource = resourceInfo[k];

      for (var i = 0; i < resource.body.length; i++) {
        var stmt = resource.body[i].bodyText;
        var entities = resource.body[i].entity.entity;

        var retValue = [];
        var splitted = stmt.split(' ');
        var cnt = 0;

        for (var j = 0; j < splitted.length; j++) {
          if (entities.includes(splitted[j])) {
            cnt++;
          }
        }

        var score = cnt / splitted.length;

        resource.body[i].score = score;

        prob.push(score);
      }
    }

    prob.sort();

    setResourceInfo(resourceInfo);
    setProbList(prob);
  }

  function convertToSlide(resource, threshold) {
    var returnValue = [];

    for (var i = 0; i < resource.body.length; i++) {
      var stmt = resource.body[i].bodyText;
      var entities = resource.body[i].entity.entity;

      if(resource.body[i].score >= threshold) {
        returnValue.push(
          {
            slideType: "IMAGES",
            imageURL: [
              resource.body[i].imageResult
            ],
            note: [
              resource.body[i].bodyText
            ]
          })
      }
      else {
        var createFlag = false;

        if(returnValue.length == 0 || returnValue[returnValue.length-1].slideType == "IMAGES") createFlag = true;
        else if(returnValue[returnValue.length-1].body.length >= 3) createFlag = true;

        if(createFlag) 
          returnValue.push(
            {
              slideType: "TITLE_AND_BODY",
              title: resource.sectionTitle,
              body: [
                resource.body[i].bodyText
              ]
            },
          )
        else 
            returnValue[returnValue.length-1].body.push(resource.body[i].bodyText);
      }
    }

    return returnValue;
  }

  function constructSlide(threshold) {
    var slideInfo = [];

    for (var i = 0; i < resourceInfo.length; i++) {
      slideInfo = slideInfo.concat(convertToSlide(resourceInfo[i], threshold));
    }

    setSlideInfo(slideInfo);
  }

  useEffect( () => {
    constructSlide(thresholdValue);
  }, [thresholdValue])

  useEffect(() => {
    computeScores();
    constructSlide(1);
  }, [resourceInfo])

  useEffect(() => {
    if (resourceInfo.length > 0) return;

    async function fetchData() {
      const response = await fetch('http://3.35.118.122:3000/data.txt')
      const reader = response.body.getReader()

      var chunks = [];
      var receivedLength = 0;

      function process(chunks, receivedLength) {
        // Step 4: concatenate chunks into single Uint8Array
        let chunksAll = new Uint8Array(receivedLength); // (4.1)
        let position = 0;
        for (let chunk of chunks) {
          chunksAll.set(chunk, position); // (4.2)
          position += chunk.length;
        }

        // Step 5: decode into a string
        let merged = new TextDecoder("utf-8").decode(chunksAll);

        var data = JSON.parse(merged);

        setResourceInfo(data);
      }

      const stream = new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // Is there no more data to read?
              if (done) {
                // Tell the browser that we have finished sending data
                controller.close();

                process(chunks, receivedLength)

                return;
              }

              chunks.push(value);
              receivedLength += value.length;

              // Get the data and send it to the browser via the controller
              controller.enqueue(value);
              push();
            });
          };

          push();
        }
      });
    }

    var result = fetchData();
  })
  return (
    <div className="App">
      <LeftPlane slideInfo={slideInfo} resourceInfo={resourceInfo} computeThreshold={computeThreshold}> </LeftPlane>
      <RightPlane slideInfo={slideInfo} resourceInfo={resourceInfo}> </RightPlane>
    </div>
  );
}

export default App;
