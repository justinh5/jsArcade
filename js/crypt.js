

const INTRO = "You stand at the entrance of a dark crypt. Legend says that there is priceless treasure hidden deep within its depths. No intrepid adventurer has ever returned upon entering the crypt. You switch on your flashlight and enter the darkness.";
const outcome1 = "You are walking through the rough-hewn halls amid the eerie glow of your flashlight when suddenly...it flickers out. All of your spare batteries are dead and the darkness engulfs you.";
const outcome2 = "You walk into a room with a simple stone alter amid the dim glow of candles on its surface. You think it's strange how there are lit candles as this place was said to be abandoned many years ago. Someone comes up from behind and immobilizes you with chloroform. When you awaken you find yourself strapped to the alter in the center of a ring of black-robed cult followers. You are sacrificed.";
const outcome3 = "There is a peculiar tome clutched in the hands of one of the corpses. You wrest it out of its hands and find that it's in surprisingly good condition. It appears to be some sort of pagan manuscript. As you read out loud some of the text, a chill crawls down your throat. A malicious entity has claimed your soul.";
const outcome4 = "As you are pondering death, you fall into a deep pit and break both your legs.";
const outcome5 = "The many winding tunnels seem endless and your strength is weakening by the hour. Your thoughts turn to doubt. It was foolish to ever venture in this god-foresaken place. You are not paying attention to the floor in front of you and you trip into a cesspool. Your flesh slowly decays.";
const outcome6 = "You have run out of markers to find your way back to the entrance, but you decide it's okay to keep going because the treasure cannot be that much further. Minutes later you become lost. You weep in solitude and starve until your body becomes as thin as the corpses that line the walls. You crawl into a nearby crevice and close your eyes for the last time.";
const outcome7 = "You walk into a chamber that appears to be a long-forgotten dungeon. Lonely skeletons are still shackled to the walls in isolated cells. You enter a cell for no reason, then the door slams shut behind you. Locked. The horror dawns on you as no one will hear your screams, and you will never see the light of another day.";
const outcome8 = "You trip on a skull and are rendered unconcious when you hit the ground. You die from internal bleeding.";
const outcome9 = "You walk into an ornate room with a chest sitting in the center. You open the chest and...there's nothing inside it. You walk away in dissapointment.";
const outcome10 = "You enter an inconspicuous room with a casket in its center. Upon opening the casket, you're startled when a skeletal hand snatches your arm and pulls you inside with the lid shutting closed behind.";
const WIN = "Eureka! You walk into a room that's filled with gold. You stuff a handful of treasure in your backpack and leave.";
const DEATHS = [outcome1, outcome2, outcome3, outcome4, outcome5, outcome6, outcome7, outcome8, outcome9, outcome10];
const DIRECTIONS = ["left", "center", "right"];

const three = "../img/crypt/three.png";
const twoCenter = "../img/crypt/twoCenter.png";
const twoLeft = "../img/crypt/twoLeft.png";
const twoRight = "../img/crypt/twoRight.png";
const oneRight = "../img/crypt/oneRight.png";
const oneCenter = "../img/crypt/oneCenter.png";
const oneleft = "../img/crypt/oneLeft.png";

function TernaryTree() {
  this.root = null;
}

function Node(msg) {
  this.message = msg;
  this.picture = null;
  this.left = null;
  this.center = null;
  this.right = null;
}

TernaryTree.prototype.assignPicture = function(node, direction) {

  var left = (node.left || direction === "left") ? true : false;
  var center = (node.center || direction === "center") ? true : false;
  var right = (node.right || direction === "right") ? true : false;

  if (left === true && center === true && right === true) {
    return three;
  }
  else if (left === true && center === false && right === true) {
    return twoCenter;
  }
  else if (left === true && center === true && right === false) {
    return twoLeft;
  }
  else if (left === false && center === true && right === true) {
    return twoRight;
  }
  else if (left === false && center === false && right === true) {
    return oneRight;
  }
  else if (left === false && center === true && right === false) {
    return oneCenter;
  }
  else if (left === true && center === false && right === false) {
    return oneleft;
  }
  return null;
};

TernaryTree.prototype.addNode = function(winning) {

   var index = Math.floor(Math.random() * DEATHS.length);  // random losing outcome index
   var message = (winning === true) ? WIN : DEATHS[index];

   if(!this.root){
      this.root = new Node(null);
      return;
   }

   var currentNode = this.root;
   var newNode = new Node(message);

   while(currentNode) {

     var i = Math.floor(Math.random() * 3);   // choose a random direction

     if (DIRECTIONS[i] === "left") {
       if(!currentNode.left){
         currentNode.picture = this.assignPicture(currentNode, DIRECTIONS[i]);
         currentNode.left = newNode;
         break;
       }
       else{
          currentNode = currentNode.left;
       }
     }
     else if (DIRECTIONS[i] === "center") {
       if(!currentNode.center){
         currentNode.picture = this.assignPicture(currentNode, DIRECTIONS[i]);
         currentNode.center = newNode;
         break;
       }
       else{
          currentNode = currentNode.center;
       }
     }
     else if (DIRECTIONS[i] === "right") {
       if(!currentNode.right){
         currentNode.picture = this.assignPicture(currentNode, DIRECTIONS[i]);
         currentNode.right = newNode;
         break;
       }
       else{
          currentNode = currentNode.right;
       }
     }
  }
};


function shuffle(a) {
    for (let i = a.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function displayPicture(path, text) {

  // picture is a png img
  if(path) {
    $("#text-pic").hide();
    $("#pic").attr("src", path);
    $("#pic").show();
  }
  else {  // end node picture is text
    $("#pic").hide();
    $("#text-pic").text(text);
    $("#text-pic").show();

    // update winning/losing Status
    if(text.includes("Eureka")) {
      $("#status").text("YOU WIN");
      $("#status").addClass("winning blinking");
    }
    else if (text !== INTRO){
      $("#status").text("YOU LOSE");
      $("#status").addClass("losing blinking");
    }
  }
}


function displayButtons(node) {

  $("#left").hide();
  $("#center").hide();
  $("#right").hide();

  if (node.left !== null) {
    $("#left").show();
  }
  if (node.center !== null) {
    $("#center").show();
  }
  if (node.right !== null) {
    $("#right").show();
  }
  if ((node.right === null) && (node.left === null) && (node.center === null)) {
    $("#directions").hide();
    $("#end-game").show();
  }
}



$(document).ready(function() {

  const TOTAL_NODES = 40;   // total nodes to generate
  var tree = null;          // root of the tree
  var current = null;       // current node the player is in
  var depth = 1;            // keep track of the current depth

  displayPicture(null, INTRO);  // display intro text

  $(".new-game").click(function() {

    $("#start-game").hide();
    $("#end-game").hide();
    $("#game-title").hide();
    $("#status-container").show();
    $("#directions").show();

    tree = new TernaryTree();  // create new game tree
    depth = 1;

    // Build the tree
    for (var i=0; i<TOTAL_NODES; ++i) {
      tree.addNode(false);
    }
    tree.addNode(true);  // add in winning node last
    current = tree.root; // start at the root

    // display first image at the root with buttons
    displayPicture(current.picture, null);
    displayButtons(current);
    $("span#depth").text(depth);
    $("#status").removeClass();
    $("#status").text("searching");
  });

  $(".direction").click(function() {
    var direction = $(this).attr("id");

    switch(direction) {
      case "left":
        current = current.left;
        break;
      case "center":
        current = current.center;
        break;
      case "right":
        current = current.right;
        break;
    }
    displayPicture(current.picture, current.message);
    displayButtons(current);
    $("span#depth").text(++depth);
  });

  $("#reset").click(function() {
    current = tree.root;
    depth = 1;
    displayPicture(current.picture, null);
    displayButtons(current);
    $("#end-game").hide();
    $("#directions").show();
    $("span#depth").text(depth);
    $("#status").removeClass();
    $("#status").text("searching");
  });


});
