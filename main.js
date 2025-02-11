function render(){
const display = document.querySelector("#display");
const buttonAddPlayer = document.createElement("button");
const buttonCheckPlayer = document.createElement("button");
const buttonCheckFactions = document.createElement("button");
const inputAddPlayer = document.createElement("input");
const listAllFactions = document.createElement("div");
const listAllPlayer = document.createElement("div");
let width = window.innerWidth;
let height = window.innerHeight;
const allNameFactions = ["Arborec", "Argent", "Barony", "Saar", "Muaat", "Hacan", "Empyrean", "Sol", "Ghosts", "L1Z1X", "Mentak", "Naalu", "Nekro", "Sardakk", "NaazRokha", "Nomad", "Jol-Nar", "Cabal", "Keleres", "Winnu", "Xxcha", "Yin", "Yssaril", "Ul"];
const allNamePlayer = ["AndrewZ", "AndrewB", "Misha", "Maksim", "Roma", "Vitalik"];
const allPlayer = [];
const allFactions = [];
function renderField(){
	buttonAddPlayer.innerHTML = "Add player";
	buttonCheckPlayer.innerHTML = "Check player";
	buttonCheckFactions.innerHTML = "Check factions";
	buttonAddPlayer.addEventListener("click", addPlayer);
	buttonCheckPlayer.addEventListener("click", renderPlayer);
	buttonCheckFactions.addEventListener("click", renderListFactions);
	display.appendChild(buttonAddPlayer);
	display.appendChild(buttonCheckPlayer);
	display.appendChild(buttonCheckFactions);
	function addPlayer(){
		display.appendChild(inputAddPlayer);
		if(inputAddPlayer.value){
			if(allNamePlayer.includes(inputAddPlayer.value)){
				return 
			}
			allNamePlayer.push(inputAddPlayer.value);
			addAllObj(allPlayer,allNamePlayer, Player);
			return console.log(allPlayer)
		}
	}
	function renderPlayer() {
			display.appendChild(listAllPlayer);
			listAllPlayer.innerHTML = '';
				function eventButtonPlayer(elements) {
					const exists = Array.from(listAllPlayer.children).some(button => button.innerHTML === allPlayer[i].name);
					if (!exists) {
						elements.forEach(element => {
							const button = document.createElement('button');
							button.textContent = element.name;
							button.addEventListener('click', () => {
								console.log(element)
							});
							listAllPlayer.appendChild(button);
							function actionButton(){
								const buttonPlus = document.createElement('button');
								const buttonMinus = document.createElement('button');
								buttonPlus.textContent = "+";
								buttonMinus.textContent = "-";
								button.appendChild(buttonPlus);
								button.appendChild(buttonMinus);
								buttonPlus.addEventListener("click", ()=>{element.addWin()})
								buttonMinus.addEventListener("click", ()=>{element.addLose()})
								console.log(element)
							}
							actionButton()


						});
					}
				}




				
		

				eventButtonPlayer(allPlayer)
	}
	function renderListFactions() {
		display.appendChild(listAllFactions);
		for (let i = 0; i < allNameFactions.length; i++) {
			const factionId = allNameFactions[i];
			const exists = Array.from(listAllFactions.children).some(button => button.id === factionId);
			if (!exists) {
				const a = document.createElement("button");
				const img = document.createElement("img");
	
				img.setAttribute("src", `https://raw.githubusercontent.com/Coolzzzer/Twilight_Imperium/refs/heads/main/${factionId}.png`);
				img.setAttribute("width", `${width / 30}px`);
				img.setAttribute("height", `${width / 30}px`);
				a.setAttribute("id", factionId);
	
				a.appendChild(img);
				listAllFactions.appendChild(a);
			}
		}
	}

}





class Player {
	constructor(name){
		this.name = name;
		this.win = 0;
		this.lose = 0;
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
	constructor(name){
		this.name = name;
		this.win = 0;;
		this.lose = 0;
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

function addAllObj(array, arrayName, clas) {
	for (let i = 0; i < arrayName.length; i++) {
		const constantName = new clas(arrayName[i]);
		const exists = array.some(item => item.name === constantName.name);
		if (!exists) {
			array.push(constantName);
		}
	}
}
addAllObj(allPlayer,allNamePlayer, Player);
addAllObj(allFactions,allNameFactions, Factions);
renderField()


}
render()






