const display = document.querySelector("#display")
const menuPlayer = document.createElement("button")

function renderField(){
	menuPlayer.innerHTML = "player"
	display.appendChild(menuPlayer)
}
renderField()

class Player {
	constructor(name,win,lose){
		this.name = name;
		this.win = win;
		this.lose = lose;
	}
	addLose(){
		this.lose += 1;
	}
	addWin(){
		this.win += 1;
	}
	removeResult(){
	}
	getStats(){
		return console.log(`${this.name} win:${this.win} lose:${this.lose}` )
	}
}

class Factions {
	constructor(name,win,lose){
		this.name = name;
		this.win = win;
		this.lose = lose;
	}
	addLose(){
		this.lose += 1;
	}
	addWin(){
		this.win += 1
	}
	getStats(){
		return console.log(`${this.name} win:${this.win} lose:${this.lose}` )
	}
}


const andrewZ = new Player("Andrew",3,7)
const naalu = new Player("Naalu",1,3)
naalu.getStats();
andrewZ.getStats();


