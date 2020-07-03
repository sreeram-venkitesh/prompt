const promptText = document.getElementById('promptText')
promptText.innerText = 'Loading...'

var i = 0;
var txt = 'Prompts'; /* The text */
var speed = 200; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("title").innerText = document.getElementById("title").innerText.slice(0,-1)
    document.getElementById("title").innerText += txt.charAt(i);
    i++;
    document.getElementById("title").innerText += '|'
    setTimeout(typeWriter, speed);
  }
  else if(i == txt.length){
    document.getElementById("title").innerText = document.getElementById("title").innerText.slice(0,-1)

  }
}
typeWriter()

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
            promptText.innerText = data.data.children[index].data['title'].split('] ')[1]
        }
    })
    .catch(function(err) {
        location.reload()
        //promptText.innerText = 'There seems to be an error in fetching the data. Try reloading the page!'
        console.log(err);   // Log error if any
    })
