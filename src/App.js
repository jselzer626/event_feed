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
  const [questionStep, setQuestionStep] = useState(5)
  
  const imageMatcher = name => {
    if (name==="Science") return Science
    else if (name==="Math") return MathImg
    else return English
  }

  const exitTest = () => {
    setCurrentTest(null)
    setQuestionStep(5)
  }

  const findTest = (list, displayed) => {
    
    let randomInt

    do {
      randomInt = Math.floor(Math.random() * Math.floor(list.length))
    } while (displayed.includes(list[randomInt].id))
    
    displayed.push(list[randomInt].id)
    return list[randomInt]
  }

  const renderTestQuestion = question => {
    return (
      <div className="testQuestion">
        {question}
      </div>
    )
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
        <div>
          <h1>{currentTest.title}</h1>
          <button className="ui massive fluid button orange"
            onClick={() => exitTest()}  
          >
            Go Back</button>
        </div>
        <div>
          {currentTest.questions.map((question, index) => {
            if (index < questionStep) {
              return renderTestQuestion(question)
            }
          })}
          <button className="ui massive fluid button green"
            onClick={() => {
              let newStep = questionStep
              setQuestionStep(newStep += 5)
            }}
          >Keep Going!</button>
        </div>
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
          return <div className="ui stackable two column divided grid">
              <div className="row">
                <div className="sixteen wide column" style={{textAlign: "center"}}>
                  <h1>{category}</h1>
                </div>
              </div>
              <div className="row">
                {displayChunk.map(num => {
                  newDisplayedTests.push(allTests[num].id)
                  return renderTestCard(allTests[num])
                })}</div>
              </div>
        } else if (category === "Random") {
            return <div className="ui stackable two column divided grid">
                      <div className="row">
                        <div className="sixteen wide column" style={{textAlign: "center"}}>
                      <h1>{category}</h1>
                    </div>
                      </div>
                      <div className="row">
                        {displayChunk.map(num => {
                          return renderTestCard(findTest(allTests, newDisplayedTests))
                        })}</div>
                    </div>
        } else if (category === "By Year") {
            return <div className="ui stackable two column divided grid">
                      <div className="row">
                        <div className="sixteen wide column" style={{textAlign: "center"}}>
                          <h1>{category}</h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="sixteen wide column" id="optionsBar">
                          {years.map(year => {
                            return <p onClick={()=> setSelectedYear(year)}
                              className={year===selectedYear ? 'selectedOption' : ''}
                              >
                              {year}</p>
                          })}
                        </div>
                      </div>
                      <div className="row">
                        { displayChunk.map(num => {
                          return renderTestCard(findTest(allTests.filter(test => test.year === selectedYear), newDisplayedTests))
                      })}</div>
                  </div>
        } else {
            return <div className="ui stackable two column divided grid">
                      <div className="row">
                        <div className="sixteen wide column" style={{textAlign: "center"}}>
                          <h1>{category}</h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="sixteen wide column" id="optionsBar">
                          {testSubjects.map(subject => {
                            return <p onClick={()=> setSelectedSubject(subject)}
                              className={subject===selectedSubject ? 'selectedOption' : ''}>
                              {subject}</p>
                          })}
                        </div>
                      </div>
                      <div className="row">
                        { displayChunk.map(num => {
                          return renderTestCard(findTest(allTests.filter(test => test.subject === selectedSubject), newDisplayedTests))
                      })}</div>
                  </div>
            }
        })
        

  }



  return (
    <div className="App">
      <div className="ui text container">
        <div className='ui huge header'>
          <p>Test Feed</p>
        </div>
        <div className='ui medium header'>
          <p>Click on a test to view!</p>
        </div>
        {renderFeed(currentTest)}
        {renderTest(currentTest)}
      </div>
    </div>
  );
}

export default App;
