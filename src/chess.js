class Chess {
  constructor(pInitialState,pWidth,pHeight,pPieceSize){
    this.initialState = pInitialState || []
    this.attackedPieces = []
    this.pieceSize = pPieceSize
    this.boardWidth = pWidth
    this.boardHeight = pHeight
  }
  getAttackedPieces(someState){
    this.attackedPieces = []
    let attacks = 0
    let state
    if (someState) {
      state = someState
    }
    else {
      state = this.initialState
    }    
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state.length; j++) {
        if(i !== j){
          //Same row
          if(state[i] === state[j]) attacks+=1
          //Same diagonal
          if(abs(state[i]-state[j]) === abs(i - j)) attacks++
        }
      }
      this.attackedPieces.push(attacks)
      attacks = 0
    }    
    return this.attackedPieces
  }
  
  printTable(){
    let retroColor = true
    
    let pWidth = this.boardWidth
    let pHeight = this.boardHeight
    let pSize = this.pieceSize

    for (let i = 0; i < pWidth/pSize; i++) {
      for (let j = 0; j < pHeight/pSize; j++) {
        stroke(0)

        retroColor ? fill(0) : fill(255)
        
        let Xposition = i * pSize
        let Yposition = j * pSize
        rect(Xposition,Yposition,pSize-1,pSize-1)      

        if (this.initialState[i] == j){
          // Drawing Queen image 
          image(queenImage,Xposition + 2,Yposition + 2,pSize-5,pSize-5)
        }

        if(j !== pHeight/pieceSize -1){
          if(retroColor){
           retroColor = false
          } else if (retroColor === false){
            retroColor = true
          }
        }
         
      }
    }
  }
}