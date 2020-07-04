const promptText = document.getElementById('promptText')

const startButton = document.getElementById('startButton')
const textArea = document.getElementById('textArea')
const titleCard = document.getElementById('titleCard')
const detaBanner = document.getElementById('detaBanner')

const timerButton = document.getElementById('timerButton')
const exportButton = document.getElementById('exportButton')
const reloadButton = document.getElementById('reloadButton')
const homeButton = document.getElementById('homeButton')

const timerBar = document.getElementById('timerBar')

promptText.innerText = 'Loading...'

var i = 0
var txt = 'prompts'


function typeWriterTitle() {
  if (i < txt.length) {
    document.getElementById("title").innerText = document.getElementById("title").innerText.slice(0,-1)
    document.getElementById("title").innerText += txt.charAt(i);
    i++;
    document.getElementById("title").innerText += '|'
    setTimeout(typeWriterTitle, 200)
  }
  else if(i == txt.length){
    document.getElementById("title").innerText = document.getElementById("title").innerText.slice(0,-1)

  }
}

typeWriterTitle()

var stories = ''

function setStory(data){
  
  const index = Math.floor(Math.random() * 26) + 1
  flair = data.data.children[index].data['link_flair_richtext'][0]['t']
  if(flair == 'Writing Prompt' || flair == 'Reality Fiction' || flair == 'Simple Prompt'
      || flair == 'Established Universe' || flair == 'Constrained Writing' || flair == 'Theme Thursday'){

        promptText.value =""
        story = data.data.children[index].data['title'].split('] ')[1]
        console.log(story)
        var j=0
        function typeWriterText() {
          if (j < story.length) {
            promptText.value = promptText.value.slice(0,-1)
            promptText.value += story.charAt(j)
            j++
            promptText.value += '|'
            setTimeout(typeWriterText, 30)
          }
          else if(j == story.length){
            promptText.value = promptText.value.slice(0,-1)
        
          }
        }  
        typeWriterText()
        //promptText.innerText = data.data.children[index].data['title'].split('] ')[1]
        
  }else if(flair == 'Image Prompt' || flair == 'Media Prompt'){
        //location.reload()
        setStory(story)
  }
  if(data.data.children[index].data['title'].split('] ')[1] == 'undefined'){
     location.reload()
     startButton.click()
    //setStory(story)
  }
  promptText.focus()  
}

startButton.addEventListener('click',()=>{
  textArea.scrollTop = textArea.scrollHeight 
  titleCard.style.opacity = '0'
  window.setTimeout(
    ()=>{
      titleCard.style.display = 'none'
    },300
  )
  detaBanner.style.display = 'none'
  textArea.style = "display:block; opacity:1; width: 80%; transition : all .3s; -wekit-transition : all .3s; -moz-transition : all .3s; margin-left:auto; margin-right:auto;"
  textArea.scrollIntoView({ block: 'end', behavior: 'smooth' })

  
  fetch('https://www.reddit.com/r/writingprompts/new.json')
      .then(function(res) {
          return res.json();   // Convert the data into JSON
      })
      .then(function(data) {
          stories = data
          setStory(data)
      })
      .catch(function(err) {
          //location.reload()
          setStory(story)
          //promptText.innerText = 'There seems to be an error in fetching the data. Try reloading the page!'
          console.log(err);   // Log error if any
      })
})

var textFile = null

makeTextFile = function (text) {
  var data = new Blob([text], {type: 'text/plain'})
  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile)
  }
  textFile = window.URL.createObjectURL(data)
  return textFile
}


// Downloading story as text file
exportButton.addEventListener('click',()=>{
  var exportLink = document.getElementById('exportLink')
  if(confirm('Download story as text file?')){
    exportLink.href = makeTextFile(promptText.value)
  }
  return false
})

reloadButton.addEventListener('click',()=>{
  promptText.innerText = 'Loading...'
  setStory(stories)
  promptText.focus()
})

// Going back to home
homeButton.addEventListener('click',()=>{
  textArea.style.opacity = '0'
  titleCard.style.opacity = '1'
  window.setTimeout(
    ()=>{
      textArea.style.display = 'none'
      titleCard.style.display = 'block'
      detaBanner.style.display = ''
    },300
  )
  titleCard.scrollIntoView({ block: 'start', behavior: 'smooth' })

})

// Timer button and its elements
var totalSeconds =0

const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')

var wpm = document.getElementById('wpm')


function setTime(){
  totalSeconds++
  seconds.innerText = pad(totalSeconds % 60)
  minutes.innerText = pad(parseInt(totalSeconds/60))
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

timer = null

var iLastTime = 0;
var iTime = 0;
var iTotal = 0;
var iKeys = 0;

timerButton.addEventListener('click',()=>{
  
  if(timerBar.style.opacity == '0'){
    
    timerBar.style.opacity = '1'
    timerButton.innerText = 'Stop Timer'
    timer = setInterval(setTime,1000)

   
    promptText.onkeypress = function(){
      iTime = new Date().getTime()

      if (iLastTime != 0) {
          iKeys++
          iTotal += iTime - iLastTime
          iWords = promptText.value.split(' ').length
          //$('#CPM').html(Math.round(iKeys / iTotal * 6000, 2));
          //wpm.innerText = (Math.round(iWords / iTotal * 6000, 2))
          wpm.innerText = (Math.round(iKeys / iTotal * 6000, 2))

      }

      iLastTime = iTime
    }
    
  }else if(timerBar.style.opacity == '1'){
    
    timerButton.innerText = 'Start Timer'
    timerBar.style.opacity = '0'
    
    clearInterval(timer)
    stop()
    promptText.onkeypress = () =>{
    }
    totalSeconds =0
    minutes.innerText = '00'
    seconds.innerText = '00'
   
  }
  promptText.focus()

})



