const promptText = document.getElementById('promptText')

const startButton = document.getElementById('startButton')
const textArea = document.getElementById('textArea')
const titleCard = document.getElementById('titleCard')
const detaBanner = document.getElementById('detaBanner')

const timerButton = document.getElementById('timerButton')
const exportButton = document.getElementById('exportButton')
const reloadButton = document.getElementById('reloadButton')
const homeButton = document.getElementById('homeButton')

promptText.innerText = 'Loading...'

var i = 0;
var txt = 'prompts'; /* The text */
var speed = 200; /* The speed/duration of the effect in milliseconds */

function typeWriterTitle() {
  if (i < txt.length) {
    document.getElementById("title").innerText = document.getElementById("title").innerText.slice(0,-1)
    document.getElementById("title").innerText += txt.charAt(i);
    i++;
    document.getElementById("title").innerText += '|'
    setTimeout(typeWriterTitle, speed);
  }
  else if(i == txt.length){
    document.getElementById("title").innerText = document.getElementById("title").innerText.slice(0,-1)

  }
}

typeWriterTitle()


startButton.addEventListener('click',()=>{
  textArea.scrollTop = textArea.scrollHeight 
  titleCard.style.opacity = '0'
  window.setTimeout(
    ()=>{
      titleCard.style.display = 'none'
    },300
  )
  detaBanner.style.display = 'none'
  textArea.style = "display:block; width: 80%; margin-left:auto; margin-right:auto;"
  textArea.scrollIntoView({ block: 'end', behavior: 'smooth' })

  
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

            promptText.value =""
            story = data.data.children[index].data['title'].split('] ')[1]
            console.log(story)
            var j=0
            function typeWriterText() {
              if (j < story.length) {
                promptText.value = promptText.value.slice(0,-1)
                promptText.value += story.charAt(j);
                j++;
                promptText.value += '|'
                setTimeout(typeWriterText, 30);
              }
              else if(j == story.length){
                promptText.value = promptText.value.slice(0,-1)
            
              }
            }  
            typeWriterText()
            //promptText.innerText = data.data.children[index].data['title'].split('] ')[1]
            
          }else if(flair == 'Image Prompt' || flair == 'Media Prompt'){
            location.reload()
          }
          if(data.data.children[index].data['title'].split('] ')[1] == 'undefined'){
            location.reload()
          }
          promptText.focus()
      })
      .catch(function(err) {
          location.reload()
          //promptText.innerText = 'There seems to be an error in fetching the data. Try reloading the page!'
          console.log(err);   // Log error if any
      })
     

})

exportButton.addEventListener('click',()=>{

})

reloadButton.addEventListener('click',()=>{

})

homeButton.addEventListener('click',()=>{

})

timerButton.addEventListener('click',()=>{
  
})



