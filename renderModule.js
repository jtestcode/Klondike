

export function addInitialEventListeners(clickHandlerMaster, autoFill, undoMove, resetGame){
    let emptyPileCardClassHTMLCollection = document.getElementsByClassName('emptyPileCard');

    for(let i of emptyPileCardClassHTMLCollection){
        i.addEventListener('click', clickHandlerMaster);
    }

    document.getElementById('autoFillButton').addEventListener('click', autoFill);

    document.getElementById('undoButton').addEventListener('click', undoMove);

    document.getElementById('resetButton').addEventListener('click', resetGame);
}

export function dealRandomCardsToAllPileArrays(arrayCollection){
	dealRandomCardsToArray('stockArray', 'down', 24, arrayCollection);
	dealRandomCardsToArray('tableau1Array', 'up', 1, arrayCollection);
	dealRandomCardsToArray('tableau2Array', 'down', 1, arrayCollection);
	dealRandomCardsToArray('tableau2Array', 'up', 1, arrayCollection);
	dealRandomCardsToArray('tableau3Array', 'down', 2, arrayCollection);
	dealRandomCardsToArray('tableau3Array', 'up', 1, arrayCollection);
	dealRandomCardsToArray('tableau4Array', 'down', 3, arrayCollection);
	dealRandomCardsToArray('tableau4Array', 'up', 1, arrayCollection);
	dealRandomCardsToArray('tableau5Array', 'down', 4, arrayCollection);
	dealRandomCardsToArray('tableau5Array', 'up', 1, arrayCollection);
	dealRandomCardsToArray('tableau6Array', 'down', 5, arrayCollection);
	dealRandomCardsToArray('tableau6Array', 'up', 1, arrayCollection);
	dealRandomCardsToArray('tableau7Array', 'down', 6, arrayCollection);
	dealRandomCardsToArray('tableau7Array', 'up', 1, arrayCollection);
}

export function dealRandomCardsToArray(arrayName, faceUpOrDown, numberOfCards, arrayCollection){
    for (let i=0; i<numberOfCards; i++){
		if(arrayCollection.deckArray.length>0){
			let randomIndex = Math.round(Math.random()*(arrayCollection.deckArray.length-1));
			arrayCollection.deckArray[randomIndex].face = faceUpOrDown;
        	let randomCard = arrayCollection.deckArray.splice(randomIndex, 1);
			//console.log(randomCard);
            arrayCollection[arrayName].push(...randomCard);
    	}
	}
}

export function copyReserveDeckArrayCardsToDeckArray(arrayCollection, reserveDeckArray){
	arrayCollection.deckArray.push(...reserveDeckArray);
}

export function initialRender(divId, arrayCollection, clickHandlerMaster){
    let renderDomElement = document.getElementById(divId);
    //let arrayName = renderDomElement.getAttribute('data-array-name');
    render(renderDomElement, arrayCollection, clickHandlerMaster);
}

export function initialRenderAllPileDomElements(arrayCollection, clickHandlerMaster){
	initialRender('tableau1', arrayCollection, clickHandlerMaster);
	initialRender('tableau2', arrayCollection, clickHandlerMaster);
	initialRender('tableau3', arrayCollection, clickHandlerMaster);
	initialRender('tableau4', arrayCollection, clickHandlerMaster);
	initialRender('tableau5', arrayCollection, clickHandlerMaster);
	initialRender('tableau6', arrayCollection, clickHandlerMaster);
	initialRender('tableau7', arrayCollection, clickHandlerMaster);
	initialRender('stock', arrayCollection, clickHandlerMaster);
	initialRender('waste', arrayCollection, clickHandlerMaster);
	initialRender('foundation1', arrayCollection, clickHandlerMaster);
	initialRender('foundation2', arrayCollection, clickHandlerMaster);
	initialRender('foundation3', arrayCollection, clickHandlerMaster);
	initialRender('foundation4', arrayCollection, clickHandlerMaster);
}

export function render(domParentElementToReRender, arrayCollection, clickHandlerMaster){
    let arrayName = domParentElementToReRender.getAttribute('data-array-name');
    let pileType = domParentElementToReRender.getAttribute('data-pile-type');
    	switch(pileType){
        	case 'tableau':
            	arrayCollection[arrayName].map(function(item,index){
					let cardItem = document.createElement('div');
        			cardItem.setAttribute('style', 'position:absolute; top:'+(0+(23*index))+'px; height:40px; width:40px; border:solid; border-width:1px; background-color:white; user-select:none;');
        			cardItem.setAttribute('data-pile-type', 'tableau');
        			cardItem.onclick=function(){clickHandlerMaster(event);};
    				let cardFace = document.createElement('div');
        			cardFace.innerHTML=item.rank+item.suit;
    				if(item.face === 'up'){
            			cardFace.style.color=item.color;
            			cardItem.style.backgroundColor='white';
        			}else if(item.face === 'down'){
        				cardFace.style.display='none';
        				cardItem.style.backgroundColor='lightgray';
        			}
        			domParentElementToReRender.appendChild(cardItem);
    				cardItem.appendChild(cardFace);
    		});
            break;
            case 'waste':
            	arrayCollection[arrayName].map(function(item,index){
					let cardItem = document.createElement('div');
        			cardItem.setAttribute('style', 'position:absolute; top:0px; height:40px; width:40px; border:solid; border-width:1px; background-color:white; user-select:none;');
        			cardItem.setAttribute('data-pile-type', 'waste');
        			cardItem.onclick=function(){clickHandlerMaster(event);};
    				let cardFace = document.createElement('div');
        			cardFace.innerHTML=item.rank+item.suit;
                    cardFace.style.color=item.color;
        			domParentElementToReRender.appendChild(cardItem);
    				cardItem.appendChild(cardFace);
    		});
            break;
            case 'foundation':
            	arrayCollection[arrayName].map(function(item,index){
					let cardItem = document.createElement('div');
        			cardItem.setAttribute('style', 'position:absolute; top:0px; height:40px; width:40px; border:solid; border-width:1px; background-color:white; user-select:none;');
        			cardItem.setAttribute('data-pile-type', 'foundation');
        			cardItem.onclick=function(){clickHandlerMaster(event);};
    				let cardFace = document.createElement('div');
        			cardFace.innerHTML=item.rank+item.suit;
                    cardFace.style.color=item.color;
        			domParentElementToReRender.appendChild(cardItem);
    				cardItem.appendChild(cardFace);
    		});
            break;
            case 'stock':
            	arrayCollection[arrayName].map(function(item,index){
					let cardItem = document.createElement('div');
        			cardItem.setAttribute('style', 'position:absolute; top:0px; height:40px; width:40px; border:solid; border-width:1px; background-color:white; user-select:none;');
        			cardItem.setAttribute('data-pile-type', 'stock');
        			cardItem.onclick=function(){clickHandlerMaster(event);};
    				let cardFace = document.createElement('div');
        			cardFace.innerHTML=item.rank+item.suit;
    				if(item.face === 'up'){
            			cardFace.style.color=item.color;
            			cardItem.style.backgroundColor='white';
        			}else if(item.face === 'down'){
        				cardFace.style.display='none';
        				cardItem.style.backgroundColor='lightgray';
        			}
        			domParentElementToReRender.appendChild(cardItem);
    				cardItem.appendChild(cardFace);
    		});
            break;
        } 
}

//
//
//
//

export function clearChildren(clearDomElementParent){
    let childrenNumber = clearDomElementParent.children.length;
    for(let i=childrenNumber-1; i>=1; i--){
        clearDomElementParent.removeChild(clearDomElementParent.children[i]);
    }
};

export function clearAllPileDomElementChildren(){
	clearChildren(document.getElementById('tableau1'));
	clearChildren(document.getElementById('tableau2'));
	clearChildren(document.getElementById('tableau3'));
    clearChildren(document.getElementById('tableau4'));
    clearChildren(document.getElementById('tableau5'));
    clearChildren(document.getElementById('tableau6'));
    clearChildren(document.getElementById('tableau7'));
    clearChildren(document.getElementById('foundation1'));
    clearChildren(document.getElementById('foundation2'));
    clearChildren(document.getElementById('foundation3'));
    clearChildren(document.getElementById('foundation4'));
    clearChildren(document.getElementById('stock'));
    clearChildren(document.getElementById('waste'));
}

export function addClickEventListenerToStartClock(clockSetIntervalFunction, currentTime){
	document.getElementById('gameBoard').addEventListener('click', function(){startClock(clockSetIntervalFunction, currentTime)});
}

export function startClock(clockSetIntervalFunction, currentTime){
    clockSetIntervalFunction = setInterval(function(){addOneSecond(currentTime)}, 1000);
    removeClickEventListenerToStartClock();
}

export function stopClock(clockSetIntervalFunction){
    clearInterval(clockSetIntervalFunction);
}

export function resetClock(currentTime){
	stopClock();
    currentTime = 0;
    document.getElementById('timeDisplay').innerHTML=`Time: ${currentTime}`;
    addClickEventListenerToStartClock();
}

export function addOneSecond(currentTime){
	currentTime++;
    document.getElementById('timeDisplay').innerHTML=`Time: ${currentTime}`;
}


//Actually not used in this specific app
/*
export function removeClickEventListenerToStartClock(){
	document.getElementById('gameBoard').removeEventListener('click', startClock);
}
*/


// Actually not used in this specific app
/*
export function dealRandomCard(arrayCollection){
	if(arrayCollection.deckArray.length>0){
		let randomIndex = Math.round(Math.random()*(deckArray.length-1));
        let randomCard = deckArray.splice(randomIndex, 1).toString();
		return randomCard;
    } 
}
*/


