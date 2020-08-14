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

  const renderCategoryContent = category => {
    
    /*let newTestsList = allTests
    newTestsList.sort((a,b) => (a.userClicks < b.userClicks) ? 1 : -1 )
    setAllTests(newTestsList)*/


    let categoryDisplay
    
    switch(category) {
      case 'Trending':
        categoryDisplay += <h1>Trending</h1>
        for (let i = 0; i < displayChunk; i++) {
          categoryDisplay += renderTestCard(allTests[i])
        }
        break
      case 'By Subject':
        testSubjects.forEach(subject => {
          let subjectSpecific = allTests.filter(test => test.subject == subject)
          categoryDisplay += <h1>{subject}</h1>
          for (let i = 0; i < displayChunk; i++) {
            categoryDisplay += renderTestCard(findRandomTest(subjectSpecific))
          }
        })
        break
      case 'By Year':
        years.forEach(year => {
          let yearSpecific = allTests.filter(test => test.year == year)
          categoryDisplay += <h1>{year}</h1>
          for (let i = 0; i < displayChunk; i++) {
            categoryDisplay += renderTestCard(findRandomTest(yearSpecific))
          }
        })
        break
      case 'Random':
        for (let i = 0; i < displayChunk; i++) {
          categoryDisplay += renderTestCard(findRandomTest(allTests))
        }
        break
    }
    return categoryDisplay
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
    

    /*if (currentTest){
      console.log(currentTest)
      return}*/
      

      const fullDisplay = categories.map(category =>
          <div>
            <div>
              <h1>{category}</h1>
            </div>
            <div>
              {renderCategoryContent(category)}
            </div>
          </div>
        )
        return fullDisplay
      }
      


  


  return (
    <div className="App">
      {console.log('rendered')}
      <div className="ui text container">
      {renderCategories(currentTest)}
      {renderFullTest(currentTest)}
      </div>
    </div>
  );
}

export default App;
