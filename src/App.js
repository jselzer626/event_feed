import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import tests from './tests.json';
import './App.css';
import 'English' from './images/English.png';
import 'Math' from './images/Math.png';
import 'Science' from './images/Science.png';

// is there going to be some sort of login / persistent user data for this?

function App() {

  const testSubjects = ['English', 'Math', 'Science']
  const years = ['2017', '2018', '2019', '2020']
  const categories = ['Trending', 'By Subject', 'By Year', 'Random']
  
  //can be adapted for mobile or desktop view
  // this is how many will display for each category
  const [displayChunk, setDisplayChunk] = useState(2)
  //3 keys => allTests (sorted by clicks), bySubject, byYear
  const [tests, setTests] = useState(tests)
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
          categoryDisplay += renderTestCard(tests.allTests[i])
        }
        break
      case 'By Subject':
        testSubjects.forEach(subject => {
          let displayed = []
          categoryDisplay += <h1>{subject}</h1>
          for (let i = 0; i < displayChunk; i++) {
            let index = randomIndex(tests.bySubject.subject.length, displayed)
            categoryDisplay += renderTestCard(tests.BySubject.subject[index])
          }
        })
        break
      case 'By Year':
        years.forEach(year => {
          let displayed = []
          categoryDisplay += <h1>{subject}</h1>
          for (let i = 0; i < displayChunk; i++) {
            let index = randomIndex(tests.byYear.year.length, displayed)
            categoryDisplay += renderTestCard(tests.ByYear.year[index])
          }
        })
        break
      case 'Random':
        let displayed = [0,1]
        for (let i = 0; i < displayChunk; i++) {
          let index = randomIndex(tests.allTests.length, displayed)
          categoryDisplay += renderTestCard(tests.allTests[index])
        }
        break
    }
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

  const renderFullTest = currentTest => {
    if (!currentTest)
      return
    
    let testToRender = 
      <div>
        <h1>{currentTest.title}</h1>
        {currentTest.questions.map(question => {
          //ideally user could save difficult questions to check later
          <div className="testQuestion">
            {question}
          </div>
        })}
      </div>

      return testToRender

  }

  const renderCategories = currentTest => {
    if (currentTest)
      return
    
    let fullDisplay = 
      <div>
      categories.map(category => {
        <div>
          <h1>{category}</h1>
        </div>
        <div>
        {renderCategoryContent(category)}
        </div>

          }
        </div>
        }
      })
      

  }


  return (
    <div className="App">
      <div className="ui text container">




      </div>

    </div>
  );
}

export default App;
