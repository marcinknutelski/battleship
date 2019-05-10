var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}


};


var model = {
			boardSize: 6,
			numShips: 3,
			shipLength: 3,
			shipSunk: 0,

		 ships: [{locations: ["10", "20", "30"], hits: ["", "", ""]},
		   	 {locations: ["32", "33", "34"], hits: ["", "", ""]},
			 {locations: ["12", "13", "14"], hits: ["", "", ""]} ],

		fire: function(guess) {

			for(var i = 0; i<this.numShips; i++) {
				var ship = this.ships[i];
				var index = ship.locations.indexOf(guess);
				if(index >= 0) {
					ship.hits[index] = "hit";
					view.displayHit(guess);
					view.displayMessage("TRAFIONY!!!");
					if(this.isSunk(ship)) {
						view.displayMessage("Zatopiłeś mój okręt!");
						this.shipSunk++;
					}
					return true;
				}
				view.displayMiss(guess);
				view.displayMessage("Pudło piracie!");
				return false;
			}
		},

		isSunk: function(ship) {
			for (var i = 0; i < this.shipLength; i++) {
				if(ship.hits[i] !== "hit") {
					return false;
				}
				return true;
			}
		}
}; 

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = praseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipSunk === model.numShips) {
				view.displayMessage("Zatopipione wszystkie moje okrety, w " + this.guesses + " probach.");
		}
	}
}
};

function praseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F"];

	if(guess === null || guess.length !== 2) {
		alert("UPS...Podaj litere i cyfre!");
	} else {
		firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if(isNaN(row) || isNaN(column)) {
			alert("To nie są współrzędne");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Pole poza planszą!");
		} else {
			return row + column;
		}
	}
	return null;
}

controller.processGuess("A1");


