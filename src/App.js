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
  
  const [displayChunk, setDisplayChunk] = useState([0,1])
  const [allTests, setAllTests] = useState(sampleData.allTests)
  const [currentTest, setCurrentTest] = useState({})
  
  const imageMatcher = name => {
    if (name==="Science") return Science
    else if (name==="Math") return MathImg
    else return English
  }

  const findTest = (list, displayed) => {
    
    let randomInt

    do {
      randomInt = Math.floor(Math.random() * Math.floor(list.length))
    } while (displayed.includes(list[randomInt].id))
    
    displayed.push(list[randomInt].id)
    return list[randomInt]
  }

  const renderTestCard = test => {
    return (
      <div className='ui card' onClick={() => setCurrentTest(test)}
          key={test.id}>
        <div className="ui image medium">
          <img src={imageMatcher(test.subject)}/>
        </div>
        <div className="content">
          <div className="header">
            {test.title}
          </div>
          <div className="description">
            This test has been viewed {test.userClicks} times
          </div>
        </div>
        <div className="extra content">
          {test.questions.length} questions
        </div>
      </div>)
  }

    //got hella returns here
  const renderContent = () => {

      let newDisplayedTests = []
        
      return categories.map((category) => {
            
        if (category === "Trending") {
          
          return <div><h1>{category}</h1>
            {displayChunk.map(num => {
              return renderTestCard(allTests[num])
            })}</div>

        } else if (category === "Random") {
          
          return <div><h1>{category}</h1>
            {displayChunk.map(num => {
              return renderTestCard(findTest(allTests, newDisplayedTests))
            })}</div>

        } else if (category === "By Year") {
          
          return <div><h1>{category}</h1>
          {years.map(year => {
            let yearSpecific = allTests.filter(test => test.year === year)
            return <div><h3>{year}</h3>
              {renderTestCard(findTest(yearSpecific, newDisplayedTests))}</div>
          })}</div>

        } else {

          return <div><h1>{category}</h1>
          {years.map(year => {
            let yearSpecific = allTests.filter(test => test.year === year)
            return <div><h3>{year}</h3>
              {renderTestCard(findTest(yearSpecific, newDisplayedTests))}</div>
          })}</div>

        }
          })
    
  }



  return (
    <div className="App">
      <div className="ui text container">
      {renderContent()}
      </div>
    </div>
  );
}

export default App;
