/**
 * @author Bogdan Cojocar
 * 
 * UserInput.js handles the input events from the user.
 * 
 * click - true if a div element has been clicked
 * divName - the corresponding div id that has been clicked
 * prevDiv = the previous div elementt that has been clicked
 * prevDivClicked - true if a previous div element has been clicked
 */

(function() {
  click = false;
  sound = false;
  divName = null;
  prevDiv = null;
  prevDivClicked = false;
  turn = Common.player.FIRST_PLAYER;
  startNextTurn = false;
  current_tower_object = null;
  tower_objects = [];
})();

function UserInput() {
  this.startNewTurn = true;
  this.player = Common.player.SECOND_PLAYER;
}
UserInput.prototype.init = function() {
};
UserInput.prototype.handleUserInput = function() {
  var self = this;
  gGameRendering.canvas.addEventListener("click", function(e) {
    self.handleOnClick(e);
  }, false);
  gGameRendering.canvas.addEventListener("mousedown", function(e) {
    if (e.button === 2 && prevDivClicked) {
      click_off();
      click = false;
      prevDiv = null;
      prevDivClicked = false;
    }
  }, false);
};
UserInput.prototype.handleOnClick = function(e) { 
  if (click) {
    var rect = gGameRendering.canvas.getBoundingClientRect();
    if (current_tower_object != null) {
      var towerObj = {};
      jQuery.extend(towerObj, current_tower_object);
      var startPos = new Vec2D(e.clientX - rect.left - 50, e.clientY - rect.top - 30);
      towerObj.init(startPos);
      tower_objects.push(towerObj);
    }
  }
};
UserInput.prototype.addTowerObjects = function(game_objects) {
  if (tower_objects.length > 0) {
    game_objects.push.apply(game_objects, tower_objects);
    tower_objects.length = 0; 
  }
  this.startNewTurn = startNextTurn;
  this.player = turn;
};
function change_div(divName, color, borderType) {
  $(divName).css("background-color", color);
  $(divName).css("border", borderType); 
}
function click_on() {
  change_div(divName, "grey", "1px solid red");
  click = true;
  prevDiv = divName;
  prevDivClicked = true; 
}
function click_off() {
  if (prevDiv != null) {
    change_div(prevDiv, "#333", "1px solid rgb(170, 170, 170)"); 
  }
}
function activate_div(name) {
  divName = name;
  if (prevDivClicked) {
    click_off();
  }
  click_on(); 
}
function click_alien1(e) {
  activate_div("#optionct1");
  current_tower_object = new FirstAlienTower();
};
function click_alien2(e) {
  activate_div("#optionct2");
  current_tower_object = new SecondAlienTower();
};
function click_alien3(e) {
  activate_div("#optionct3");
  current_tower_object = new ThirdAlienTower();
};
function click_alien4(e) {
  activate_div("#optionct4");
  current_tower_object = new FourthAlienTower();
};
function click_human1(e) {
  activate_div("#optionct5");
  current_tower_object = new FirstHumanTower();
};
function click_human2(e) {
  activate_div("#optionct6");
  current_tower_object = new SecondHumanTower();
};
function click_human3(e) {
  activate_div("#optionct7");
  current_tower_object = new ThirdHumanTower();
};
function click_human4(e) {
  activate_div("#optionct8");
  current_tower_object = new FourthHumanTower();
};
function changeTurn(e) {
  document.getElementById('new_turn').play();
  startNextTurn = true;
  if (turn === Common.player.FIRST_PLAYER) {
    turn = Common.player.SECOND_PLAYER;
    $('#aliens').css("color", "white");
    $('#humans').css("color", "green");
  } else {
    turn = Common.player.FIRST_PLAYER;
    $('#aliens').css("color", "red");
    $('#humans').css("color", "white");
  }
};
function click_sound(e) {
  if (sound === true) {
    sound = false;
    $('#sound').css("background", "linear-gradient(to bottom, #ADC2EB, #4775D1)");
  } else { 
    sound = true;
    $('#sound').css("background", "red");
  }
 
  document.getElementById('background_music').muted = sound;
  document.getElementById('new_turn').muted = sound;
};

var gUserInput = new UserInput();
