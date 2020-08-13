import React, { useState, useEffect } from 'react'
import './App.css'
import English from './images/English.png'
import Math from './images/Math.png'
import Science from './images/Science.png'
import sampleData from './tests.json'

// is there going to be some sort of login / persistent user data for this?

function App() {

  const testSubjects = ['English', 'Math', 'Science']
  const years = ['2017', '2018', '2019', '2020']
  const categories = ['Trending', 'By Subject', 'By Year', 'Random']
  
  //can be adapted for mobile or desktop view
  const [displayChunk, setDisplayChunk] = useState(2)
  const [testsTrendingRanked, setTestsTrendingRanked] = useState(sampleData.allTests)
  const [testsBySubject, setTestsBySubject] = useState(sampleData.bySubject)
  const [testsByYear, setTestsByYear] = useState(sampleData.byYear)
  const [currentTest, setCurrentTest] = useState({})
  
  const randomIndex = (listSize, alreadyUsed) => {
    
    let randomInt

    do {
      randomInt = Math.floor(Math.random() * Math.floor(listSize))
    } while (alreadyUsed.includes(randomInt))
    
    alreadyUsed.push(randomInt)
    return randomInt
  }

  const renderCategoryContent = category => {
    let categoryDisplay
    switch(category) {
      case 'Trending':
        for (let i = 0; i < displayChunk; i++) {
          categoryDisplay += renderTestCard(testsTrendingRanked[i])
        }
        break
      case 'By Subject':
        testSubjects.forEach(subject => {
          let displayed = []
          categoryDisplay += <h1>{subject}</h1>
          for (let i = 0; i < displayChunk; i++) {
            let index = randomIndex(testsBySubject[`${subject}`].length, displayed)
            categoryDisplay += renderTestCard(testsBySubject[`${subject}`][index])
          }
        })
        break
      case 'By Year':
        years.forEach(year => {
          let displayed = []
          categoryDisplay += <h1>{year}</h1>
          for (let i = 0; i < displayChunk; i++) {
            let index = randomIndex(testsByYear[`${year}`].length, displayed)
            categoryDisplay += renderTestCard(testsByYear[`${year}`][index])
          }
        })
        break
      case 'Random':
        let displayed = [0,1]
        for (let i = 0; i < displayChunk; i++) {
          let index = randomIndex(testsTrendingRanked.length, displayed)
          categoryDisplay += renderTestCard(testsTrendingRanked[index])
        }
        break
    }
    return categoryDisplay
  }

  const renderTestCard = test => {
    return (
      <div className='ui card' onClick={() => 
          test.userClicks += 1,
          setCurrentTest(test)}>
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

  const renderFullTest = () => {
    
    if (!currentTest)
      return
    
      /*
    return (
      <div>
        <h1>{currentTest.title}</h1>
        <button 
          onClick = {() => setCurrentTest({})}
          >Close
          </button>
          {currentTest.questions.map(question => {
          return (<div className="testQuestion">
            {question}
          </div>)
        })}
      </div>)*/

  }

  const renderCategories = currentTest => {
    
    if (currentTest)
      return
    
    let fullDisplay = 
      categories.map(category => {
        console.log(category)
        return (<div>
          <div>
          <h1>{category}</h1>
          </div>
          <div>
            {renderCategoryContent(category)}
          </div>
        </div>)
        })
        return fullDisplay
      }
      


  


  return (
    <div className="App">
      <div className="ui text container">
      {renderCategories(currentTest)}
      {renderFullTest(currentTest)}
      </div>
    </div>
  );
}

export default App;
