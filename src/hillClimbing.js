class HillClimbing {
  constructor(pState,pCost,pGoal){
    this.state = pState
    // How many Queens are under attack 
    this.cost = pCost
    this.goal = pGoal
    this.newState = []
  }
  //Choose the least attacked in the cost Array
  getMostAttacked(){
    let most = -1
    let mostArrayPosition = []
    let positionToGo = -1 
    //Select the most number of queens under attack
    this.cost.forEach(e => {
      if(e>=most)most = e
    })
    //console.log('El mayor es: ',most);
    
    //Check how many positions with most cost are in the array
    for (let i = 0; i < this.cost.length; i++) {
      if(this.cost[i] === most) mostArrayPosition.push(i)  
    }
    //console.log('Se repiten ',mostArrayPosition.length,' veces');
    //Choose a random position of the array
    let randomPositionNumber = Math.floor(Math.random()*mostArrayPosition.length)
        
    positionToGo = mostArrayPosition[randomPositionNumber]
    //Return the selected position with least attacks
    //console.log('Escogo ir a por la posicion ',positionToGo);
    return positionToGo
  }
  getLeastAttacked(array){
    let least = Infinity
    let leastArrayPosition = []
    let positionToGo = -1 
    //Select the most number of queens under attack
    array.forEach(e => {
      if(e<=least)least = e
    })
    //Check how many positions with most cost are in the array
    for (let i = 0; i < array.length; i++) {
      if(array[i] === least) leastArrayPosition.push(i)  
    }
    //Choose a random position of the array
    let randomPositionNumber = Math.floor(Math.random()*leastArrayPosition.length)
        
    positionToGo = leastArrayPosition[randomPositionNumber]
    //Return the selected position with least attacks
        
    return positionToGo
  }

  getAttackedQueenValues(pState,positionToEvaluate){
    let attacks = 0
    let state = pState
    
    for (let i = 0; i < state.length; i++) { //Column
      for (let j = 0; j < state.length; j++) { //Row
        if(i === positionToEvaluate){
          //Same row
          if(state[i] === state[j]) attacks++
          //Same diagonal
          if(abs(state[i]-state[j]) === abs(i - j)) attacks++
        }
      }      
    }    
    return attacks
  } 
   
  evaluateBestRow(positionToEvaluate){
    this.copyState = this.state
    let queenArrayMovement = []
    for (let i = 0; i < this.copyState.length; i++) {      
      this.copyState[positionToEvaluate] = i
       queenArrayMovement[i] = this.getAttackedQueenValues(this.copyState,positionToEvaluate)
    }
    
    let positionToGo = this.getLeastAttacked(queenArrayMovement)
    return positionToGo
  }
  execute(){
    let positionMostAttacked = this.getMostAttacked()
    this.newState = this.state

    this.newState[positionMostAttacked] = this.evaluateBestRow(positionMostAttacked)
    return this.newState
  }
  
}