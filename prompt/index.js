// install express with `npm install express` 
const express = require('express')
const fetch = require('node-fetch')

const app = express()


app.use(express.static(__dirname + '/views'));


app.set('view engine', 'ejs');


// fetch('https://www.reddit.com/r/writingprompts/new.json')
//     .then(function(res) {
//         return res.json();   // Convert the data into JSON
//     })
//     .then(function(data) {
//         const index = Math.floor(Math.random() * 26) + 1
//         console.log(index)
//         flair = data.data.children[index].data['link_flair_richtext'][0]['t']   
//         console.log(flair)
//         if(flair == 'Writing Prompt' || flair == 'Reality Fiction' || flair == 'Simple Prompt'
//         || flair == 'Established Universe' || flair == 'Constrained Writing' || flair == 'Theme Thursday'){

//             console.log(data.data.children[index].data['title'].split('] ')[1])
//         }
//     })
//     .catch(function(err) {
//         console.log(err);   // Log error if any
//     })


app.get('/', (req, res) => {
  
    
    res.render('index')


})


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    if(PORT===3000){
        console.log('listening to port 3000')
    }
})

// export 'app'
//module.exports = app