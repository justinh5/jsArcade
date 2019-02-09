

const intro = "You stand at the entrance of a dark crypt. Legend says that there is priceless treasure hidden deep within its depths. No intrepid adventurer has ever returned upon entering the crypt. You light up your torch and enter the darkness.";
const win = "Eureka! You walk into a room that's filled with gold. You stuff a handful of treasure in your backpack and leave.";
const outcome1 = "You are walking through the rough-hewn halls amid the eerie glow of your torch when suddenly...it sputters out. The warmth it was emitting is now gone, and the darkness engulfs your weary soul.";
const outcome2 = "You walk into a room with a simple stone alter amid the dim glow of candles on its surface. You think it's strange how there are lit candles as this place was said to be abandoneded many years ago. Someone comes up from behind and immobilizes you with chloroform. When you awaken you find yourself strapped to the alter in the center of a ring of black-robed cult followers. The leader raises a knife and I'm sure you know the rest...";
const outcome3 = "There is a peculiar tome clutched in the hands of one of the corpses. You wrest it out of its hands and find that it's in surprisingly good condition. It appears to be some sort of pagan manuscript when you flip through it. You read out loud some of the text when suddenly a chill crawls down your throat. A mailicious entity has claimed your soul.";
const outcome4 = "It is impossible to count all the dead in the crypt. Some have been wealthly in life, and others poor, but only in death have they all become equals. As you are pondering death, you fall into a dark pit and break both your legs.";
const outcome5 = "The many winding tunnels seem endless and your strength is weakening by the hour. Doubt floods your thoughts; it was foolish to ever venture in this god-foresaken place. You are not paying attention to the floor in front of you and you trip into a cesspool. As you wallow in its filth, your flesh slowly decays.";
const outcome6 = "You have run out of markers to find your way back to the entrance, but you decide it's okay to keep going because the treasure cannot be that much further. Lo and behold, you become lost. You weep in solitude and starve until your body becomes as thin as the corpses that line the walls. You crawl into a nearby crevice and close your eyes for the last time.";
const outcome7 = "You walk into a chamber that appears to be a long-forgotten dungeon. The cracked floor is stained brown with the blood of countless past convicts and inoccents. Lonely skeletons are still shackled to the walls in isolated cells. You enter one cell for no reason, then the door slams shut behind you. Locked. The horror dawns on you as no one will hear your screams, and you will never see the light of another day.";
const outcome8 = "You walk into a room with a bottle sitting in the center on a pedestal. You decide that it's a magic potion, so you drink it. Turns out, it was poison. You die a slow death.";
const outcome9 = "You walk into an ornate room with a chest sitting in the center. You open the chest and...there's nothing inside it. You walk away in dissapointed and despair.";
const outcome10 = "The fleshless remnants in the crypt are a grim reminder of mortality, and you wonder how many of these souls succumbed to the Black Death in the Dark Ages. You enter an inconspicuous room with a casket in its center. Upon opening the casket, you're startled when a skeletal hand snatches your arm and pulls you inside with the lid shutting closed behind. Welcome home.";
const deaths = [outcome1, outcome2, outcome3, outcome4, outcome5, outcome6, outcome7, outcome8, outcome9, outcome10];

const three = "../img/crypt/three.png";
const twoMiddle = "../img/crypt/twoMiddle.png";
const twoLeft = "../img/crypt/twoLeft.png";
const twoRight = "../img/crypt/twoRight.png";
const oneRight = "../img/crypt/oneRight.png";
const oneMiddle = "../img/crypt/oneMiddle.png";
const oneleft = "../img/crypt/oneLeft.png";

function TernaryTree() {
  this.root = null;
}

function Node(msg) {
  this.message = msg;
  this.picture = null;
  this.left = null;
  this.middle = null;
  this.right = null;
}

TernaryTree.prototype.assignPicture = function(node, direction) {

  var left = (node.left || direction === 0) ? true : false;
  var middle = (node.middle || direction === 1) ? true : false;
  var right = (node.right || direction === 2) ? true : false;

  if (left === true && middle === true && right === true) {
    return three;
  }
  else if (left === true && middle === false && right === true) {
    return twoMiddle;
  }
  else if (left === true && middle === true && right === false) {
    return twoLeft;
  }
  else if (left === false && middle === true && right === true) {
    return twoRight;
  }
  else if (left === false && middle === false && right === true) {
    return oneRight;
  }
  else if (left === false && middle === true && right === false) {
    return oneMiddle;
  }
  else if (left === true && middle === false && right === false) {
    return oneleft;
  }
  return null;
};

TernaryTree.prototype.addNode = function(winning) {

   var root = this.root;

   if(!root){
      this.root = new Node(null);
      return;
   }

   var currentNode = root;
   var newNode = new Node(null);   // create new instance of node

   while(currentNode) {

     var direction = Math.floor(Math.random() * 3);   // choose a random direction

     if (direction === 0) {
       if(!currentNode.left){
         currentNode.picture = this.assignPicture(currentNode, direction);
         newNode.message = (winning === false) ? "you lose" : "You win";
         currentNode.left = newNode;
         break;
       }
       else{
          currentNode = currentNode.left;
       }
     }
     else if (direction === 1) {
       if(!currentNode.middle){
         currentNode.picture = this.assignPicture(currentNode, direction);
         newNode.message = (winning === false) ? "you lose" : "You win";
         currentNode.middle = newNode;
         break;
       }
       else{
          currentNode = currentNode.middle;
       }
     }
     else if (direction === 2) {
       if(!currentNode.right){
         currentNode.picture = this.assignPicture(currentNode, direction);
         newNode.message = (winning === false) ? "you lose" : "You win";
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


function displayButtons(node) {
  if (node.left !== null) {
    $("#left").show();
  }
  else {
    $("#left").hide();
  }
  if (node.middle !== null) {
    $("#middle").show();
  }
  else{
    $("#middle").hide();
  }
  if (node.right !== null) {
    $("#right").show();
  }
  else {
    $("#right").hide();
  }
  if ((node.right === null) && (node.left === null) && (node.middle === null)) {
    $("#pic").text(node.message);
    $("#reset").show();
  }
}



$(document).ready(function() {

  var tree = new TernaryTree();
  var totalNodes = 40;

  // Build the tree
  for (var i=0; i<totalNodes; ++i) {
    tree.addNode(false);
  }
  tree.addNode(true);  // add in winning node

  var current = tree.root;   // start at the root

  $("#pic").text(current.picture);
  displayButtons(current);

  $("#pic").text(intro);

 //console.log(tree);

  $(".new-game").click(function() {

    $("#start-game").hide();
    $("#end-game").hide();
    


  });

  $(".btn").click(function() {
    var direction = $(this).attr("id");

    switch(direction) {
      case "left":
        current = current.left;
        break;
      case "middle":
        current = current.middle;
        break;
      case "right":
        current = current.right;
        break;
    }
    $("#pic").text(current.picture);   //display new picture
    displayButtons(current);           //display new buttons
  });

  $("#reset").click(function() {
    current = tree.root;
    $("#pic").text(current.picture);
    displayButtons(current);
    $("#reset").hide();
  });


});
