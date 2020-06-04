const holes = document.querySelectorAll(".hole");
let lastHole ;
let timeUp = false;
const rabs = document.querySelectorAll(".rab");
let score = 0;
const board = document.querySelector(".score"); 


// create a function to make a random time for rabbit to pop out
function randomTime(min,max){
    return Math.round(Math.random()*(max-min) + min)
}


function randomHole(holes){
    const index = Math.floor(Math.random()*holes.length)
    const holeX = holes[index];

    // prevent from choosing the same previous hole
    if (holeX === lastHole){
        return randomHole(holes);
    }

    lastHole = holeX;
    return holeX;
}

function appear(){
    const timeIsOut = randomTime(500,900); // how long a rabbit should stay visible
     const hole = randomHole(holes);
    console.log(timeIsOut)
    console.log(hole)

    hole.classList.add('up'); // A CSS class to pop out

    setTimeout(() => {
        hole.classList.remove('up') // make the hole pop down after a random time
        if (!timeUp){
            appear();
        }
      
    }, timeIsOut);
}

function startGame(){
    board.textContent = 0;
    score = 0;
    timeUp = false;

    appear();
    setTimeout(() =>  timeUp = true , 16000);  // continue the game for 15 seconds
    
}

function clicked(e){
       if(!e.isTrusted) return; 
        score ++;
        this.parentNode.classList.remove('up'); // for the clicked item
        board.textContent = score;

}

rabs.forEach(rab => rab.addEventListener('click',clicked));

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 100 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 100,
    easing: "easeOutExpo",
    delay: 100
  });