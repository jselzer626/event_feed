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
  const [currentTest, setCurrentTest] = useState(null)
  const [displayedTests, setDisplayedTests] = useState([])
  const [selectedYear, setSelectedYear] = useState('2020')
  const [selectedSubject, setSelectedSubject] = useState('English')
  
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
      <div className="column">
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
        </div>
      </div>)
  }

  const renderTest = currentTest => {
    if (!currentTest)
      return
    
    return (
      <div>
        <h1>{currentTest.title}</h1>
      </div>
    )
  }
    //got hella returns here
  const renderFeed = currentTest => {

      if (currentTest)
        return

      let newDisplayedTests = []
        
      return categories.map((category) => {
            
        if (category === "Trending") {
          
          return <div className="ui two column grid">
              <div className="row">
                <h1>{category}</h1>
              </div>
              <div className="row">
                {displayChunk.map(num => {
                  newDisplayedTests.push(allTests[num].id)
                  return renderTestCard(allTests[num])
                })}</div>
              </div>
        } else if (category === "Random") {
          
          return <div className="ui two column grid">
                    <div className="row">
                      <h1>{category}</h1>
                    </div>
                    <div className="row">
                      {displayChunk.map(num => {
                        return renderTestCard(findTest(allTests, newDisplayedTests))
                      })}</div>
                  </div>
        } else if (category === "By Year") {
          
          return <div className="ui two column grid">
                    <div className="row">
                      <h1>{category}</h1>
                    </div>
                    <div className="row">
                      {years.map(year => {
                        return <p onClick={()=> setSelectedYear(year)}>
                          {year}</p>
                      })}
                    </div>
                    <div className="row">
                      { displayChunk.map(num => {
                        return renderTestCard(findTest(allTests.filter(test => test.year === selectedYear), newDisplayedTests))
                    })}</div>
                </div>

        } else {

          return <div className="ui two column grid">
                    <div className="row">
                      <h1>{category}</h1>
                    </div>
                    <div className="row">
                      {testSubjects.map(subject => {
                        return <p onClick={()=> setSelectedSubject(subject)}>
                          {subject}</p>
                      })}
                    </div>
                    <div className="row">
                      { displayChunk.map(num => {
                        return renderTestCard(findTest(allTests.filter(test => test.subject === selectedSubject), newDisplayedTests))
                    })}</div>
                </div>

        }

        /*return <div
            className="cardRow"><h1>{category}</h1>
          {testSubjects.map(subject => {
            let subjectSpecific = allTests.filter(test => test.subject === subject)
            return <div><h3>{subject}</h3>
              {renderTestCard(findTest(subjectSpecific, newDisplayedTests))}</div>
          })}</div>*/
          })
        

  }



  return (
    <div className="App">
      <div className="ui text container">
        {renderFeed(currentTest)}
        {renderTest(currentTest)}
      </div>
    </div>
  );
}

export default App;
