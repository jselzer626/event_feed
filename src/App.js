import React, { useState, useEffect } from 'react'
import { Modal, Image, Container } from 'semantic-ui-react'
import logo from './logo.svg';
import tests from './tests.json';
import './App.css';
import 'English' from './images/English.png';
import 'Math' from './images/Math.png';
import 'Science' from './images/Science.png';


function App() {

  const testSubjects = ['English', 'Math', 'Science']
  const years = ['2017', '2018', '2019', '2020']
  const categories = ['Trending', 'By Subject', 'By Year', 'Random']
  
  //can be adapted for mobile or desktop view
  // this is how many will display for each category
  const [displayChunk, setDisplayChunk] = useState(2)
  //tests have been sorted by userclicks
  const [allTests, setAllTests] = useState(tests.allTests)
  const [currentTest, setCurrentTest] = useState([])

  const testCard = test => {
    return (
      <div className='ui card'>
        <div className="image">
          <img src={test.subject}/>
        </div>
        <div className="content">
          <div className="header">
            {test.title}
          </div>
          <div className="description">
            This test has been viewed {test.userClicks} times
          </div>
        </div>
        <div className="extraContent">
          {test.questions.length} questions
        </div>
      </div>
    )
  }


  return (
    <div className="App">
      <div className="ui text container">




      </div>

    </div>
  );
}

export default App;
