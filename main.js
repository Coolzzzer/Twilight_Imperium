function render(){
	const display = document.querySelector("#display");
	const buttonAddPlayer = document.createElement("button");
	const buttonCheckPlayer = document.createElement("button");
	const buttonCheckFactions = document.createElement("button");
	const inputAddPlayer = document.createElement("input");
	const listAllFactions = document.createElement("div");
	const listAllPlayer = document.createElement("div");
	const selectionFactionsDiv = document.createElement("div");
	let width = window.innerWidth;
	let height = window.innerHeight;
	const allNameFactions = ["Arborec", "Argent", "Barony", "Saar", "Muaat", "Hacan", "Empyrean", "Sol", "Ghosts", "L1Z1X", "Mentak", "Naalu", "Nekro", "Sardakk", "NaazRokha", "Nomad", "Jol-Nar", "Cabal", "Keleres", "Winnu", "Xxcha", "Yin", "Yssaril", "Ul"];
	const allNamePlayer = ["AndreyZ", "AndreyB", "Misha", "Maksim", "Roma", "Vitalik"];
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
		selectionFactions()
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
						const buttonPlus = document.createElement('button');
						const buttonMinus = document.createElement('button');
						const buttonRecovery = document.createElement('button');
						const recoveryDate = [element.win,element.lose];
						buttonPlus.textContent = "win";
						buttonMinus.textContent = "lose";
						buttonRecovery.textContent = "recovery";
						rerenderButton()
						button.addEventListener('click', () => {
							console.log(element)
						});
						listAllPlayer.appendChild(button);
						function actionButton(){
							buttonPlus.addEventListener("click", ()=>{element.addWin();rerenderButton();showSelectionFactions();})
							buttonMinus.addEventListener("click", ()=>{element.addLose();rerenderButton();showSelectionFactions()})
							buttonRecovery.addEventListener("click", ()=>{element.win = recoveryDate[0];element.lose = recoveryDate[1];rerenderButton()});
						}
						function rerenderButton(){
							button.innerHTML = `${element.name} <br><br> Total <br> win:${element.win} lose:${element.lose}<br><br>`;
							button.appendChild(buttonPlus);
							button.appendChild(buttonMinus);
							button.appendChild(buttonRecovery);
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
					img.setAttribute("src", allFactions[i].src);
					img.setAttribute("width", `${width / 30}px`);
					img.setAttribute("height", `${width / 30}px`);
					a.setAttribute("id", factionId);
					a.appendChild(img);
					listAllFactions.appendChild(a);
					
				}
			}
		}
		function selectionFactions(){
			allFactions.forEach(allFactions=>{
				const button = document.createElement("button");
				button.textContent = allFactions.name;
				selectionFactionsDiv.appendChild(button);
			})
		}
		function showSelectionFactions(){
			display.appendChild(selectionFactionsDiv);
		}
		function hidenSelectionFactions(){
			display.removeChild(selectionFactionsDiv);
		}
	}
	
	class Player {
		constructor(name){
			this.name = name;
			this.win = 0;
			this.lose = 0;
		}
		addLose(){
			this.lose += 1;
		}
		addWin(){
			this.win += 1;
		}
		getStats(){
			return console.log(`${this.name} win:${this.win} lose:${this.lose}` )
		}
	}
	class Factions extends Player{
		constructor(name){
			super(name)
			this.src = `https://raw.githubusercontent.com/Coolzzzer/Twilight_Imperium/refs/heads/main/${name}.png`;
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