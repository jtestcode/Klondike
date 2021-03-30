/*
import * as renderModule from './renderModule.js';

renderModule.addEventListeners();
*/

//test for updating github

//let stackClassHTMLCollection = document.getElementsByClassName('stack');
let emptyPileCardClassHTMLCollection = document.getElementsByClassName('emptyPileCard');

/*
for(let i of stackClassHTMLCollection){
    i.addEventListener('click', clickHandlerMaster);
    console.log(i);
}
*/

for(let i of emptyPileCardClassHTMLCollection){
    i.addEventListener('click', clickHandlerMaster);
}

document.getElementById('autoFillButton').addEventListener('click', autoFill);

document.getElementById('undoButton').addEventListener('click', undoMove);

document.getElementById('resetButton').addEventListener('click', resetGame);





/*
function dealRandomCard(arrayName){
	if(deckArray.length>0){
		let randomIndex = Math.round(Math.random()*(deckArray.length-1));
        let randomCard = deckArray.splice(randomIndex, 1).toString();
		//console.log(randomCard);
    } 
}
*/



let recordArray = [];

let gameOver = false;

let reserveDeckArray = [
	{suit:'♠', rank:'A', color:'black', image:''},
   	{suit:'♠', rank:'2', color:'black', image:''},
   	{suit:'♠', rank:'3', color:'black', image:''},
   	{suit:'♠', rank:'4', color:'black', image:''},
   	{suit:'♠', rank:'5', color:'black', image:''},
   	{suit:'♠', rank:'6', color:'black', image:''},
   	{suit:'♠', rank:'7', color:'black', image:''},
   	{suit:'♠', rank:'8', color:'black', image:''},
   	{suit:'♠', rank:'9', color:'black', image:''},
   	{suit:'♠', rank:'10', color:'black', image:''},
   	{suit:'♠', rank:'J', color:'black', image:''},
   	{suit:'♠', rank:'Q', color:'black', image:''},
   	{suit:'♠', rank:'K', color:'black', image:''},
	{suit:'♥', rank:'A', color:'red', image:''},
   	{suit:'♥', rank:'2', color:'red', image:''},
   	{suit:'♥', rank:'3', color:'red', image:''},
   	{suit:'♥', rank:'4', color:'red', image:''},
   	{suit:'♥', rank:'5', color:'red', image:''},
   	{suit:'♥', rank:'6', color:'red', image:''},
   	{suit:'♥', rank:'7', color:'red', image:''},
   	{suit:'♥', rank:'8', color:'red', image:''},
   	{suit:'♥', rank:'9', color:'red', image:''},
   	{suit:'♥', rank:'10', color:'red', image:''},
   	{suit:'♥', rank:'J', color:'red', image:''},
   	{suit:'♥', rank:'Q', color:'red', image:''},
   	{suit:'♥', rank:'K', color:'red', image:''},
	{suit:'♣', rank:'A', color:'black', image:''},
    {suit:'♣', rank:'2', color:'black', image:''},
    {suit:'♣', rank:'3', color:'black', image:''},
    {suit:'♣', rank:'4', color:'black', image:''},
    {suit:'♣', rank:'5', color:'black', image:''},
    {suit:'♣', rank:'6', color:'black', image:''},
    {suit:'♣', rank:'7', color:'black', image:''},
   	{suit:'♣', rank:'8', color:'black', image:''},
    {suit:'♣', rank:'9', color:'black', image:''},
    {suit:'♣', rank:'10', color:'black', image:''},
    {suit:'♣', rank:'J', color:'black', image:''},
    {suit:'♣', rank:'Q', color:'black', image:''},
    {suit:'♣', rank:'K', color:'black', image:''},
	{suit:'♦', rank:'A', color:'red', image:''},
    {suit:'♦', rank:'2', color:'red', image:''},
    {suit:'♦', rank:'3', color:'red', image:''},
    {suit:'♦', rank:'4', color:'red', image:''},
    {suit:'♦', rank:'5', color:'red', image:''},
    {suit:'♦', rank:'6', color:'red', image:''},
    {suit:'♦', rank:'7', color:'red', image:''},
    {suit:'♦', rank:'8', color:'red', image:''},
    {suit:'♦', rank:'9', color:'red', image:''},
    {suit:'♦', rank:'10', color:'red', image:''},
    {suit:'♦', rank:'J', color:'red', image:''},
    {suit:'♦', rank:'Q', color:'red', image:''},
    {suit:'♦', rank:'K', color:'red', image:''},
];



let arrayCollection = {
	tableau1Array: [],
	tableau2Array: [],
	tableau3Array: [],
	tableau4Array: [],
	tableau5Array: [],
	tableau6Array: [],
	tableau7Array: [],
    wasteArray: [],
    foundation1Array: [],
    foundation2Array: [],
    foundation3Array: [],
    foundation4Array: [],
    stockArray: [],
    emptyPileCardArray: [
    	{suit:'', rank:'', color:'', face:'up'}
    ], 
    discardArray: [],
	deckArray: [],
};



function resetAllPileArrays(){
	arrayCollection.tableau1Array = [];
    arrayCollection.tableau2Array = [];
    arrayCollection.tableau3Array = [];
    arrayCollection.tableau4Array = [];
    arrayCollection.tableau5Array = [];
    arrayCollection.tableau6Array = [];
    arrayCollection.tableau7Array = [];
    arrayCollection.foundation1Array = [];
    arrayCollection.foundation2Array = [];
    arrayCollection.foundation3Array = [];
    arrayCollection.foundation4Array = [];
    arrayCollection.stockArray = [];
    arrayCollection.wasteArray = [];
    arrayCollection.deckArray = [];
}


function copyReserveDeckArrayCardsToDeckArray(){
	arrayCollection.deckArray.push(...reserveDeckArray);
}

function resetGame(){
	resetAllPileArrays();
    //console.log(arrayCollection);
    copyReserveDeckArrayCardsToDeckArray();
    dealRandomCardsToAllPileArrays();
    //console.log(arrayCollection);
    clearAllPileDomElementChildren();
    initialRenderAllPileDomElements();
    resetScore();
    updateScore();
    resetClock();
    resetRecordArray();
    updateRecord();
		hideAutoFillButton();
		gameOver = false;
}

function deleteRecord(){

	recordArray.splice(recordArray.length-1);

}


function undoMove(){
	//console.log('record array length:',recordArray.length);
	if(gameOver === false){
	
		if(recordArray.length>1){
    	
    	currentScore = recordArray[recordArray.length-2].currentScore;
    	arrayCollection = deepCopyArrayOrObject(recordArray[recordArray.length-2].currentArrayCollection);
      updateScore();
    	deleteRecord();
        //console.log('updated record array:', recordArray);
    	//
      clearAllPileDomElementChildren();
    	initialRenderAllPileDomElements();
    }
		
		if(areFoundationsComplete()){
			showAutoFillButton();
		}else{
			hideAutoFillButton();
		}
		
	}
}


/*
let arrayCollection = {
	tableau1Array: [
    	{suit:'♥', rank:'J', color:'red', face:'down'},
        {suit:'♦', rank:'8', color:'red', face:'down'},
        {suit:'♣', rank:'9', color:'black', face:'down'}
    ],
	tableau2Array: [
    	{suit:'♥', rank:'A', color:'red', face:'up'}
        ],
	tableau3Array: [
    	{suit:'♣', rank:'Q', color:'black', face:'down'},
        {suit:'♥', rank:'K', color:'red', face:'up'}
        ],
	tableau4Array: [
    	{suit:'♦', rank:'10', color:'red', face:'up'},
        {suit:'♠', rank:'9', color:'black', face:'up'},
        {suit:'♥', rank:'8', color:'red', face:'up'}
        ],
	tableau5Array: [
    	{suit:'♦', rank:'10', color:'red', face:'up'},
        ],
	tableau6Array: [
    	{suit:'♠', rank:'10', color:'black', face:'up'},
        {suit:'♥', rank:'9', color:'red', face:'up'},
        {suit:'♠', rank:'8', color:'black', face:'up'}
        ],
	tableau7Array: [
        ],
    wasteArray: [
        {suit:'♠', rank:'K', color:'black', face:'up'},
        {suit:'♠', rank:'A', color:'black', face:'up'},
    	],
    foundation1Array: [
    	],
    foundation2Array: [
    	{suit:'♠', rank:'9', color:'black', face:'up'},
    	],
    foundation3Array: [
    	{suit:'♠', rank:'5', color:'black', face:'up'},
        {suit:'♠', rank:'6', color:'black', face:'up'},
        {suit:'♠', rank:'7', color:'black', face:'up'},
    	],
    foundation4Array: [
    	],
    stockArray: [
    	{suit:'♠', rank:'5', color:'black', face:'down'},
        {suit:'♠', rank:'6', color:'black', face:'down'},
        {suit:'♠', rank:'7', color:'black', face:'down'},
    ],
    emptyPileCardArray: [
      {suit:'', rank:'', color:'', face:'up'}
    ], 
    discardArray: [],
    deckArray: [
		{suit:'♠', rank:'A', color:'black', image:''},
    	{suit:'♠', rank:'2', color:'black', image:''},
    	{suit:'♠', rank:'3', color:'black', image:''},
    	{suit:'♠', rank:'4', color:'black', image:''},
    	{suit:'♠', rank:'5', color:'black', image:''},
    	{suit:'♠', rank:'6', color:'black', image:''},
    	{suit:'♠', rank:'7', color:'black', image:''},
    	{suit:'♠', rank:'8', color:'black', image:''},
    	{suit:'♠', rank:'9', color:'black', image:''},
    	{suit:'♠', rank:'10', color:'black', image:''},
    	{suit:'♠', rank:'J', color:'black', image:''},
    	{suit:'♠', rank:'Q', color:'black', image:''},
    	{suit:'♠', rank:'K', color:'black', image:''},
		{suit:'♥', rank:'A', color:'red', image:''},
    	{suit:'♥', rank:'2', color:'red', image:''},
    	{suit:'♥', rank:'3', color:'red', image:''},
    	{suit:'♥', rank:'4', color:'red', image:''},
    	{suit:'♥', rank:'5', color:'red', image:''},
    	{suit:'♥', rank:'6', color:'red', image:''},
    	{suit:'♥', rank:'7', color:'red', image:''},
    	{suit:'♥', rank:'8', color:'red', image:''},
    	{suit:'♥', rank:'9', color:'red', image:''},
    	{suit:'♥', rank:'10', color:'red', image:''},
    	{suit:'♥', rank:'J', color:'red', image:''},
    	{suit:'♥', rank:'Q', color:'red', image:''},
    	{suit:'♥', rank:'K', color:'red', image:''},
		{suit:'♣', rank:'A', color:'black', image:''},
    	{suit:'♣', rank:'2', color:'black', image:''},
    	{suit:'♣', rank:'3', color:'black', image:''},
    	{suit:'♣', rank:'4', color:'black', image:''},
    	{suit:'♣', rank:'5', color:'black', image:''},
    	{suit:'♣', rank:'6', color:'black', image:''},
    	{suit:'♣', rank:'7', color:'black', image:''},
   	 	{suit:'♣', rank:'8', color:'black', image:''},
    	{suit:'♣', rank:'9', color:'black', image:''},
    	{suit:'♣', rank:'10', color:'black', image:''},
    	{suit:'♣', rank:'J', color:'black', image:''},
    	{suit:'♣', rank:'Q', color:'black', image:''},
    	{suit:'♣', rank:'K', color:'black', image:''},
		{suit:'♦', rank:'A', color:'red', image:''},
    	{suit:'♦', rank:'2', color:'red', image:''},
    	{suit:'♦', rank:'3', color:'red', image:''},
    	{suit:'♦', rank:'4', color:'red', image:''},
    	{suit:'♦', rank:'5', color:'red', image:''},
    	{suit:'♦', rank:'6', color:'red', image:''},
    	{suit:'♦', rank:'7', color:'red', image:''},
    	{suit:'♦', rank:'8', color:'red', image:''},
    	{suit:'♦', rank:'9', color:'red', image:''},
    	{suit:'♦', rank:'10', color:'red', image:''},
    	{suit:'♦', rank:'J', color:'red', image:''},
    	{suit:'♦', rank:'Q', color:'red', image:''},
    	{suit:'♦', rank:'K', color:'red', image:''},
	],
};
*/


let wereCardsTransferred;

let wasTableauCardFlippedUp;

let transferCardSourcePileType;

let transferCardDestinationPileType;

let currentTime = 0;

let currentScore = 0;

let rankOrderArray = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];


let clickedCardDomElement;

let selectedCard1DomElement;

let clickedCardArray;

let selectedCard1Array;

let clickedCardPileType;

let selectedCard1PileType;

let clickedCardIndex;

let selectedCard1Index;



function dealRandomCardsToAllPileArrays(){
	dealRandomCardsToArray('stockArray', 'down', 24);
	dealRandomCardsToArray('tableau1Array', 'up', 1);
	dealRandomCardsToArray('tableau2Array', 'down', 1);
	dealRandomCardsToArray('tableau2Array', 'up', 1);
	dealRandomCardsToArray('tableau3Array', 'down', 2);
	dealRandomCardsToArray('tableau3Array', 'up', 1);
	dealRandomCardsToArray('tableau4Array', 'down', 3);
	dealRandomCardsToArray('tableau4Array', 'up', 1);
	dealRandomCardsToArray('tableau5Array', 'down', 4);
	dealRandomCardsToArray('tableau5Array', 'up', 1);
	dealRandomCardsToArray('tableau6Array', 'down', 5);
	dealRandomCardsToArray('tableau6Array', 'up', 1);
	dealRandomCardsToArray('tableau7Array', 'down', 6);
	dealRandomCardsToArray('tableau7Array', 'up', 1);
}


copyReserveDeckArrayCardsToDeckArray();

dealRandomCardsToAllPileArrays();

//console.log('!!!!!!!!!!!!!!! recordArray:', recordArray);

updateRecord();

//console.log('!!!!!!!!!!!!!!! recordArray:', recordArray);



function dealRandomCardsToArray(arrayName, faceUpOrDown, numberOfCards){
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

//console.log(arrayCollection);

function dealRandomCard(){
	if(arrayCollection.deckArray.length>0){
		let randomIndex = Math.round(Math.random()*(deckArray.length-1));
        let randomCard = deckArray.splice(randomIndex, 1).toString();
		return randomCard;
    } 
}


function initialRender(divId){
    let renderDomElement = document.getElementById(divId);
    let arrayName = renderDomElement.getAttribute('data-array-name');
    render(renderDomElement, arrayName);
}

/*
function reRender(event){
	let targetDomObject = event.currentTarget;
    let targetDomObjectParent = targetDomObject.parentElement;
    let arrayName = targetDomObjectParent.id + 'Array';
    console.log('currentTargetId:', event.currentTarget);
    console.log('targetDomObject:', targetDomObject);
    clearChildren(targetDomObjectParent);
    
    // transferring the cards in the current array to the discard array, and rendering the discard array
    
    let cardToDiscard = [];
    console.log('card to discard PRE:', cardToDiscard);
    cardToDiscard = arrayCollection[arrayName].splice(0);
    arrayCollection.discardArray.push(...cardToDiscard);
    console.log('card to discard:', cardToDiscard);
    console.log('current array after discard:', arrayCollection[arrayName]);
    console.log('discard array:', arrayCollection.discardArray);
    
    clearChildren(document.getElementById('discard'));
    
    arrayCollection.discardArray.map(function(item, index){
		let cardItem = document.createElement('div');
        cardItem.setAttribute('style', 'position:absolute; top:'+(0+(23*index))+'px; height:40px; width:40px; border:solid; border-width:1px; background-color:white; user-select:none;');
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
        document.getElementById('discard').appendChild(cardItem);
    	cardItem.appendChild(cardFace);
	});
    
    //
    
	// simulating a new array to load (with just one card, A♦)
    arrayCollection[arrayName] = [
    	{suit:'♦', rank:'A', color:'red', image:''}
    ];
    //
    
    render(targetDomObjectParent, arrayName);
}


function clearChildren(targetDomObjectParent){
    console.log('targetDomObjectParent Children:', targetDomObjectParent.children.length);
    let childrenNumber = targetDomObjectParent.children.length;
    for(let i=childrenNumber-1; i>=0; i--){
    	console.log(targetDomObjectParent.children[i]);
        targetDomObjectParent.removeChild(targetDomObjectParent.children[i]);
    }
};
*/


function reRender(domElement){
	//let reRenderDomObject = event.currentTarget;
    let domElementParent = domElement.parentElement;
    //let arrayName = reRenderDomObjectParent.getAttribute('data-array-name');
    clearChildren(domElementParent);
    render(domElementParent);
}


function clearChildren(clearDomElementParent){
    //console.log('targetDomObjectParent Children:', clearDomElementParent.children.length);
    let childrenNumber = clearDomElementParent.children.length;
    for(let i=childrenNumber-1; i>=1; i--){
    	//console.log('targetDomObjectChild to clear:', clearDomElementParent.children[i]);
        clearDomElementParent.removeChild(clearDomElementParent.children[i]);
    }
};

function clearAllPileDomElementChildren(){
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



function render(domParentElementToReRender/*, arrayName*/){
    let arrayName = domParentElementToReRender.getAttribute('data-array-name');
    let pileType = domParentElementToReRender.getAttribute('data-pile-type');
    	switch(pileType){
        	case 'tableau':
            	arrayCollection[arrayName].map(function(item,index){
					let cardItem = document.createElement('div');
    				//let cardFace = document.createElement('div');
    				//cardFace.innerHTML=item.rank+item.suit;
    				//cardFace.setAttribute('style', 'color:'+item.color);
        
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
    				//let cardFace = document.createElement('div');
    				//cardFace.innerHTML=item.rank+item.suit;
    				//cardFace.setAttribute('style', 'color:'+item.color);
        
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
    				//let cardFace = document.createElement('div');
    				//cardFace.innerHTML=item.rank+item.suit;
    				//cardFace.setAttribute('style', 'color:'+item.color);
        			
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
            	//console.log('entered render case stock');
                //console.log('array name:', arrayName);
                //console.log('pile type:', pileType);
                //console.log('the stock array:', arrayCollection[arrayName]);
            	arrayCollection[arrayName].map(function(item,index){
					let cardItem = document.createElement('div');
    				//let cardFace = document.createElement('div');
    				//cardFace.innerHTML=item.rank+item.suit;
    				//cardFace.setAttribute('style', 'color:'+item.color);
        
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
            
           	//console.log('rendered successfully:', reRenderDomElementParent); 
        
        }

 /*
    let arrayToRender = arrayCollection[arrayName];
    console.log('arrayName:', arrayName);
    console.log('arrayToRender:', arrayToRender);
	arrayToRender.map(function(item, index){
		let cardItem = document.createElement('div');
    	//let cardFace = document.createElement('div');
    	//cardFace.innerHTML=item.rank+item.suit;
    	//cardFace.setAttribute('style', 'color:'+item.color);
        
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
        
        domObjectToRender.appendChild(cardItem);
    	cardItem.appendChild(cardFace);
        console.log('rendered successfully:', domObjectToRender);
	});
*/
    
}




/*
function render(containerDivName){
	let targetArrayName = containerDivName + 'Array';
    let targetArray = arrayCollection[targetArrayName];
	targetArray.map(function(item){
		let cardItem = document.createElement('div');
    	let cardFace = document.createElement('div');
    	cardFace.innerHTML=item.rank+item.suit;
    	cardFace.setAttribute('style', 'color:'+item.color);
    	cardItem.setAttribute('style', 'display:inline-flex; justify-content:center; align-items:center; margin:5px; height:40px; width:40px; border:solid; border-width:1px; background-color:transparent; user-select:none;');
    	cardItem.onclick=function(){clickHandler(event);};
    	document.getElementById(containerDivName).appendChild(cardItem);
    	cardItem.appendChild(cardFace);
	});
    
}

*/

function initialRenderAllPileDomElements(){
	initialRender('tableau1');
	initialRender('tableau2');
	initialRender('tableau3');
	initialRender('tableau4');
	initialRender('tableau5');
	initialRender('tableau6');
	initialRender('tableau7');
	initialRender('stock');
	initialRender('waste');
	initialRender('foundation1');
	initialRender('foundation2');
	initialRender('foundation3');
	initialRender('foundation4');
}

initialRenderAllPileDomElements();



let clockSetIntervalFunction;

addClickEventListenerToStartClock();

function addClickEventListenerToStartClock(){
	document.getElementById('gameBoard').addEventListener('click', startClock);
}


function startClock(){
    clockSetIntervalFunction = setInterval(addOneSecond, 1000);
    removeClickEventListenerToStartClock();
}

function stopClock(){
    clearInterval(clockSetIntervalFunction);
}

function resetClock(){
	stopClock();
    currentTime = 0;
    document.getElementById('timeDisplay').innerHTML=`Time: ${currentTime}`;
    addClickEventListenerToStartClock();
}

function removeClickEventListenerToStartClock(){
	document.getElementById('gameBoard').removeEventListener('click', startClock);
}

function addOneSecond(){
	currentTime++;
    document.getElementById('timeDisplay').innerHTML=`Time: ${currentTime}`;
}







////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////




function isCard1Selected(){
	if(selectedCard1DomElement === undefined){
    	//console.log('card 1 isnt selected');
        return false;
    }else{
    	//console.log('card 1 is selected');
    	return true;
    }
}


function didClickOnSameCard1(){
	if(selectedCard1DomElement===event.currentTarget){
    	return true;
    }else{
    	return false;
    }
}



function clearSelectedCard1(){
	if(isCard1Selected()){
    	//console.log('****************** selected card 1 cleared');
		selectedCard1DomElement = undefined;
		selectedCard1Array = undefined;
        selectedCard1Index = undefined;
		selectedCard1PileType = undefined;
    }
}


function selectNewCard1(){
	selectedCard1DomElement = clickedCardDomElement;
	//selectedCard1DomElement.style.backgroundColor='lightgray';
    selectedCard1Array = clickedCardArray;
    selectedCard1Index = clickedCardIndex;
    selectedCard1PileType = clickedCardPileType;
}



function isCard1RankOneBelowClickedCard(){
	let card1Rank = arrayCollection[selectedCard1Array][selectedCard1Index].rank;
    let card2Rank = arrayCollection[clickedCardArray][clickedCardIndex].rank;
    
    let card1RankArrayIndex = rankOrderArray.findIndex(function(item){
    	return item === card1Rank;
    });
    let card2RankArrayIndex = rankOrderArray.findIndex(function(item){
    	return item === card2Rank;
    });
    
    if(card2RankArrayIndex - card1RankArrayIndex === 1){
    	return true;
    }else{
    	return false;
    }
}

function isCard1RankOneAboveClickedCard(){
	let card1Rank = arrayCollection[selectedCard1Array][selectedCard1Index].rank;
    let card2Rank = arrayCollection[clickedCardArray][clickedCardIndex].rank;
    
    let card1RankArrayIndex = rankOrderArray.findIndex(function(item){
    	return item === card1Rank;
    });
    let card2RankArrayIndex = rankOrderArray.findIndex(function(item){
    	return item === card2Rank;
    });
    
    if(card1RankArrayIndex - card2RankArrayIndex === 1){
    	return true;
    }else{
    	return false;
    }
}

function isCard1ColorOppositeOfClickedCard(){
	let card1Color = arrayCollection[selectedCard1Array][selectedCard1Index].color;
    let card2Color = arrayCollection[clickedCardArray][clickedCardIndex].color;
    if(card2Color !== card1Color){
    	return true;
    }else{
    	return false;
    }
}

function isCard1SuitSameAsClickedCard(){
	let card1Suit = arrayCollection[selectedCard1Array][selectedCard1Index].suit;
    let card2Suit = arrayCollection[clickedCardArray][clickedCardIndex].suit;
    if(card2Suit === card1Suit){
    	return true;
    }else{
    	return false;
    }
}


function isClickedCardEmptyPileCard(){
    if(clickedCardDomElement.className==='emptyPileCard'){
    	return true;
    }else{
    	return false;
    }
}

function isClickedCardFaceDown(){
	//console.log('entered isClickedCardFaceDown');
    //console.log(arrayCollection);
    //console.log(clickedCardArray);
    //console.log(clickedCardIndex);
    //console.log(arrayCollection[clickedCardArray]);
    //console.log(arrayCollection[clickedCardArray][clickedCardIndex]);
    if(arrayCollection[clickedCardArray][clickedCardIndex].face === 'down'){
        return true;
    }else{
    	return false;
    }

}

function highlightClickedCardAndDescendingCards(){
	//thisCard.style.backgroundColor = 'lightgray';
    let clickedCardParentElement = clickedCardDomElement.parentElement;
    for(let i=clickedCardIndex+1; i<clickedCardParentElement.children.length; i++){
    	clickedCardParentElement.children[i].style.backgroundColor = 'skyblue';
    }
}

function isClickedCardBottomCard(){
    let parentElement = clickedCardDomElement.parentElement;
    if(clickedCardDomElement === parentElement.lastElementChild){
    	return true;
    }else{
    	return false;
    }
}

function isSelectedCard1BottomCard(){
    let parentElement = selectedCard1DomElement.parentElement;
    if(selectedCard1Index === parentElement.children.length-2){
    	return true;
    }else{
    	return false;
    }
}

function flipClickedCardUp(){
	arrayCollection[clickedCardArray][clickedCardIndex].face = 'up';
}

function flipSelectedCard1Up(){
	arrayCollection[selectedCard1Array][selectedCard1Index].face = 'up';
}

function flipCardAboveSelectedCard1Up(){
	arrayCollection[selectedCard1Array][selectedCard1Index-1].face = 'up';
    wasTableauCardFlippedUp = true;
}

function flipCardAboveClickedCardUp(){
	arrayCollection[clickedCardArray][clickedCardIndex-1].face = 'up';
}

function flipAllWastePileCardsDown(){
	arrayCollection['wasteArray'].map(function(item){
    	item.face = 'down';
    });
}


function didClickOnSamePile(){
    if(clickedCardDomElement.parentElement === selectedCard1DomElement.parentElement){
    	return true;
    }
    else{
    	return false;
    }
}

function didClickOnSameCard(){
	if(clickedCardDomElement === selectedCard1DomElement){
    	return true;
    }else{
    	return false;
    }
}

function unhighlightSelectedCard1AndDescendingCards(){
	//thisCard.style.backgroundColor = 'lightgray';
    let selectedCard1ParentElement = selectedCard1DomElement.parentElement;
    for(let i=selectedCard1Index+1; i<selectedCard1ParentElement.children.length; i++){
    	selectedCard1ParentElement.children[i].style.backgroundColor = 'white';
    }
}

function transferCardsToArray(){
	
    //console.log('entered transfer cards to array');
    
    if(clickedCardPileType === 'stock'){
    	//console.log('entered clicked card pile type is stock');
        //console.log('clicked card dom element:', clickedCardDomElement);
        if(clickedCardDomElement.className === 'emptyPileCard'){
        	//console.log('entered clicked card dom element class name is empty pile card');
            let cardsToTransfer = arrayCollection['wasteArray'].splice(0);
            let destinationArray = 'stockArray';
        	//console.log('cards to transfer:', cardsToTransfer);
            arrayCollection[destinationArray].push(...cardsToTransfer);
        	//console.log('waste array after transfer:', arrayCollection['wasteArray']);
        	//console.log('stock array after transfer:', arrayCollection['stockArray']);
            //console.log('clickedCardArray:', clickedCardArray);
            //console.log('emptyPileCardArray:', arrayCollection[clickedCardArray]);
        }else{
        	//console.log('entered clicked card dom element class name isnt empty pile card');
            let cardsToTransfer = arrayCollection[clickedCardArray].splice(clickedCardIndex);
            let destinationArray = 'wasteArray';
        	//console.log('cards to transfer:', cardsToTransfer);
            arrayCollection[destinationArray].push(...cardsToTransfer);
        	//console.log('destination array (waste array) after transfer:', arrayCollection[destinationArray]);
        	//console.log('clicked card (stock array) array after transfer:', arrayCollection[clickedCardArray]);
        }   
    }
    
    switch(selectedCard1PileType){
    	case 'tableau':
        case 'foundation':
        case 'waste':
			let cardsToTransfer = arrayCollection[selectedCard1Array].splice(selectedCard1Index);
            
            let destinationArray;
            
            if(clickedCardDomElement.className === 'emptyPileCard'){
            	destinationArray = clickedCardDomElement.parentElement.getAttribute('data-array-name');
            }else{
            	destinationArray = clickedCardArray;
            }
            
            //console.log('cards to transfer:', cardsToTransfer);
            arrayCollection[destinationArray].push(...cardsToTransfer);
            //console.log('selected card 1 array after transfer:', arrayCollection[selectedCard1Array]);
            //console.log('clicked card array after transfer:', arrayCollection[destinationArray]);
            break;
    }
    
    wereCardsTransferred = true;
    //console.log('wereCardsTransferred:', wereCardsTransferred);
    transferCardSourcePileType = selectedCard1PileType;
    //console.log('transferCardSourcePileType:', transferCardSourcePileType);
    transferCardDestinationPileType = clickedCardPileType;
    //console.log('transferCardDestinationPileType:', transferCardDestinationPileType);
}

//let scoreChange = 0;



function updateScore(){
	if(wereCardsTransferred === true){
        //console.log('OOOOOOOOOOOOO selectedCard1PileType:', selectedCard1PileType);
        //console.log('0000000000000 clickedCardPileType:', clickedCardPileType);
        //console.log('OOOOOOOOOOOOO transferCardSourcePileType:', transferCardSourcePileType);
        //console.log('0000000000000 transferCardDestinationPileType:', transferCardDestinationPileType);
        
        if(transferCardSourcePileType === 'waste'){
        	if(transferCardDestinationPileType === 'tableau'){
            	currentScore = currentScore + 5;
            }else if(transferCardDestinationPileType === 'foundation'){
            	currentScore = currentScore + 10;
            }
        }else if(transferCardSourcePileType === 'tableau'){
        	if(transferCardDestinationPileType === 'foundation'){
            	currentScore = currentScore + 10;
            }
        }else if(transferCardSourcePileType === 'foundation'){
        	if(transferCardDestinationPileType === 'tableau'){
            	currentScore = currentScore - 15;
            }
        	
        }

	}
    if(wasTableauCardFlippedUp === true){
    	currentScore = currentScore + 5;
    }
    
    document.getElementById('scoreDisplay').innerHTML = `Score: ${currentScore}`;
}

function resetScore(){
	currentScore = 0;
}

function resetRecordArray(){
	recordArray = [];
}

function updateRecord(){
	//console.log('entered updateRecord');
    //console.log('recordArray:', recordArray);
    //console.log('record Array.length:', recordArray.length);
	if(recordArray.length === 0){
    	recordArray.push(
    		{currentArrayCollection:deepCopyArrayOrObject(arrayCollection), currentScore:currentScore}
    	);
    	//console.log('updated record array:', recordArray);	
    }
    else if(wereCardsTransferred === true || wasTableauCardFlippedUp === true){
    	recordArray.push(
    		{currentArrayCollection:deepCopyArrayOrObject(arrayCollection), currentScore:currentScore}
    	);
    	//console.log('updated record array:', recordArray);
    
    }
}

function didClickOnEmptyPileCard(){
	if(clickedCardDomElement.className === 'emptyPileCard'){
    	return true;
    }else{
    	return false;
    }
}

function isSelectedCard1RankKing(){
	if(arrayCollection[selectedCard1Array][selectedCard1Index].rank === 'K'){
    	return true;
    }else{
    	return false;
    }
}

function isSelectedCard1RankAce(){
	if(arrayCollection[selectedCard1Array][selectedCard1Index].rank === 'A'){
    	return true;
    }else{
    	return false;
    }
}



function isCardTransferValid(){

	//console.log('clickedCardDomElement.innerHTML:', clickedCardDomElement.innerHTML);
    //console.log('clickedCardPileType:', clickedCardPileType);
	//console.log('selectedCard1DomElement.innerHTML:', selectedCard1DomElement.innerHTML);
    //console.log('selectedCard1PileType:', selectedCard1PileType);
    
	if(clickedCardPileType === 'tableau'){
    	if(didClickOnEmptyPileCard()){
        	if(isSelectedCard1RankKing()){
            	return true;
            }else{
            	return false;
            }
        }else{
        	if(isCard1RankOneBelowClickedCard() && isCard1ColorOppositeOfClickedCard()){
            	return true;
            }else{
            	return false;
            }
        }
    }
	if(clickedCardPileType === 'foundation'){
    	if(didClickOnEmptyPileCard()){
        	if(isSelectedCard1RankAce()){
            	return true;
            }else{
            	return false;
            }
        }else{
        	if(isCard1RankOneAboveClickedCard() && isCard1SuitSameAsClickedCard()){
            	return true;
            }else{
            	return false;
            }
        }
   
    }
}

function isThereFaceDownCardAboveSelectedCard1(){
	
    //console.log('########## test');
    //console.log('########## selectedCard1Array:', arrayCollection[selectedCard1Array]);
    //console.log('########## selectedCard1Array[1]:', arrayCollection[selectedCard1Array][1]);
    //console.log('########## selectedCard1Index:', selectedCard1Index);
    
    if(selectedCard1Index - 1 >= 0){
    	if(arrayCollection[selectedCard1Array][selectedCard1Index-1].face === 'down'){
        	//console.log('there is a card above card and it is face down');
            return true;
        }else{
        	//console.log('there is a card above card 1 but it isnt face down');
            return false;
        }
    }else{
    	//console.log('there is no card above card 1');
        return false;
    }
}

function reverseCardOrderInWastePile(){
	//console.log('working...');
    let wasteArrayLength = arrayCollection['wasteArray'].length;
	let cardsToTransfer = [];
    for(let i=wasteArrayLength-1; i>=0; i--){
    	cardsToTransfer.push(...arrayCollection['wasteArray'].splice(i)); 
    }
	arrayCollection['wasteArray'].push(...cardsToTransfer);
};


function isSelectedCard1EmptyPileCard(){
	
		//console.log('selectedCard1DomElement:', selectedCard1DomElement);
		//console.log('selectedCard1DomElement.className:', selectedCard1DomElement.className);
		//console.log('is selectedCard1DomElement.className==="emptyPileCard" true?', selectedCard1DomElement.className==='emptyPileCard');
	
    if(selectedCard1DomElement.className==='emptyPileCard'){
    	return true;
    }else{
    	return false;
    }
}

function clearClickedCard(){
    //console.log('****************** clicked card cleared');
	clickedCardDomElement = undefined;
	clickedCardArray = undefined;
    clickedCardIndex = undefined;
	clickedCardPileType = undefined;
}



function areFoundationsComplete(){
	for(let i=1; i<5; i++){
		let foundationArray = `foundation${i}`;
		//console.log('foundationArray:', foundationArray);
		let foundationArrayLength = arrayCollection[foundationArray+'Array'].length;
		//console.log('foundationArrayLength:', foundationArrayLength);
		//console.log('arrayCollection[foundationArray+"Array]:', arrayCollection[foundationArray+'Array']);
		
		if(arrayCollection[foundationArray+'Array'].length === 0){
			//console.log('foundationsAreComplete is false');
			return false;
		}else{
			
			//console.log('arrayCollection[foundationArray+"Array"][foundationArrayLength - 1].rank:', arrayCollection[foundationArray+'Array'][foundationArrayLength - 1].rank);
			
			if(arrayCollection[foundationArray+'Array'][foundationArrayLength - 1].rank !== 'K'){
				//console.log('foundationsAreComplete is false');
				return false;
			}
		}
	}
	//console.log('foundationsAreComplete is true');
	return true;
}


function autoFill(){
	
	if(areStockAndWastePilesEmpty() && areAllTableauPileCardsFaceUp()){
	
	while(!areFoundationsComplete()){

			//delete for loop and reinstate while loop (from above) after testing
//for(let i=0; i<5; i++){
	
	//console.log('areFoundationsComplete():', areFoundationsComplete());
	//console.log('entered top of loop');
	
	for(let y=1; y<5; y++){
		
		//console.log('entered foundation part of loop');
		
		clickedCardDomElement = document.getElementById(`foundation${y}`).lastElementChild;
		clickedCardPileType = 'foundation';
		clickedCardArray = `foundation${y}Array`;
		let clickedCardArrayLength = arrayCollection[clickedCardArray].length;
		clickedCardIndex = clickedCardArrayLength - 1;
		
        //console.log('clickedCardIndex:', clickedCardIndex);
		//console.log('clickedCardDomElement:', clickedCardDomElement);
		
			
			for(let z=1; z<8; z++){
				
				//console.log('entered tableau part of loop');
				
				selectedCard1DomElement = document.getElementById(`tableau${z}`).lastElementChild;
				selectedCard1PileType = 'tableau';
				selectedCard1Array = `tableau${z}Array`;
				let selectedCard1ArrayLength = arrayCollection[selectedCard1Array].length;
				selectedCard1Index = selectedCard1ArrayLength - 1;
				
                //console.log('selectedCard1Index:', selectedCard1Index);
				//console.log('selectedCard1DomElement:', selectedCard1DomElement);
				//console.log('is selectedCard1 an empty pile card?', selectedCard1DomElement.className==='emptyPileCard');
				
				if(!isSelectedCard1EmptyPileCard()){
					//console.log('selected card 1 is not empty pile card');
					if(isCardTransferValid()){
						//console.log('card transfer is valid');
						if(isThereFaceDownCardAboveSelectedCard1()){
							flipCardAboveSelectedCard1Up();
						}
						transferCardsToArray();
						reRender(selectedCard1DomElement);
            			reRender(clickedCardDomElement);
						updateScore();
						updateRecord();
                        wereCardsTransferred = false;
						wasTableauCardFlippedUp = false;
                        
						clickedCardDomElement = document.getElementById(`foundation${y}`).lastElementChild;
						clickedCardPileType = 'foundation';
						clickedCardArray = `foundation${y}Array`;
						clickedCardArrayLength = arrayCollection[clickedCardArray].length;
						clickedCardIndex = clickedCardArrayLength - 1;
		
        				//console.log('clickedCardIndex:', clickedCardIndex);
						//console.log('clickedCardDomElement:', clickedCardDomElement);
                        
                        
					}
				}
			}
		//}
	}
// delete this bottom for loop curly bracket and reinstate the above while loop curly bracket after testing
}
	clearSelectedCard1();
	clearClickedCard();
}
	
	if(areFoundationsComplete()){
		stopClock();
		hideAutoFillButton();
		gameOver = true;
		setTimeout(showGameWonMessage, 1);
	}
	
}



function clickHandlerStock(){
	//console.log('entered clickHandlerStock');
    
	if(!isCard1Selected()){
        if(!isClickedCardEmptyPileCard()){;
            flipClickedCardUp();
            transferCardsToArray();
            reRender(clickedCardDomElement);
            reRender(document.getElementById('waste').children[0]);     
        }
        if(isClickedCardEmptyPileCard()){
			flipAllWastePileCardsDown();
            reverseCardOrderInWastePile();
            transferCardsToArray();
            //console.log('clickedCardDomElement:',clickedCardDomElement);
            reRender(clickedCardDomElement);
            reRender(document.getElementById('waste').children[0]);
        }
    }
    
}



function clickHandlerWaste(){

    //console.log('beginning of clickHandlerFoundation: clicked card dom element:', clickedCardDomElement);
    //console.log('beginning of clickHandlerFoundation: selected card 1 dom element:', selectedCard1DomElement);

	if(!isCard1Selected()){
        if(!isClickedCardEmptyPileCard()){
            selectNewCard1();
            highlightClickedCardAndDescendingCards();
        }
    }else if(isCard1Selected()){
    	if(didClickOnSameCard()){
        	unhighlightSelectedCard1AndDescendingCards();
            clearSelectedCard1();
        }
    }
    
}



function clickHandlerFoundation(){
	
    //console.log('beginning of clickHandlerFoundation: clicked card dom element:', clickedCardDomElement);
    //console.log('beginning of clickHandlerFoundation: selected card 1 dom element:', selectedCard1DomElement);

	if(!isCard1Selected()){
        if(!isClickedCardEmptyPileCard()){
            selectNewCard1();
            highlightClickedCardAndDescendingCards();
        }
    }
	else if(isCard1Selected()){
        if(didClickOnSameCard()){
            unhighlightSelectedCard1AndDescendingCards();
            clearSelectedCard1();
        }
        else if(!didClickOnSameCard()){
        
        	if(isSelectedCard1BottomCard()){
        		if(isCardTransferValid()){
                	if(isThereFaceDownCardAboveSelectedCard1()){
                		flipCardAboveSelectedCard1Up();
                		unhighlightSelectedCard1AndDescendingCards();
                		
                        //console.log('CALLING TRANSFER CARDS TO ARRAY');
                        transferCardsToArray();
                		reRender(selectedCard1DomElement);
                		reRender(clickedCardDomElement);
                                //console.log('selected card 1 parent dom after transfer:', selectedCard1DomElement.parentElement);
                    			//console.log('clicked card parent dom after transfer:', clickedCardDomElement.parentElement);
                            	//console.log('selected card 1 dom element parent:', selectedCard1DomElement.parentElement);
                 		
                        //console.log('CALLING CLEAR SELECTED CARD 1');
                        clearSelectedCard1();
            		}else if(!isThereFaceDownCardAboveSelectedCard1()){
						//flipCardAboveSelectedCard1Up();
                		unhighlightSelectedCard1AndDescendingCards();
                        
                        //console.log('CALLING TRANSFER CARDS TO ARRAY');
                		transferCardsToArray();
                		reRender(selectedCard1DomElement);
                		reRender(clickedCardDomElement);
                		//console.log('selected card 1 parent dom after transfer:', selectedCard1DomElement.parentElement);
                		//console.log('clicked card parent dom after transfer:', clickedCardDomElement.parentElement);
                		//console.log('selected card 1 dom element parent:', selectedCard1DomElement.parentElement);
                		
                        //console.log('CALLING CLEAR SELECTED CARD 1');
                        clearSelectedCard1();
				}	
            }
		}
        
        
        
        
        }
        //
    }

}



function clickHandlerTableau(){

    //console.log('beginning of clickHandlerTableau: clicked card dom element:', clickedCardDomElement);
    //console.log('beginning of clickHandlerTableau: clicked card pile type:', clickedCardPileType);
    //console.log('beginning of clickHandlerTableau: selected card 1 dom element:', selectedCard1DomElement);
	//console.log('beginning of clickHandlerTableau: selected card 1 pile type:', selectedCard1PileType);

	if(!isCard1Selected()){
    	if(!isClickedCardEmptyPileCard()){
        	//
            if(!isClickedCardFaceDown()){
            	selectNewCard1();
                highlightClickedCardAndDescendingCards();
            }
            else if(isClickedCardFaceDown()){
                if(isClickedCardBottomCard()){
                    flipClickedCardUp();
					reRender(clickedCardDomElement);
                }
    		}
		}
	}
    
	else if(isCard1Selected()){
        if(didClickOnSamePile()){
        	if(didClickOnSameCard()){
            	unhighlightSelectedCard1AndDescendingCards();
                clearSelectedCard1();
            }else if(!didClickOnSameCard()){
            	if(!isClickedCardFaceDown()){
                	unhighlightSelectedCard1AndDescendingCards();
                    clearSelectedCard1();
            		selectNewCard1();
                	highlightClickedCardAndDescendingCards();
                }
            }
        }else if(!didClickOnSamePile()){
            //console.log('not same pile');
            if(!isClickedCardFaceDown()){
                    //console.log('is clicked card bottom card?', isClickedCardBottomCard());
                    if(isClickedCardBottomCard()){
            			//console.log('is card transfer valid?', isCardTransferValid());
                		if(isCardTransferValid()){
                        	if(isThereFaceDownCardAboveSelectedCard1()){
                                flipCardAboveSelectedCard1Up();
                				unhighlightSelectedCard1AndDescendingCards();
                    			transferCardsToArray();
                                reRender(selectedCard1DomElement);
                                reRender(clickedCardDomElement);
                                //console.log('selected card 1 parent dom after transfer:', selectedCard1DomElement.parentElement);
                    			//console.log('clicked card parent dom after transfer:', clickedCardDomElement.parentElement);
                            	//console.log('selected card 1 dom element parent:', selectedCard1DomElement.parentElement);
                                clearSelectedCard1();
                            }else if(!isThereFaceDownCardAboveSelectedCard1()){
                				//flipCardAboveSelectedCard1Up();
                                unhighlightSelectedCard1AndDescendingCards();
                    			transferCardsToArray();
                                reRender(selectedCard1DomElement);
                                reRender(clickedCardDomElement);
                                //console.log('selected card 1 parent dom after transfer:', selectedCard1DomElement.parentElement);
                    			//console.log('clicked card parent dom after transfer:', clickedCardDomElement.parentElement);
                            	//console.log('selected card 1 dom element parent:', selectedCard1DomElement.parentElement);
                                clearSelectedCard1();
                            }		
                		}
                    }      	
            }
        }
    }
  
}



function clickHandlerMaster(event){
	//console.log('gameOver:', gameOver);
	if(gameOver===false){
	
    clickedCardDomElement = event.currentTarget;
    clickedCardPileType = clickedCardDomElement.getAttribute('data-pile-type');
    //console.log('clicked card pile type:', clickedCardPileType);
	
        
    if(clickedCardDomElement.className === 'emptyPileCard'){
    	clickedCardArray = 'emptyPileCardArray';
        clickedCardIndex = 0;
    }else{
    	clickedCardArray = clickedCardDomElement.parentElement.getAttribute('data-array-name');
    	clickedCardIndex = arrayCollection[clickedCardArray].findIndex(function(item){
    	return item.rank+item.suit === clickedCardDomElement.children[0].innerHTML;
        });
    }
    //console.log(clickedCardArray);
    //console.log(clickedCardIndex);
    
    switch(clickedCardPileType){
    	case 'tableau':
        	clickHandlerTableau();
        	clickedCardDomElement = '';
        	break;
    	case 'foundation':
    		clickHandlerFoundation();
        	clickedCardDomElement = '';
        	break;
   		case 'waste':
    		clickHandlerWaste();
        	clickedCardDomElement = '';
        	break;
   		case 'stock':
    		clickHandlerStock();
        	clickedCardDomElement = '';
        	break;
    }   
    
    updateScore();
    updateRecord();
    
    wereCardsTransferred = false;
		wasTableauCardFlippedUp = false;
	
		if(isAutoFillReadyForDisplay()){
			//console.log('autofill is ready for display');
			showAutoFillButton();
		}
	
		if(areFoundationsComplete()){
			stopClock();
			hideAutoFillButton();
			gameOver = true;
			setTimeout(showGameWonMessage, 1);
		}
	
	//console.log('are foundations complete?', areFoundationsComplete()); 
	}
}

function hideAutoFillButton(){
	document.getElementById('autoFillButton').style.display = 'none';
}

function showAutoFillButton(){
	document.getElementById('autoFillButton').style.display = 'initial';
}

function isAutoFillReadyForDisplay(){
	if(areStockAndWastePilesEmpty() && areAllTableauPileCardsFaceUp()){
		return true;
	}else{
		return false;
	}
}

function areStockAndWastePilesEmpty(){
	if(arrayCollection['stockArray'].length === 0 && arrayCollection['wasteArray'].length === 0){
		return true;
	}else{
		return false;
	}
}

function areAllTableauPileCardsFaceUp(){
	let result = true;
	for(let i=1; i<8; i++){
		if(arrayCollection[`tableau${i}Array`].length !== 0){
			arrayCollection[`tableau${i}Array`].map(function(item){
				if(item.face==='down'){
					result = false;
				}
			});			
		}
	}
	return result;
}


function showGameWonMessage(){
	alert('Congratulations! You Won!');
}




function deepCopyArrayOrObject(initialSourceArrayOrObject){
	let copyToReturn;
    
    let currentItem = initialSourceArrayOrObject;
    
    if(typeof initialSourceArrayOrObject === 'object' && Array.isArray(initialSourceArrayOrObject)){
        copyToReturn = [];
        deepCopy(initialSourceArrayOrObject, false, initialSourceArrayOrObject, copyToReturn);
    }else{
        copyToReturn = {};
        deepCopy(initialSourceArrayOrObject, false, initialSourceArrayOrObject, copyToReturn);
    }

    return copyToReturn;
   
	function deepCopy(sourceArrayOrObject, indexOrKey, currentItem, destinationArrayOrObject){
    
    	let dataType;
        let finalizedDestinationArrayOrObject;
        let finalizedSourceArrayOrObject;
        
        
		if(typeof currentItem === 'object' && Array.isArray(currentItem)){
        	dataType = 'array';
    	}else{
        	dataType = 'object';
    	}
        
        //console.log('dataType:', dataType);
        
        if(indexOrKey === false){
        	finalizedDestinationArrayOrObject = destinationArrayOrObject;
        }else{
        	finalizedDestinationArrayOrObject = destinationArrayOrObject[indexOrKey];
        }
        
        if(indexOrKey === false){
        	finalizedSourceArrayOrObject = sourceArrayOrObject;
        }else{
        	finalizedSourceArrayOrObject = sourceArrayOrObject[indexOrKey];
        }
        
		if(dataType === 'array'){
        
			finalizedSourceArrayOrObject.map(function(item, index){
                if(typeof item !== 'object'){
                	//console.log('item:', item);
                    //console.log('finalizedDestinationArrayOrObject:', finalizedDestinationArrayOrObject);
					finalizedDestinationArrayOrObject.push(item);
    			}
                else if(typeof item === 'object' && Array.isArray(item)){
    				let currentItem = item;
                    finalizedDestinationArrayOrObject.push([]);
            		deepCopy(finalizedSourceArrayOrObject, index, currentItem, finalizedDestinationArrayOrObject);
                }
    			else if(typeof item === 'object' && !Array.isArray(item)){
    				let currentItem = item;
                    finalizedDestinationArrayOrObject.push({});
            		deepCopy(finalizedSourceArrayOrObject, index, currentItem, finalizedDestinationArrayOrObject);
    			}
			});
    
        }else if(dataType === 'object'){
        
    		let objectKeys = Object.keys(finalizedSourceArrayOrObject);
    		objectKeys.map(function(key){
    			if(typeof finalizedSourceArrayOrObject[key] !== 'object'){
        			finalizedDestinationArrayOrObject[key] = finalizedSourceArrayOrObject[key];	
        		}
                else if(typeof finalizedSourceArrayOrObject[key] === 'object' && Array.isArray(finalizedSourceArrayOrObject[key])){
                    let currentItem = finalizedSourceArrayOrObject[key];
            		finalizedDestinationArrayOrObject[key] = [];
            		deepCopy(finalizedSourceArrayOrObject, key, currentItem, finalizedDestinationArrayOrObject);
                }
        		else if(typeof finalizedSourceArrayOrObject[key] === 'object' && !Array.isArray(finalizedSourceArrayOrObject[key])){
        			console.log('object: {}');
                    let currentItem = finalizedSourceArrayOrObject[key];
            		finalizedDestinationArrayOrObject[key] = {};
            		deepCopy(finalizedSourceArrayOrObject, key, currentItem, finalizedDestinationArrayOrObject);
        		}
    		});
        
        }
          
    }

}


startGameWithAllCardsInTableau();

function startGameWithAllCardsInTableau(){

	arrayCollection = {
	tableau1Array: [
    	{suit:'♠', rank:'K', color:'black', face:'up'},
        {suit:'♥', rank:'Q', color:'red', face:'up'},
        {suit:'♣', rank:'J', color:'black', face:'up'},
        {suit:'♦', rank:'10', color:'red', face:'up'},
        {suit:'♣', rank:'9', color:'black', face:'up'},
        {suit:'♥', rank:'8', color:'red', face:'up'},
        {suit:'♠', rank:'7', color:'black', face:'up'},
        {suit:'♥', rank:'6', color:'red', face:'up'},
        {suit:'♣', rank:'5', color:'black', face:'up'},
        {suit:'♦', rank:'4', color:'red', face:'up'},
        {suit:'♣', rank:'3', color:'black', face:'up'},
        {suit:'♥', rank:'2', color:'red', face:'up'},
        {suit:'♠', rank:'A', color:'black', face:'up'}
    ],
	tableau2Array: [
    	{suit:'♥', rank:'K', color:'red', face:'up'},
        {suit:'♣', rank:'Q', color:'black', face:'up'},
        {suit:'♦', rank:'J', color:'red', face:'up'},
        {suit:'♣', rank:'10', color:'black', face:'up'},
        {suit:'♥', rank:'9', color:'red', face:'up'},
        {suit:'♠', rank:'8', color:'black', face:'up'},
        {suit:'♥', rank:'7', color:'red', face:'up'},
        {suit:'♠', rank:'6', color:'black', face:'up'},
        {suit:'♥', rank:'5', color:'red', face:'up'},
        {suit:'♣', rank:'4', color:'black', face:'up'},
        {suit:'♦', rank:'3', color:'red', face:'up'},
        {suit:'♣', rank:'2', color:'black', face:'up'},
        {suit:'♥', rank:'A', color:'red', face:'up'}
        ],
	tableau3Array: [
    	{suit:'♣', rank:'K', color:'black', face:'up'},
        {suit:'♦', rank:'Q', color:'red', face:'up'},
        {suit:'♥', rank:'J', color:'red', face:'up'},
        {suit:'♠', rank:'10', color:'black', face:'up'},
        {suit:'♦', rank:'9', color:'red', face:'up'},
        {suit:'♣', rank:'8', color:'black', face:'up'},
        {suit:'♦', rank:'7', color:'red', face:'up'},
        {suit:'♣', rank:'6', color:'black', face:'up'},
        {suit:'♦', rank:'5', color:'red', face:'up'},
        {suit:'♥', rank:'4', color:'red', face:'up'},
        {suit:'♠', rank:'3', color:'black', face:'up'},
        {suit:'♦', rank:'2', color:'red', face:'up'},
        {suit:'♣', rank:'A', color:'black', face:'up'}
        ],
	tableau4Array: [
    	{suit:'♦', rank:'K', color:'red', face:'up'},
        {suit:'♠', rank:'Q', color:'black', face:'up'},
        {suit:'♠', rank:'J', color:'black', face:'up'},
        {suit:'♥', rank:'10', color:'red', face:'up'},
        {suit:'♠', rank:'9', color:'black', face:'up'},
        {suit:'♦', rank:'8', color:'red', face:'up'},
        {suit:'♣', rank:'7', color:'black', face:'up'},
        {suit:'♦', rank:'6', color:'red', face:'up'},
        {suit:'♠', rank:'5', color:'black', face:'up'},
        {suit:'♠', rank:'4', color:'black', face:'up'},
        {suit:'♥', rank:'3', color:'red', face:'up'},
		{suit:'♠', rank:'2', color:'black', face:'up'}
        ],
	tableau5Array: [

        ],
	tableau6Array: [

        ],
	tableau7Array: [
    
        ],
    wasteArray: [],
    foundation1Array: [
    	],
    foundation2Array: [
    	],
    foundation3Array: [
    	],
    foundation4Array: [
    	],
    stockArray: [
		{suit:'♦', rank:'A', color:'red', face:'down'}
	],
    emptyPileCardArray: [
    {suit:'', rank:'', color:'', face:'up'}
	], 
    discardArray: [],
    deckArray: [],
	};

	clearAllPileDomElementChildren();
	initialRenderAllPileDomElements();
	resetRecordArray();
	updateRecord();

}