const downloadedDataPlayer = [[3,2],[1,5],[8,9],[4,12],[2,8],[3,7]];
const downloadedDataFactions = [[3,2],[1,5],[8,9],[4,12],[2,8],[3,7],[3,2],[1,5],[8,9],[4,12],[2,8],[3,7],[3,2],[1,5],[8,9],[4,12],[2,8],[3,7],[3,2],[1,5],[8,9],[4,12],[2,8],[3,7]];
const allPlayer = [];
const allFactions = [];
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
							function addResult(){
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
										return addResult()
									}
								});
							}
							addResult()
							
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
	function ajax(){
		const urlLoad = 'https://fe.it-academy.by/AjaxStringStorage2.php';
		const urlModify = 'https://fe.it-academy.by/AjaxStringStorage2.php';
		const stringName = 'Zhuk_Twilight_test00567';
		let arrayData = [];
		
		$(document).ready(function() {
				console.log("jQuery загружен и готов."); // Отладочное сообщение
				$('#loadButton').on('click', function() {
						loadArray();
				});
		
				$('#modifyButton').on('click', function() {
						modifyArray();
				});
		});
		
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
												displayData(arrayData);
												console.log('Массив загружен:', arrayData);
										} else {
												console.error('Ответ не содержит данных.');
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
					if(arrayData.length==0){
						arrayData.push(downloadedDataFactions,downloadedDataPlayer)
					}else{




					//////////////
						function cr(all){
							let h = [];
							for(let i;i>=all.length;i++){
								h.push(all.win, all.lose)
								console.log(h)
							}
							return h
						}
						arrayData = [cr(allFactions),cr(allPlayer)]; 
						console.log(12)
						////////////







					}
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
														displayData(arrayData);
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
		
		function displayData(data) {
				const dataContainer = $('#dataContainer');
				dataContainer.empty(); // Очистка контейнера перед загрузкой новых данных
		
				const div = $('<div></div>').text(JSON.stringify(data));
				dataContainer.append(div);
		}
		
		}
	ajax()
render()


