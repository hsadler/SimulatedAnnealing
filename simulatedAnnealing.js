var knapsack = {items: [], maxWeight: 17, currentWeight: 0}; // NP-hard
var items = [ // allowed multiple of each
  {name:'apple',    weight:3, value:20},
  {name:'blanket',  weight:4, value:40},
  {name:'lantern',  weight:5, value:10},
  {name:'radio',    weight:6, value:30}
];

var weighItems = function(currSolution) {
  var weight = 0;
  for(var i = 0; i < currSolution.length; i++) {
    weight += currSolution[i].weight;
  }
  return weight;
}

function generateRandomSolution(){
  var solution = [];

  while(weighItems(solution) < 18) {
    solution.push(items[randomIndex(items)]);
  }
  solution.pop();


  return solution; // array of items, must be <= maxWeight
};

function generateNeighboringSolution(oldSolution){
  // add, swap, or remove item randomly

  //take a existing solution array
  var oldSol = oldSolution.slice();

  //pick an item at random to remove
  var randI = randomIndex(oldSol);

  oldSol.splice(randI, 1);

  //add another random item if diff
  while(weighItems(oldSol) < 18) {
    oldSol.push(items[randomIndex(items)]);
  }
  oldSol.pop();
  console.log(oldSol);

  return oldSol; // array of items, must be <= maxWeight
}

function calculateCost(solution){

  var cost = 0;

  for(var i = 0; i < solution.length; i++) {
    cost += solution[i].value;
  }

  return cost; // sum of values of items
}

function acceptance_probability(old_cost, new_cost, temperature){
  return Math.pow(Math.E, (new_cost - old_cost)/temperature); // probability to jump
}

function simulateAnnealing(){
  var counter = 0;
  //get initial random solution
  var solution = generateRandomSolution(items);
  //get neighbor solution and compare
  var neighbor;
  //if better, keep

  while(counter < 100) {
    neighbor = generateNeighboringSolution(solution);

    if(calculateCost(solution) < calculateCost(neighbor)) {
      solution = neighbor;
    }
    counter++;
  }
  // while(calculateCost(solution) < 140) {
  //   anneal();
  // }
  // //if not better, run again

  return solution; // array of items, must be <= maxWeight
};

///////////////////////////////////
// HELPER FUNCTIONS              //
// don't modify, but you can use //
///////////////////////////////////

function randomIndex(list){
  return Math.floor(Math.random()*list.length);
}

function weigh(solution){
  return solution.reduce(function(total, item){ return total + item.weight}, 0);
}
