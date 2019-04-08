let initialStateSize = 8

let rate
let slider
let paragraph1
let paragraph2

let initialState 
let pieceSize 
let chessGame
let hillClimbing
let goal
let history = ""

let actualState = 'No value'
let actualCost = 'No value'

function preload(){
  queenImage = loadImage('../img/queen.svg')
}

function getRandomArray(n){
  let randomArray = []
  for (let i = 0; i < n; i++) {
    randomArray[i] = Math.floor(Math.random()*n)
  }
  return randomArray
}

function setupVariables(){
  initialState = getRandomArray(initialStateSize)
  pieceSize = width / initialState.length
  goal = []
  for (let i = 0; i < initialStateSize; i++) {
    goal[i] = 0    
  }
}

let on = true
function pausePlay(){
  if(on){
    noLoop()
    on = false
    console.log('Pause');
    
  }else{
    loop()
    console.log('Playing')
    on = true
  }
}

function setupDomElements(){
  slider = createSlider(1,50,1)
  slider.position(10,height + 10)  

  button = createButton('Pause/Play');
  button.position(width - 75,height+20);
  button.mousePressed(pausePlay);

}

function showData(){
  actualState = chessGame.initialState
  actualCost = chessGame.attackedPieces
  paragraph1 = createP(`Actual state: ${actualState}`)
  paragraph1.position(10,height+30)
  paragraph2 = createP(`Actual cost : ${actualCost}`)
  paragraph2.position(10,height+50)

  paragraph3 = createP("-- History -- \n")
  paragraph4 = createElement('h3',history)
  paragraph3.position(10,height+70)
  paragraph4.position(10,height+90)

}
function deleteData(){
  if(paragraph1 && paragraph2){
    paragraph1.remove()
    paragraph2.remove()
    paragraph3.remove()
    paragraph4.remove()
  }
}


function setup() {
  createCanvas(560, 560)
  background(100)
  
  setupVariables()
  setupDomElements()
  
  // Drawing table with queens base on initialState array
  chessGame = new Chess(initialState,width,height,pieceSize)
  //HillClimbingAlgorithm
  
  hillClimbing = new HillClimbing(initialState,
  chessGame.getAttackedPieces(),goal)
}

let nextMove = []

function draw() {
  frameRate(slider.value())
  
  chessGame.printTable() 
  deleteData()
  showData()

  history += `S: [${chessGame.initialState}] -- C: [${chessGame.attackedPieces}] <br>`

  if(isSameArray(chessGame.attackedPieces,goal)){
    console.log('Ganaste')
    history+='Ganaste<br>'
    showData()
    noLoop()
  }

  nextMove = hillClimbing.execute()
  chessGame.initialState = nextMove
  chessGame.getAttackedPieces()
  hillClimbing.state = chessGame.initialState
  hillClimbing.cost = chessGame.attackedPieces
 
}

function isSameArray(arr1,arr2){
  let is_same = false
  if(arr1.length == arr2.length && arr1.every(
    function(element,index){
      return element === arr2[index]
    }
  )){
    is_same = true
  }
  return is_same 
}
