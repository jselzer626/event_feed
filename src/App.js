import React, { useState, useEffect } from 'react'
import './App.css'
import English from './images/English.png'
import MathImg from './images/Math.png'
import Science from './images/Science.png'
import sampleData from './tests.json'

import mockData from './mockQuestions.json';

const headers = mockData.filter((element) => {
  if (element.gs$cell.row === '1') {
    return true
  } 
})

console.log(headers)

const q1 = mockData.filter((element) => {
  if (element.gs$cell.row === '2') {
    return true
  } 
})

const q2 = mockData.filter((element) => {
  if (element.gs$cell.row === '3') {
    return true
  } 
})

const q3 = mockData.filter((element) => {
  if (element.gs$cell.row === '4') {
    return true
  } 
})

const q4 = mockData.filter((element) => {
  if (element.gs$cell.row === '5') {
    return true
  } 
})

const q5 = mockData.filter((element) => {
  if (element.gs$cell.row === '6') {
    return true
  } 
})

const questionSet = [q1, q2, q3, q4, q5]

let allQuestionsObj = mockData.reduce( (fullQuestionSet,question,index) => {

  if(fullQuestionSet[question.gs$cell.row]){
    fullQuestionSet[question.gs$cell.row].push(question)
  } else {
    fullQuestionSet[question.gs$cell.row] = []
    fullQuestionSet[question.gs$cell.row].push(question)
  }
  return fullQuestionSet
},{})

let allQuestionsArray = mockData.reduce( (fullQuestionSet,question,index) => {

  //filter out row 1
  if(question.gs$cell.row === '1'){
    return fullQuestionSet
  }
  
  if(fullQuestionSet[question.gs$cell.row]){
    fullQuestionSet[question.gs$cell.row].push(question)
  } else {
    fullQuestionSet[question.gs$cell.row] = []
    fullQuestionSet[question.gs$cell.row].push(question)
  }
  return fullQuestionSet

},[])

console.log(allQuestionsArray)

function App() {

  const testSubjects = ['English', 'Math', 'Science']
  const years = ['2017', '2018', '2019', '2020']
  const categories = ['Trending', 'By Subject', 'By Year', 'Random']
  
  const [displayChunk, setDisplayChunk] = useState({Trending: [0,0], Random: [0,0], bySubject: [0,0], byYear: [0,0]})
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

  const loadMoreContent = category => {
    let categoryClean = category
    if (category == "By Subject")
      categoryClean = 'bySubject'
    else if (category === "By Year")
      categoryClean = 'byYear'
    
    let newDisplay = displayChunk[`${categoryClean}`]
    for (let i = 0; i < 2; i++) {
      newDisplay.push(0)
    }
    setDisplayChunk({...displayChunk, categoryClean:newDisplay})
    
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
                {displayChunk.Trending.map((num, index) => {
                  newDisplayedTests.push(allTests[index].id)
                  return renderTestCard(allTests[index])
                })}</div>
                <button
                      className="ui button massive fluid green"
                      onClick={() => loadMoreContent(category)}
                      > Load More {category} Tests
                </button> 
              </div>
        } else if (category === "Random") {
            return <div className="ui stackable two column divided grid">
                      <div className="row">
                        <div className="sixteen wide column" style={{textAlign: "center"}}>
                      <h1>{category}</h1>
                    </div>
                      </div>
                      <div className="row">
                        {displayChunk.Random.map(num => {
                          return renderTestCard(findTest(allTests, newDisplayedTests))
                        })}</div>
                        <button
                          className="ui button massive fluid green"
                          onClick={() => loadMoreContent(category)}
                          > Load More {category} Tests
                        </button>
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
                        { displayChunk.byYear.map(num => {
                          return renderTestCard(findTest(allTests.filter(test => test.year === selectedYear), newDisplayedTests))
                      })}</div>
                      <button
                        className="ui button massive fluid green"
                        onClick={() => loadMoreContent(category)}
                        > Load More {selectedYear} Tests
                      </button>
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
                        { displayChunk.bySubject.map(num => {
                          return renderTestCard(findTest(allTests.filter(test => test.subject === selectedSubject), newDisplayedTests))
                      })}</div>
                      <button
                        className="ui button massive fluid green"
                        onClick={() => loadMoreContent(category)}
                        > Load More {selectedSubject} Tests
                      </button>
                  </div>
            }
        })
        

  }

  const renderQuestions = (questionSet) => {
      return (
        questionSet.map((element) => {
            let questionNum, questionAns, questionImg, points, category, year, month, examQNum
            element.map((cell) => {
                if (cell.gs$cell.col === '3'){
                  questionNum = cell.gs$cell.inputValue
                }
                if (cell.gs$cell.col ==='8'){
                  questionAns = cell.gs$cell.inputValue
                }
                if (cell.gs$cell.col === '15'){
                  questionImg = cell.gs$cell.inputValue
                }

                if (cell.gs$cell.col === '9'){
                  points = cell.gs$cell.inputValue
                }

                if (cell.gs$cell.col === '11'){
                  category = cell.gs$cell.inputValue
                }

                if(questionNum){
                  month = questionNum.substring(0,2)
                  year = questionNum.substring(2,4)
                  examQNum = questionNum.substring(4,6)
                }
                  
            })

            return (
              <div className='ui segment' key={questionNum}>
                <p>
                  ID: {questionNum}
                </p>

                <p>
                  Exam Year: {year}
                </p>

                <p>
                  Exam Month: {month}
                </p>

                <p>
                  Exam Question #: {examQNum}
                </p>

                <p>
                  Answer: {questionAns}
                </p>
                <p>
                  Points: {points}
                </p>
                <p>
                  Topic: {category}
                </p>
                
                <img className="ui fluid image"
                  src={questionImg}
                />
              </div>
            )
        })
      )
  }

  return (
    <div className="App">
      <div className="ui text container">
        <div className='ui huge header'>
          <p>Test Feed</p>
        </div>
        <div className='ui medium header'
          style={{display: !currentTest ? 'block': 'none'}}
        >
          <p>Click on a test to view!</p>
        </div>
        {renderFeed(currentTest)}
        {renderTest(currentTest)}
        {renderQuestions(questionSet)}
        {renderQuestions(allQuestionsArray)}
      </div>
    </div>
  );
}

export default App;
