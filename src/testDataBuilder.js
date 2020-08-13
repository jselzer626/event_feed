/*questions - array of images
subject - string, foreign key
year - string, foreign key
title - string (concat year and )
userClicked
totalClicks 
*/

let subjects = ['English', 'Math', 'Science']

/*let test = []

subjects.forEach(subject => {
    test.push({[subject]: ['hello']})
})*/

let years = ['2017', '2018', '2019', '2020']
id_counter = 0
tests = {allTests: []}

let createTests = () => {
    subjects.forEach(subject => {
        
        years.forEach(year => {
            
            var yearTest = {[year]: []}
            for (let i = 0; i < 10; i ++) {
                var newTest = {}
                newTest.subject = subject
                newTest.year = year
                newTest.id = id_counter
                id_counter++
                newTest.title = `${year} ${subject} Exam`
                questions = []
                for (let j = 0; j < 30; j++) {
                    question = `Question #${j}`
                    questions.push(question)
                }
                newTest.questions = questions
                newTest.userClicked = false
                newTest.userClicks = Math.floor(Math.random() * Math.floor(20))
                tests.allTests.push(newTest)
            }
        })
    })
}


createTests()

tests.allTests.sort((a,b) => (a.userClicks < b.userClicks) ? 1 : -1 )

const fs = require("fs")

fs.writeFile('tests.json', JSON.stringify(tests), err => {

    if (err) throw err

    console.log("Done")
})



