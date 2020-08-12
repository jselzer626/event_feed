/*questions - array of images
subject - string, foreign key
year - string, foreign key
title - string (concat year and )
userClicked
totalClicks 
*/

let subjects = ['English', 'Math', 'Science']

let years = ['2017', '2018', '2019', '2020']

tests = {allTests: [], bySubject: [], byYear: []}

let createTests = () => {
    subjects.forEach(subject => {
        var subjectTest = {subject: []}
        years.forEach(year => {
            var yearTest = {year: []}
            for (let i = 0; i < 10; i ++) {
                var newTest = {}
                newTest.subject = subject
                newTest.year = year
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
                subjectTest.subject.push(newTest)
                yearTest.year.push(newTest)
            }
            tests.byYear.push(yearTest)
        })
        tests.bySubject.push(subjectTest)
    })
}


createTests()

tests.allTests.sort((a,b) => (a.userClicks < b.userClicks) ? 1 : -1 )

const fs = require("fs")

fs.writeFile('tests.json', JSON.stringify(tests), err => {

    if (err) throw err

    console.log("Done")
})

