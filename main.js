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
	const temporaryStorageName = [];
	const temporaryStorageOperation = [];
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
			let operation;
			let playerName;
			let factionName;
			function eventButtonPlayer(elements) {
				const exists = Array.from(listAllPlayer.children).some(button => button.innerHTML === allPlayer[i].name);
				if (!exists) {
					elements.forEach(element => {
						const button = document.createElement('button');
						const buttonPlus = document.createElement('button');
						const buttonMinus = document.createElement('button');
						const buttonRecovery = document.createElement('button');
						buttonPlus.textContent = "win";
						buttonMinus.textContent = "lose";
						buttonRecovery.textContent = "recovery";
						rerenderButton()
						listAllPlayer.appendChild(button);
						function actionButton(){
							buttonPlus.addEventListener("click", ()=>{element.addWin();rerenderButton();showSelectionFactions(1,element.name);})
							buttonMinus.addEventListener("click", ()=>{element.addLose();rerenderButton();showSelectionFactions(0,element.name)})
							buttonRecovery.addEventListener("click", actionRecovery);
						}
						function rerenderButton(){
							button.innerHTML = `${element.name} <br><br> Total <br> win:${element.win} lose:${element.lose}<br><br>`;
							button.appendChild(buttonPlus);
							button.appendChild(buttonMinus);
							button.appendChild(buttonRecovery);
						}
						function actionRecovery(){
							element.win = element.recoveryDateWin;
							element.lose = element.recoveryDateLose;
							rerenderButton();

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
				const img = document.createElement('img');
				const br = document.createElement("br")
				img.setAttribute("src",allFactions.src);
				img.setAttribute("width",width/30+"px");
				img.setAttribute("height",width/30+"px")
				button.textContent = allFactions.name;
				selectionFactionsDiv.appendChild(button);
				button.appendChild(br);
				button.appendChild(img);
				button.addEventListener("click", hidenSelectionFactions);
				function hidenSelectionFactions(){
					display.removeChild(selectionFactionsDiv);
					if(operation==1){
						allFactions.addWin()
					}else if(operation==0){
						allFactions.addLose()
					}
					factionName = allFactions.name;
					temporaryStorageName.push({ [playerName]: factionName });
					temporaryStorageOperation.push(operation);
					console.log(temporaryStorageName);
					console.log(temporaryStorageOperation)
				}
			})
		}
		function showSelectionFactions(op,elem){
			display.appendChild(selectionFactionsDiv);
			operation = op;
			playerName = elem;
			return 
		}

	}
	
	class Player {
		constructor(name){
			this.name = name;
			this.recoveryDateWin = 0;
			this.recoveryDateLose = 0;
			this.win = this.recoveryDateWin;
			this.lose = this.recoveryDateLose;
 
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