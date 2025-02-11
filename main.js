const display = document.querySelector("#display");
const buttonAddPlayer = document.createElement("button");
const inputAddPlayer = document.createElement("input");
const listAllFactions = document.createElement("div");
let allNameFactions = ["Argent","Arborec", "Barony", "Saar", "Muaat", "Hacan", "Empyrean", "Sol", "Creuss", "L1Z1X", "Mentak", "Naalu", "Nekro", "Sardakk", "NaazRokha", "Nomad", "Jol-Nar", "Cabal", "Keleres", "Winnu", "Xxcha", "Yin", "Yssaril", "Ul"];
let allNamePlayer = ["AndrewZ", "AndrewB", "Misha", "Maksim", "Roma", "Vitalik"];

function renderField(){
	buttonAddPlayer.innerHTML = "addPlayer";
	buttonAddPlayer.addEventListener("click", addPlayer)
	buttonAddPlayer.addEventListener("click", addListFactions)


	display.appendChild(inputAddPlayer);
	display.appendChild(buttonAddPlayer);

}



function addPlayer(){
	if(inputAddPlayer.value){
		if(allNamePlayer.includes(inputAddPlayer.value)){

			return 
		}
		allNamePlayer.push(inputAddPlayer.value)
		return console.log(allNamePlayer)
	}
}

function addListFactions (){
	display.appendChild(listAllFactions);
	for(let i = 0;i<=allNameFactions.length-1;i++){
		const a = document.createElement("button");
		const img = document.createElement("img");
		img.setAttribute(`src`, `${allNameFactions[i]}.png`)
		a.setAttribute(`id`, `${allNameFactions[i]}`)
		a.innerHTML = `${allNameFactions[i]}`
		display.appendChild(a)
		a.appendChild(img)
	}
}

renderField()




function render(){
	class Player {
		constructor(name,win,lose,src){
			this.name = name;
			this.win = win;
			this.lose = lose;
			this.src = src;
		}
		addLose(){
			if(this.lose>0){
				this.lose += 1;
			}else{
				this.lose = 1
			}
		}
		addWin(){
			if(this.win>0){
				this.win += 1;
			}else{
				this.win = 1
			}
		}
		getStats(){
			return console.log(`${this.name} win:${this.win} lose:${this.lose}` )
		}
	}
	class Factions {
		constructor(name,win,lose,src){
			this.name = name;
			this.win = win;;
			this.lose = lose;
			this.src = src;
		}
		addLose(){
			if(this.lose>0){
				this.lose += 1;
			}else{
				this.lose = 1
			}
		}
		addWin(){
			if(this.win>0){
				this.win += 1;
			}else{
				this.win = 1
			}
		}
		getStats(){
			return console.log(`${this.name} win:${this.win} lose:${this.lose}` )
		}
	}
	const allPlayer = [];
	const allFactions = [];
	
	function addAllObj(array, arrayName, clas){
		for(let i = 0;i<=arrayName.length-1;i++){
			const constantName = new clas(arrayName[i])
			array.push(constantName)
		}
	}
	
	addAllObj(allPlayer,allNamePlayer, Player);
	addAllObj(allFactions,allNameFactions, Factions);
	console.log(allFactions);
	console.log(allPlayer);
}