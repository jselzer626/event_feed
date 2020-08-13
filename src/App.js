import React, { useState, useEffect } from 'react'
import './App.css'
import English from './images/English.png'
import MathImg from './images/Math.png'
import Science from './images/Science.png'
import sampleData from './tests.json'

function App() {

  const testSubjects = ['English', 'Math', 'Science']
  const years = ['2017', '2018', '2019', '2020']
  const categories = ['Trending', 'By Subject', 'By Year', 'Random']
  
  const [displayChunk, setDisplayChunk] = useState(2)
  const [allTests, setAllTests] = useState(sampleData.allTests)
  const [currentTest, setCurrentTest] = useState({})
  const [displayedTests, setDisplayedTests] = useState([])

  // re-sort tests lists based on any new clicks since last render
  
  const findRandomTest = (list) => {
    
    let newDisplayedTests = displayedTests
    let randomInt

    do {
      randomInt = Math.floor(Math.random() * Math.floor(list.length))
    } while (newDisplayedTests.includes(list[randomInt].id))
    
    newDisplayedTests.push(list[randomInt].id)
    setDisplayedTests(newDisplayedTests)
    return list[randomInt]
  }

  const renderTestCard = test => {
    return (
      <div className='ui card' onClick={() => setCurrentTest(test)}
          key={test.id}>
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
      </div>)
  }

  const renderMoreCards = () => {

    let display = <div></div>
    
    categories.map((category, index) => 
      {if (category == "Trending") {
        display.innerHTML += <div>
          <h1>{category}</h1>
          {renderTestCard(allTests[index])}
          {renderTestCard(allTests[index+1])}
        </div>
      }}
    )

    return display
  }



  return (
    <div className="App">
      <div className="ui text container">
      {renderMoreCards()}
      </div>
    </div>
  );
}

export default App;
