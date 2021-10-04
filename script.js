document.body.onload = init();

function init() {
  // Create a new div element for each row of game.board
  for (row in game.board) {
    const newDiv = document.createElement(`row-${row}`);
    document.body.appendChild(newDiv);
  }

//   // and give it some content
//   const newContent = document.createTextNode("Hi there and greetings!");

//   // add the text node to the newly created div
//   newDiv.appendChild(newContent);

//   // add the newly created element and its content into the DOM
//   const currentDiv = document.getElementById("div1");
//   document.body.insertBefore(newDiv, currentDiv);
}
