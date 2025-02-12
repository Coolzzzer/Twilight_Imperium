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
	const downloadedDataPlayer = [[3,2],[1,5],[8,9],[4,12],[2,8],[3,7]];
	const downloadedDataFactions = [[3,2],[1,5],[8,9],[4,12],[2,8],[3,7],[3,2],[1,5],[8,9],[4,12],[2,8],[3,7],[3,2],[1,5],[8,9],[4,12],[2,8],[3,7],[3,2],[1,5],[8,9],[4,12],[2,8],[3,7]];
	
	// function ajaxData() {
	// 	const temporaryTransformationFactions = JSON.stringify(downloadedDataFactions);
	// 	const temporaryTransformationPlayer = JSON.stringify(downloadedDataPlayer);
	
	// 	const temporaryTransformationObj = {}
	// 	temporaryTransformationObj[temporaryTransformationFactions] = temporaryTransformationPlayer;
	
	// 	console.log(temporaryTransformationObj)
	
	// 	let returnTransformationKeys = Object.keys(temporaryTransformationObj)
	// 	let returnTransformationValue = Object.values(temporaryTransformationObj)
	
	// 	let returnTransformationFactions = JSON.parse(returnTransformationKeys)
	// 	let returnTransformationPlayer = JSON.parse(returnTransformationValue)
	// 	console.log(returnTransformationFactions)
	// 	console.log(returnTransformationPlayer)
	// }
	// ajaxData()
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
							function aa(){
								temporaryStorageName.forEach((tempStorage, index) => {
									if (element.name in tempStorage) {
										if (temporaryStorageOperation[index] == 1) {
											element.win--;
										} else if (temporaryStorageOperation[index] == 0){
											element.lose--;
										}
										temporaryStorageName.splice(index, 1);
										temporaryStorageOperation.splice(index, 1);
										console.log(temporaryStorageName);
										console.log(index);
										return aa()
									}
								});
							}
							aa()
							
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
		constructor(name, downloadedDataWin, downloadedDataLose) {
			this.name = name;
			this.recoveryDateWin = downloadedDataWin;
			this.recoveryDateLose = downloadedDataLose;
			this.win = this.recoveryDateWin;
			this.lose = this.recoveryDateLose;
		}
	  
		addLose() {
		  this.lose += 1;
		}
	  
		addWin() {
		  this.win += 1;
		}
	  
		getStats() {
		  console.log(`${this.name} win: ${this.win} lose: ${this.lose}`);
		}
	  }
	  class Factions extends Player {
		constructor(name, downloadedDataWin, downloadedDataLose) {
		  super(name, downloadedDataWin, downloadedDataLose);
		  this.src = `https://raw.githubusercontent.com/Coolzzzer/Twilight_Imperium/refs/heads/main/${name}.png`;
		}
	  }
	  
	  function addAllObj(array, arrayName, clas, downloadedData) {
		for (let i = 0; i < arrayName.length; i++) {
			if(!downloadedData){
				const constantName = new clas(arrayName[i], 0, 0);
				const exists = array.some(item => item.name === constantName.name);
				downloadedDataPlayer.push([0,0])
				if (!exists) {
					array.push(constantName);
				}
			}else{
				const constantName = new clas(arrayName[i], downloadedData[i][0], downloadedData[i][1]);
				const exists = array.some(item => item.name === constantName.name);
				
				if (!exists) {
					array.push(constantName);
				}
			}
		}
	}
	addAllObj(allPlayer,allNamePlayer, Player,downloadedDataPlayer);
	addAllObj(allFactions,allNameFactions, Factions,downloadedDataFactions);
	renderField()	
	}	
	// function load(){
	// 	const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
	// 	let updatePassword;
	// 	const stringName = 'Zhuk_Twilight_test1';
	// 	storeInfo();
	// 	function storeInfo() {
	// 			updatePassword = Math.random();
	// 			$.ajax({
	// 					url: ajaxHandlerScript,
	// 					type: 'POST',
	// 					cache: false,
	// 					dataType: 'json',
	// 					data: { f: 'LOCKGET', n: stringName, p: updatePassword },
	// 					success: lockGetReady,
	// 					error: errorHandler
	// 			});
	// 	}
	// 	function lockGetReady(callresult) {
	// 		if (callresult.error !== undefined) {
	// 				console.log(callresult.error);
	// 		} else {

	// 			const newEntry = {key:21};

	// 			;
	// 			console.log(newEntry)
	// 			let savedData = [];
	// 			if (callresult.result !== "") {
	// 				try {
	// 					savedData = JSON.parse(callresult.result);
	// 					if (!Array.isArray(savedData)) {
	// 						savedData = []; 
	// 					}
	// 				} catch (e) {
	// 					savedData = []; 
	// 				}
	// 			}
	// 			savedData.push(newEntry);
	// 			$.ajax({
	// 				url: ajaxHandlerScript,
	// 				type: 'POST',
	// 				cache: false,
	// 				dataType: 'json',
	// 				data: { f: 'UPDATE', n: stringName, v: JSON.stringify(savedData), p: updatePassword },
	// 				success: updateReady,
	// 				error: errorHandler
	// 			});
	// 		}
	// 	}
	// 	function updateReady(callresult) {
	// 		if (callresult.error !== undefined) {
	// 			console.log(callresult.error);
	// 		} else {
	// 			restoreInfo();
	// 		}
	// 	}
	// 	function restoreInfo() {
	// 		$.ajax({
	// 			url: ajaxHandlerScript,
	// 			type: 'POST',
	// 			cache: false,
	// 			dataType: 'json',
	// 			data: { f: 'READ', n: stringName },
	// 			success: readReady,
	// 			error: errorHandler
	// 		});
	// 	}
	// 	function readReady(callresult) {
	// 		console.log("success!!")
	// 	}
	// 	function errorHandler(jqXHR, statusStr, errorStr) {
	// 		console.log(statusStr + ' ' + errorStr);
	// 	}
	// }
	// load()
render()





