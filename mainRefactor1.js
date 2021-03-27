import * as testMod from './testerModule.js';

import * as renderMod from './renderModule1.js';



renderMod.addInitialEventListeners(clickHandlerMaster, autoFill, undoMove, resetGame);









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




function resetGame(){
	resetAllPileArrays();
    //console.log(arrayCollection);
    renderMod.copyReserveDeckArrayCardsToDeckArray(arrayCollection, reserveDeckArray);
    renderMod.dealRandomCardsToAllPileArrays(arrayCollection);
    //console.log(arrayCollection);
    renderMod.clearAllPileDomElementChildren();
    renderMod.initialRenderAllPileDomElements(arrayCollection, clickHandlerMaster);
    resetScore();
    updateScore();
    renderMod.resetClock(globalVariables.currentTime);
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
      renderMod.clearAllPileDomElementChildren();
    	renderMod.initialRenderAllPileDomElements(arrayCollection, clickHandlerMaster);
    }
		
		if(testMod.areFoundationsComplete(arrayCollection)){
			showAutoFillButton();
		}else{
			hideAutoFillButton();
		}
		
	}
}





let wereCardsTransferred;

let wasTableauCardFlippedUp;

let transferCardSourcePileType;

let transferCardDestinationPileType;

let globalVariables = {
    currentTime:0,
};

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






renderMod.copyReserveDeckArrayCardsToDeckArray(arrayCollection, reserveDeckArray);

renderMod.dealRandomCardsToAllPileArrays(arrayCollection);


updateRecord();






//console.log(arrayCollection);






renderMod.initialRenderAllPileDomElements(arrayCollection, clickHandlerMaster);



let clockSetIntervalFunction;

renderMod.addClickEventListenerToStartClock(clockSetIntervalFunction, globalVariables.currentTime);




















////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////







function clearSelectedCard1(){
	if(testMod.isCard1Selected(selectedCard1DomElement)){
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














function highlightClickedCardAndDescendingCards(){
	//thisCard.style.backgroundColor = 'lightgray';
    let clickedCardParentElement = clickedCardDomElement.parentElement;
    for(let i=clickedCardIndex+1; i<clickedCardParentElement.children.length; i++){
    	clickedCardParentElement.children[i].style.backgroundColor = 'skyblue';
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




function isCardTransferValid(){

	//console.log('clickedCardDomElement.innerHTML:', clickedCardDomElement.innerHTML);
    //console.log('clickedCardPileType:', clickedCardPileType);
	//console.log('selectedCard1DomElement.innerHTML:', selectedCard1DomElement.innerHTML);
    //console.log('selectedCard1PileType:', selectedCard1PileType);
    
	if(clickedCardPileType === 'tableau'){
    	if(testMod.didClickOnEmptyPileCard(clickedCardDomElement)){
        	if(testMod.isSelectedCard1RankKing(arrayCollection, selectedCard1Array, selectedCard1Index)){
            	return true;
            }else{
            	return false;
            }
        }else{
        	if(testMod.isCard1RankOneBelowClickedCard(arrayCollection, selectedCard1Array, selectedCard1Index, clickedCardArray, clickedCardIndex, rankOrderArray) && testMod.isCard1ColorOppositeOfClickedCard(arrayCollection, selectedCard1Array, selectedCard1Index, clickedCardArray, clickedCardIndex)){
            	return true;
            }else{
            	return false;
            }
        }
    }
	if(clickedCardPileType === 'foundation'){
    	if(testMod.didClickOnEmptyPileCard(clickedCardDomElement)){
        	if(testMod.isSelectedCard1RankAce(arrayCollection, selectedCard1Array, selectedCard1Index)){
            	return true;
            }else{
            	return false;
            }
        }else{
        	if(testMod.isCard1RankOneAboveClickedCard(arrayCollection, selectedCard1Array, selectedCard1Index, clickedCardArray, clickedCardIndex, rankOrderArray) && testMod.isCard1SuitSameAsClickedCard(arrayCollection, selectedCard1Array, selectedCard1Index, clickedCardArray, clickedCardIndex)){
            	return true;
            }else{
            	return false;
            }
        }
   
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




function clearClickedCard(){
    //console.log('****************** clicked card cleared');
	clickedCardDomElement = undefined;
	clickedCardArray = undefined;
    clickedCardIndex = undefined;
	clickedCardPileType = undefined;
}


function reRender(domElement){
	//let reRenderDomObject = event.currentTarget;
    let domElementParent = domElement.parentElement;
    //let arrayName = reRenderDomObjectParent.getAttribute('data-array-name');
    renderMod.clearChildren(domElementParent);
    renderMod.render(domElementParent, arrayCollection, clickHandlerMaster);
}



function autoFill(){
	
	if(testMod.areStockAndWastePilesEmpty(arrayCollection) && testMod.areAllTableauPileCardsFaceUp(arrayCollection)){
	
	while(!testMod.areFoundationsComplete(arrayCollection)){

			//delete for loop and reinstate while loop (from above) after testing
//for(let i=0; i<5; i++){
	
	//console.log('testMod.areFoundationsComplete(arrayCollection):', testMod.areFoundationsComplete(arrayCollection));
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
				
				if(!testMod.isSelectedCard1EmptyPileCard(selectedCard1DomElement)){
					//console.log('selected card 1 is not empty pile card');
					if(isCardTransferValid()){
						//console.log('card transfer is valid');
						if(testMod.isThereFaceDownCardAboveSelectedCard1(selectedCard1Index, arrayCollection, selectedCard1Array)){
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
	
	if(testMod.areFoundationsComplete(arrayCollection)){
		renderMod.stopClock();
		hideAutoFillButton();
		gameOver = true;
		setTimeout(showGameWonMessage, 1);
	}
	
}



function clickHandlerStock(){
	//console.log('entered clickHandlerStock');
    
	if(!testMod.isCard1Selected(selectedCard1DomElement)){
        if(!testMod.isClickedCardEmptyPileCard(clickedCardDomElement)){;
            flipClickedCardUp();
            transferCardsToArray();
            reRender(clickedCardDomElement);
            reRender(document.getElementById('waste').children[0]);     
        }
        if(testMod.isClickedCardEmptyPileCard(clickedCardDomElement)){
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

	if(!testMod.isCard1Selected(selectedCard1DomElement)){
        if(!testMod.isClickedCardEmptyPileCard(clickedCardDomElement)){
            selectNewCard1();
            highlightClickedCardAndDescendingCards();
        }
    }else if(testMod.isCard1Selected(selectedCard1DomElement)){
    	if(testMod.didClickOnSameCard(clickedCardDomElement, selectedCard1DomElement)){
        	unhighlightSelectedCard1AndDescendingCards();
            clearSelectedCard1();
        }
    }
    
}



function clickHandlerFoundation(){
	
    //console.log('beginning of clickHandlerFoundation: clicked card dom element:', clickedCardDomElement);
    //console.log('beginning of clickHandlerFoundation: selected card 1 dom element:', selectedCard1DomElement);

	if(!testMod.isCard1Selected(selectedCard1DomElement)){
        if(!testMod.isClickedCardEmptyPileCard(clickedCardDomElement)){
            selectNewCard1();
            highlightClickedCardAndDescendingCards();
        }
    }
	else if(testMod.isCard1Selected(selectedCard1DomElement)){
        if(testMod.didClickOnSameCard(clickedCardDomElement, selectedCard1DomElement)){
            unhighlightSelectedCard1AndDescendingCards();
            clearSelectedCard1();
        }
        else if(!testMod.didClickOnSameCard(clickedCardDomElement, selectedCard1DomElement)){
        
        	if(testMod.isSelectedCard1BottomCard(selectedCard1DomElement, selectedCard1Index)){
        		if(isCardTransferValid()){
                	if(testMod.isThereFaceDownCardAboveSelectedCard1(selectedCard1Index, arrayCollection, selectedCard1Array)){
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
            		}else if(!testMod.isThereFaceDownCardAboveSelectedCard1(selectedCard1Index, arrayCollection, selectedCard1Array)){
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

	if(!testMod.isCard1Selected(selectedCard1DomElement)){
    	if(!testMod.isClickedCardEmptyPileCard(clickedCardDomElement)){
        	//
            if(!testMod.isClickedCardFaceDown(arrayCollection, clickedCardArray, clickedCardIndex)){
            	selectNewCard1();
                highlightClickedCardAndDescendingCards();
            }
            else if(testMod.isClickedCardFaceDown(arrayCollection, clickedCardArray, clickedCardIndex)){
                if(testMod.isClickedCardBottomCard(clickedCardDomElement)){
                    flipClickedCardUp();
					reRender(clickedCardDomElement);
                }
    		}
		}
	}
    
	else if(testMod.isCard1Selected(selectedCard1DomElement)){
        if(testMod.didClickOnSamePile(clickedCardDomElement, selectedCard1DomElement)){
        	if(testMod.didClickOnSameCard(clickedCardDomElement, selectedCard1DomElement)){
            	unhighlightSelectedCard1AndDescendingCards();
                clearSelectedCard1();
            }else if(!testMod.didClickOnSameCard(clickedCardDomElement, selectedCard1DomElement)){
            	if(!testMod.isClickedCardFaceDown(arrayCollection, clickedCardArray, clickedCardIndex)){
                	unhighlightSelectedCard1AndDescendingCards();
                    clearSelectedCard1();
            		selectNewCard1();
                	highlightClickedCardAndDescendingCards();
                }
            }
        }else if(!testMod.didClickOnSamePile(clickedCardDomElement, selectedCard1DomElement)){
            //console.log('not same pile');
            if(!testMod.isClickedCardFaceDown(arrayCollection, clickedCardArray, clickedCardIndex)){
                    //console.log('is clicked card bottom card?', testMod.isClickedCardBottomCard(clickedCardDomElement));
                    if(testMod.isClickedCardBottomCard(clickedCardDomElement)){
            			//console.log('is card transfer valid?', isCardTransferValid());
                		if(isCardTransferValid()){
                        	if(testMod.isThereFaceDownCardAboveSelectedCard1(selectedCard1Index, arrayCollection, selectedCard1Array)){
                                flipCardAboveSelectedCard1Up();
                				unhighlightSelectedCard1AndDescendingCards();
                    			transferCardsToArray();
                                reRender(selectedCard1DomElement);
                                reRender(clickedCardDomElement);
                                //console.log('selected card 1 parent dom after transfer:', selectedCard1DomElement.parentElement);
                    			//console.log('clicked card parent dom after transfer:', clickedCardDomElement.parentElement);
                            	//console.log('selected card 1 dom element parent:', selectedCard1DomElement.parentElement);
                                clearSelectedCard1();
                            }else if(!testMod.isThereFaceDownCardAboveSelectedCard1(selectedCard1Index, arrayCollection, selectedCard1Array)){
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
	
		if(testMod.isAutoFillReadyForDisplay(arrayCollection)){
			//console.log('autofill is ready for display');
			showAutoFillButton();
		}
	
		if(testMod.areFoundationsComplete(arrayCollection)){
			renderMod.stopClock();
			hideAutoFillButton();
			gameOver = true;
			setTimeout(showGameWonMessage, 1);
		}
	
	//console.log('are foundations complete?', testMod.areFoundationsComplete(arrayCollection)); 
	}
}

function hideAutoFillButton(){
	document.getElementById('autoFillButton').style.display = 'none';
}

function showAutoFillButton(){
	document.getElementById('autoFillButton').style.display = 'initial';
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
		{suit:'♠', rank:'2', color:'black', face:'up'},
        {suit:'♦', rank:'A', color:'red', face:'down'}
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
    stockArray: [],
    emptyPileCardArray: [
    {suit:'', rank:'', color:'', face:'up'}
	], 
    discardArray: [],
    deckArray: [],
	};

	renderMod.clearAllPileDomElementChildren();
	renderMod.initialRenderAllPileDomElements(arrayCollection, clickHandlerMaster);
	resetRecordArray();
	updateRecord();

}