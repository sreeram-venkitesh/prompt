// install express with `npm install express` 
const express = require('express')
const fetch = require('node-fetch')

const app = express()
// fetch('https://api.reddit.com/r/WritingPrompts/new.json')
//     .then(res => console.log(res))
//     .then(data => console.log(data))

fetch('https://www.reddit.com/r/writingprompts/new.json')
    .then(function(res) {
        return res.json();   // Convert the data into JSON
    })
    .then(function(data) {
        const index = Math.floor(Math.random() * 26) + 1
        console.log(index)
        flair = data.data.children[index].data['link_flair_richtext'][0]['t']   
        console.log(flair)
        if(flair == 'Writing Prompt' || flair == 'Reality Fiction' || flair == 'Simple Prompt'
        || flair == 'Established Universe' || flair == 'Constrained Writing' || flair == 'Theme Thursday'){

            console.log(data.data.children[index].data['title'].split(']')[1])
        }
    })
    .catch(function(err) {
        console.log(err);   // Log error if any
    })


app.get('/', (req, res) => res.sendfile('index.html'))


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    if(PORT===3000){
        console.log('listening to port 3000')
    }
})

// export 'app'
//module.exports = app