function render(){

const display = document.querySelector("#display");
const buttonAddPlayer = document.createElement("button");
const buttonCheckPlayer = document.createElement("button");
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
	buttonAddPlayer.addEventListener("click", addPlayer);
	buttonCheckPlayer.addEventListener("click", renderPlayer);
	display.appendChild(buttonAddPlayer);
	display.appendChild(buttonCheckPlayer);
	addListFactions()
}
renderField()


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
		
		// Очищаем список перед рендерингом, если нужно
		listAllPlayer.innerHTML = '';
	
		for (let i = 0; i < allPlayer.length; i++) {
			// Проверяем, существует ли кнопка с таким именем
			const exists = Array.from(listAllPlayer.children).some(button => button.innerHTML === allPlayer[i].name);
	
			if (!exists) {
				const a = document.createElement("button");
				a.innerHTML = allPlayer[i].name;
				listAllPlayer.appendChild(a);
			}
		}
	
    
    
    // if (inputCheckPlayer.value) {
    //     if (allNamePlayer.includes(inputCheckPlayer.value)) {
    //         const index = allNamePlayer.indexOf(inputCheckPlayer.value);
    //         console.log(allPlayer[index]);
    //         return; 
    //     } else {
    //         console.log("Player not found.");
    //     }
    // }
}





function addListFactions (){
	listAllFactions.setAttribute("width", `${width/10}px`);
	listAllFactions.setAttribute("height", `${width/10}px`);
	display.appendChild(listAllFactions);
	for(let i = 0;i<=allNameFactions.length-1;i++){
		const a = document.createElement("button");
		const img = document.createElement("img");
		img.setAttribute(`src`, `https://raw.githubusercontent.com/Coolzzzer/Twilight_Imperium/refs/heads/main/${allNameFactions[i]}.png`);
		img.setAttribute("width", `${width/30}px`)
		img.setAttribute("height", `${width/30}px`)
		a.setAttribute(`id`, `${allNameFactions[i]}`)
		listAllFactions.appendChild(a)
		a.appendChild(img)
	}
}
	class Player {
		constructor(name,win,lose,src){
			this.name = name;
			this.win = win;
			this.lose = lose;
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
	console.log(allFactions);
	console.log(allPlayer);
}
render()