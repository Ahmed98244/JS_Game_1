// call span to start game
document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("whats Your Name?");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unkown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

// duration to flip
let duration = 1000;

// the blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");

// block
let blocks = Array.from(blocksContainer.children);

// order range
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// add order css to game blocks
blocks.forEach((block, index) => {
  // add css order property
  block.style.order = orderRange[index];

  // add click event
  block.addEventListener("click", function () {
    // trigger the flip function
    flipBlock(block);
  });
});

// flip block function
function flipBlock(selectedBlock) {
  // add class is flip
  selectedBlock.classList.add("is-flipped");

  // collect all fliped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // if there two selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking();

    // check matched block function
    checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// stop clicking function
function stopClicking() {
  // add class no-clicking on main Container
  blocksContainer.classList.add("no-clicking");

  // set time to clicking
  setTimeout(() => {
    // remove class => no-clicking
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// check matched block function
function checkMatchedBlock(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.techno === secondBlock.dataset.techno) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// shuffle function
function shuffle(array) {
  // setting vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);

    // decrese length by one
    current--;

    // [1] save current element in stash
    temp = array[current];

    // [2] current element = random element
    array[current] = array[random];

    // [3] random element = get element from stash
    array[random] = temp;
  }
  return array;
}
