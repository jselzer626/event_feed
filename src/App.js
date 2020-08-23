import React, { useState, useEffect } from 'react'
import './App.css'
import English from './images/English.png'
import MathImg from './images/Math.png'
import Science from './images/Science.png'
import ny from './images/ny.png'
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

let allQuestionsObj = mockData.reduce((fullQuestionSet, question, index) => {

  if (fullQuestionSet[question.gs$cell.row]) {
    fullQuestionSet[question.gs$cell.row].push(question)
  } else {
    fullQuestionSet[question.gs$cell.row] = []
    fullQuestionSet[question.gs$cell.row].push(question)
  }
  return fullQuestionSet
}, {})

let allQuestionsArray = mockData.reduce((fullQuestionSet, question, index) => {

  //filter out row 1
  if (question.gs$cell.row === '1') {
    return fullQuestionSet
  }

  if (fullQuestionSet[question.gs$cell.row]) {
    fullQuestionSet[question.gs$cell.row].push(question)
  } else {
    fullQuestionSet[question.gs$cell.row] = []
    fullQuestionSet[question.gs$cell.row].push(question)
  }
  return fullQuestionSet

}, [])

console.log(allQuestionsArray)

function App() {

  const testSubjects = ['English', 'Math', 'Science']
  const years = ['2017', '2018', '2019', '2020']
  const categories = ['Top Stories', 'Trending', 'Best Of']

  const [displayChunk, setDisplayChunk] = useState({ Trending: [0, 0], Random: [0, 0], bySubject: [0, 0], byYear: [0, 0] })
  const [allTests, setAllTests] = useState(sampleData.allTests)
  const [currentTest, setCurrentTest] = useState(null)
  const [displayedTests, setDisplayedTests] = useState([])
  const [selectedYear, setSelectedYear] = useState('2020')
  const [selectedSubject, setSelectedSubject] = useState('English')
  const [questionStep, setQuestionStep] = useState(5)

  const imageMatcher = name => {
    if (name === "Science") return Science
    else if (name === "Math") return MathImg
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
    setDisplayChunk({ ...displayChunk, categoryClean: newDisplay })

  }

  const renderTestCard = test => {

    return (
      <div className='ui card fluid' style={{boxShadow: "none"}} onClick={() => setCurrentTest(test)}
        key={test.id}>
        <div className='content'>
          <img className="ui right floated small rounded image" src={'https://via.placeholder.com/150'} />
          <div className="ui header inverted grey" style={{ textAlign: "left" }}>
            {test.title}
          </div>

          <div className="ui label" style={{ float: "left" }}>
            <i className="question circle outline icon"></i> {test.questions.length}
          </div>

          <div className="ui label" style={{ float: "left" }}>
            <i className="star outline icon"></i> {test.userClicks}
          </div>

        </div>
      </div>)


  }

  const renderArticleCard = (articleContent,index) => {
    console.log("Article Card Data")
    console.log(articleContent)

    let questionNum, questionAns, questionImg, points, category, year, month, examQNum

    articleContent.map((cell) => {
      if (cell.gs$cell.col === '3') {
        questionNum = cell.gs$cell.inputValue
      }
      if (cell.gs$cell.col === '8') {
        questionAns = cell.gs$cell.inputValue
      }
      if (cell.gs$cell.col === '15') {
        questionImg = cell.gs$cell.inputValue
      }

      if (cell.gs$cell.col === '9') {
        points = cell.gs$cell.inputValue
      }

      if (cell.gs$cell.col === '11') {
        category = cell.gs$cell.inputValue
      }

      if (questionNum) {
        month = questionNum.substring(0, 2)
        year = questionNum.substring(2, 4)
        examQNum = questionNum.substring(4, 6)
      }

    })

    let subject = []

    let verb = []

    let object = []

    let result = []

    let titles = [
      `New York math teacher reveals secret trick for how to pass the 2021 Algebra I regents exam`,
      `At least 30 schools in New York are using this new game to prepare students for the NY Regents`,
      `If you can answer these 10 Algebra I Regents exam questions, you're on track to pass`,
      `Student breaks record for shortest time prepping Algebra I Regents and passing`,
      `This is the top NY Regents Algebra I Exam category`,
      `5 essential questions to study this week if you want to pass the January 2021 Algebra I exam`,
    ]
    
    return (
      <div className='ui card fluid' style={{boxShadow: "none"}} onClick={() => setCurrentTest(articleContent)}>
        <div className='ui content'>
          <img className="ui right floated small rounded image" src={'https://via.placeholder.com/150'}/>
          <div className="ui left header large inverted grey" style={{ textAlign: "left" }}>
            {titles[index]}
          </div>
{/* 
          <div className="ui label" style={{ float: "left" }}>
            <i className="question circle outline icon"></i> {Math.floor(Math.random() * 10)}
          </div>

          <div className="ui label" style={{ float: "left" }}>
            <i className="star outline icon"></i> {Math.floor(Math.random() * 100)}
          </div> */}

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
        return <div className="ui">
          <div className="ui fluid" style={{ textAlign: "center" }}>
            <h1>{category}</h1>
          </div>
          <div className="ui fluid">
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
        return <div className="ui stackable one column grid">
          <div className="row">
            <div className="sixteen wide column" style={{ textAlign: "center" }}>
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
        return <div className="ui stackable one column grid">
          <div className="row">
            <div className="sixteen wide column" style={{ textAlign: "center" }}>
              <h1>{category}</h1>
            </div>
          </div>
          <div className="row">
            <div className="sixteen wide column" id="optionsBar">
              {years.map(year => {
                return <p onClick={() => setSelectedYear(year)}
                  className={year === selectedYear ? 'selectedOption' : ''}
                >
                  {year}</p>
              })}
            </div>
          </div>
          <div className="row">
            {displayChunk.byYear.map(num => {
              return renderTestCard(findTest(allTests.filter(test => test.year === selectedYear), newDisplayedTests))
            })}</div>
          <button
            className="ui button massive fluid green"
            onClick={() => loadMoreContent(category)}
          > Load More {selectedYear} Tests
                      </button>
        </div>
      } else {
        return <div className="ui stackable one column grid">
          <div className="row">
            <div className="sixteen wide column" style={{ textAlign: "center" }}>
              <h1>{category}</h1>
            </div>
          </div>
          <div className="row">
            <div className="sixteen wide column" id="optionsBar">
              {testSubjects.map(subject => {
                return <p onClick={() => setSelectedSubject(subject)}
                  className={subject === selectedSubject ? 'selectedOption' : ''}>
                  {subject}</p>
              })}
            </div>
          </div>
          <div className="row">
            {displayChunk.bySubject.map(num => {
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

  //Simpler
  const renderFeed2 = (currentTest,allQuestions) => {

    if (currentTest)
      return

    

    //array contains some empty elements
    // https://stackoverflow.com/questions/33802875/get-number-of-non-empty-elements-from-nested-arrays
    allQuestions = allQuestions.filter(Boolean)
    let questionCount = allQuestions.length
    console.log(allQuestions.length)
    console.log(allQuestions)
    console.log(questionCount)

    let random1 = Math.floor(Math.random() * questionCount)
    let random2 = Math.floor(Math.random() * questionCount)
    let count = -1

    return categories.map((category) => {
      // Get two articles per category
      let q1 = allQuestions.filter( (question,index) => {
        if(index === random1){
          return true
        }
      })[0]

      let q2 = allQuestions.filter( (question,index) => {
        if(index === random2){
          return true
        }
      })[0]

      return (<div className="ui basic segment">
        <div className="ui fluid" style={{ textAlign: "left" }}>
          <h1 className="ui header inverted">{category}</h1>
          <div className="ui inverted divider"></div>
        </div>

        <div className="ui fluid">
            {[q1,q2].map((article) => {
              count++
              return renderArticleCard(article, count)
            })}
        </div>

        {/* <button
          className="ui button massive fluid green"
          onClick={() => loadMoreContent(category)}
        > Load More {category} Tests
              </button> */}
      </div>)
    })
  }

  const renderQuestions = (questionSet) => {
    return (
      questionSet.map((element) => {
        let questionNum, questionAns, questionImg, points, category, year, month, examQNum
        element.map((cell) => {
          if (cell.gs$cell.col === '3') {
            questionNum = cell.gs$cell.inputValue
          }
          if (cell.gs$cell.col === '8') {
            questionAns = cell.gs$cell.inputValue
          }
          if (cell.gs$cell.col === '15') {
            questionImg = cell.gs$cell.inputValue
          }

          if (cell.gs$cell.col === '9') {
            points = cell.gs$cell.inputValue
          }

          if (cell.gs$cell.col === '11') {
            category = cell.gs$cell.inputValue
          }

          if (questionNum) {
            month = questionNum.substring(0, 2)
            year = questionNum.substring(2, 4)
            examQNum = questionNum.substring(4, 6)
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
      <div className="ui raised very padded text container segment">

        <div className="ui image label" style={{ float: "left" }}>
          <img src={ny}/>
        REGENTS NEWS
        </div>

        <div class="ui hidden divider"></div>

        {renderFeed2(currentTest,allQuestionsArray)}
        {/* {renderTest(currentTest)} */}
        {/* {renderQuestions(questionSet)} */}
        {renderQuestions(allQuestionsArray)}
      </div>
    </div>
  );
}

export default App;
