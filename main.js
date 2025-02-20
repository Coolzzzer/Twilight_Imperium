let arrayData = [];
const allPlayer = [];
const allFactions = [];
const buttonModify = document.createElement("button");
function render(){
	const display = document.querySelector("#display");
	// const buttonAddPlayer = document.createElement("button");
	const buttonCheckPlayer = document.createElement("button");
	const buttonCheckFactions = document.createElement("button");
	const buttonUpdateStatisticsFaction = document.createElement("button");
	const buttonCreateTirList = document.createElement("button");
	// const inputAddPlayer = document.createElement("input");
	const listAllFactions = document.createElement("div");
	const listAllPlayer = document.createElement("div");
	const selectionFactionsDiv = document.createElement("div");
	const divFaction = document.createElement("div");
	const divTirList = document.createElement("div");
	let width = window.innerWidth;
	let height = window.innerHeight;
	const allNameFactions = ["Arborec", "Argent", "Barony", "Saar", "Muaat", "Hacan", "Empyrean", "Sol", "Ghosts", "L1Z1X", "Mentak", "Naalu", "Nekro", "Sardakk", "NaazRokha", "Nomad", "Jol-Nar", "Cabal", "Keleres", "Winnu", "Xxcha", "Yin", "Yssaril", "Ul"];
	const allNamePlayer = ["AndreyZ", "AndreyB", "Misha", "Maksim", "Roma", "Vitalik"];
	const temporaryStorageName = [];
	const temporaryStorageOperation = [];
	function renderField(){
		// buttonAddPlayer.innerHTML = "Add player";
		buttonCheckPlayer.innerHTML = "Check player";
		buttonCheckFactions.innerHTML = "Check factions";
		buttonModify.innerHTML = "Load data";
		buttonCreateTirList.innerHTML = "Tir list"
		buttonUpdateStatisticsFaction.innerHTML = "Update statistics";
		// buttonAddPlayer.addEventListener("click", addPlayer);
		buttonCheckPlayer.addEventListener("click", renderPlayer);
		buttonCheckFactions.addEventListener("click", renderListFactions);
		// display.appendChild(buttonAddPlayer);
		display.appendChild(buttonCheckPlayer);
		display.appendChild(buttonCheckFactions);
		display.appendChild(buttonModify);
		selectionFactions()
		// function addPlayer(){
		// 	display.appendChild(inputAddPlayer);
		// 	if(inputAddPlayer.value){
		// 		if(allNamePlayer.includes(inputAddPlayer.value)){
		// 			return 
		// 		}
		// 		allNamePlayer.push(inputAddPlayer.value);
		// 		addAllObj(allPlayer,allNamePlayer, Player);
		// 		return console.log(allPlayer)
		// 	}
		// }
		function renderPlayer() {
			display.appendChild(listAllPlayer);
			if (display.contains(listAllFactions)){
				display.removeChild(divFaction);
			}
			listAllPlayer.innerHTML = '';
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
							buttonPlus.addEventListener("click", ()=>{element.addWin();rerenderButton();showSelectionFactions(1,element.name);display.removeChild(listAllPlayer);})
							buttonMinus.addEventListener("click", ()=>{element.addLose();rerenderButton();showSelectionFactions(0,element.name);display.removeChild(listAllPlayer);})
							buttonRecovery.addEventListener("click", actionRecovery);
						}
						function rerenderButton(){
							button.innerHTML = `${element.name} <br><br> Total <br> win:${element.win} lose:${element.lose}<br><br>`;
							button.appendChild(buttonPlus);
							button.appendChild(buttonMinus);
							button.appendChild(buttonRecovery);
						}
						function actionRecovery(){
							if(element.win != element.recoveryDateWin){
								element.win--
							} else if(element.lose != element.recoveryDateLose){
								element.lose--
							}else{
								return rerenderButton()
							}
							temporaryStorageName.forEach((el,index) => {
								allFactions.forEach(e=>{
									if(e.name == el[element.name]){
										if(temporaryStorageOperation[index]==1){
											e.win--
										}else if(temporaryStorageOperation[index]==0){
											e.lose--
										}
										temporaryStorageOperation.splice(index,1);
										temporaryStorageName.splice(index,1)
										index--
									}
								})
							})	
							return actionRecovery()			
						}
						actionButton()
					});
				}
			}
			eventButtonPlayer(allPlayer)
		}
		function renderListFactions() {
			display.appendChild(divFaction)
			if(display.contains(listAllPlayer)){
				display.removeChild(listAllPlayer)
			}
			divFaction.appendChild(listAllFactions);
			divFaction.appendChild(divTirList)
			allNameFactions.forEach((factionId, index) => {
				const statisticsFaction = document.createElement("div");
				const exists = Array.from(listAllFactions.children).some(button => button.id === factionId);
				buttonUpdateStatisticsFaction.addEventListener("click", updateStatisticsFaction);
				buttonCreateTirList.addEventListener("click", createTirList);
				function updateStatisticsFaction(){
					statisticsFaction.innerHTML = `win:${allFactions[index].win} lose:${allFactions[index].lose}`;
				}
				function createTirList(){
					let placeTirList = [["Tir list: "],[],[],[],[],[],[]]
					allFactions.forEach((element,index)=>{
						if((element.win == 0)&&(element.lose == 0)){
							placeTirList[5].push(`<img src = ${element.src} width = ${width/20}px height = ${width/20}px>`)
						}else if(element.win == 0){
							placeTirList[4].push(`<img src = ${element.src} width = ${width/20}px height = ${width/20}px>`)
						}else if(element.lose == 0){
							placeTirList[1].push(`<img src = ${element.src} width = ${width/20}px height = ${width/20}px>`)
						}else if(element.win/element.lose >= 0.5){
							placeTirList[1].push(`<img src = ${element.src} width = ${width/20}px height = ${width/20}px>`)
						}else if(element.win/element.lose >= 0.25){
							placeTirList[2].push(`<img src = ${element.src} width = ${width/20}px height = ${width/20}px>`)
						}else if(element.win/element.lose <= 0.1){
							placeTirList[3].push(`<img src = ${element.src} width = ${width/20}px height = ${width/20}px>`)
						}
					})
					divTirList.innerHTML = `
					${placeTirList[0]}<br>
					S: ${placeTirList[1]}<br>
					A: ${placeTirList[2]}<br>
					B: ${placeTirList[3]}<br>
					C: ${placeTirList[4]}<br>
					Other factions: ${placeTirList[5]}<br>
					`
				}
				if (!exists) {
					const a = document.createElement("button");
					const img = document.createElement("img");
					img.setAttribute("src", allFactions[index].src);
					img.setAttribute("width", `${width / 30}px`);
					img.setAttribute("height", `${width / 30}px`);
					a.setAttribute("id", factionId);
					a.appendChild(img);
					listAllFactions.appendChild(a);
					a.appendChild(statisticsFaction);
					updateStatisticsFaction();
				}
			});
			divFaction.appendChild(buttonUpdateStatisticsFaction);
			divFaction.appendChild(buttonCreateTirList);
		}
		function selectionFactions(){
			allFactions.forEach(allFactions=>{
				const button = document.createElement("button");
				const img = document.createElement('img');
				const br = document.createElement("br");
				img.setAttribute("src",allFactions.src);
				img.setAttribute("width",width/30+"px");
				img.setAttribute("height",width/30+"px");
				button.textContent = allFactions.name;
				selectionFactionsDiv.appendChild(button);
				button.appendChild(br);
				button.appendChild(img);
				button.addEventListener("click", hidenSelectionFactions);
				function hidenSelectionFactions(){
					display.appendChild(listAllPlayer);
					display.removeChild(selectionFactionsDiv);
					if(operation==1){
						allFactions.addWin()
					}else if(operation==0){
						allFactions.addLose()
					}
					factionName = allFactions.name;
					temporaryStorageName.push({ [playerName]: factionName });
					temporaryStorageOperation.push(operation);
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
				arrayData[0].push([0,0])
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
	setTimeout(() => {
		addAllObj(allPlayer,allNamePlayer, Player,arrayData[0]);
		addAllObj(allFactions,allNameFactions, Factions,arrayData[1]);
		renderField();
	}, 2);

	}	
function ajax(){
	const urlLoad = 'https://fe.it-academy.by/AjaxStringStorage2.php';
	const urlModify = 'https://fe.it-academy.by/AjaxStringStorage2.php';
	const stringName = 'Zhuk_Twilight_test0058';
	buttonModify.addEventListener("click", modifyArray)
	

	function loadArray() {
			$.ajax({
					url: urlLoad,
					type: 'POST',
					data: {
							f: 'READ',
							n: stringName
					},
					success: function(response) {
							console.log('Ответ сервера:', response);
							try {
									if (response.result) {
											arrayData = JSON.parse(response.result);
											console.log("Результат:", arrayData);
											render()
									} else {
											arrayData = [[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]]
											console.error('Ответ не содержит данных.');	
											render()									
									}
							} catch (e) {
									console.error('Ошибка при разборе JSON:', e);
							}
					},
					error: function(xhr, status, error) {
							console.error('Ошибка при загрузке массива:', error);
					}
			});
	}
	function modifyArray() {
			if (arrayData.length >= 0) {
				function createNewArrayData(all) {
					let h = [];
					all.forEach((item, index) => {
							h.push([item.win,item.lose]);
					});
					return h;
				}	
				arrayData = [createNewArrayData(allPlayer),createNewArrayData(allFactions)]; 
				$.ajax({
					url: urlModify,
					type: 'POST',
					data: {
						f: 'LOCKGET',
						n: stringName,
						p: 'PASSWORD'
					},
					success: function() {
						$.ajax({
							url: urlModify,
							type: 'POST',
							data: {
								f: 'UPDATE',
								n: stringName,
								v: JSON.stringify(arrayData),
								p: 'PASSWORD'
							},
							success: function(response) {
								console.log('Массив изменен и сохранен:', arrayData);
							},
							error: function(xhr, status, error) {
								console.error('Ошибка при сохранении измененного массива:', error);
							}
						});
					},
					error: function(xhr, status, error) {
						console.error('Ошибка при блокировке данных:', error);
					}
				});
			} else {
					console.error('Массив пуст. Сначала загрузите массив.');
			}
	}
	
	loadArray();
	}
ajax()

