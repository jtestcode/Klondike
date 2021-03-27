


export function isCard1Selected(selectedCard1DomElement){
	if(selectedCard1DomElement === undefined){
        return false;
    }else{
    	return true;
    }
}

export function isCard1RankOneBelowClickedCard(arrayCollection, selectedCard1Array, selectedCard1Index, clickedCardArray, clickedCardIndex, rankOrderArray){
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

export function isCard1RankOneAboveClickedCard(arrayCollection, selectedCard1Array, selectedCard1Index, clickedCardArray, clickedCardIndex, rankOrderArray){
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

export function isCard1ColorOppositeOfClickedCard(arrayCollection, selectedCard1Array, selectedCard1Index, clickedCardArray, clickedCardIndex){
	let card1Color = arrayCollection[selectedCard1Array][selectedCard1Index].color;
    let card2Color = arrayCollection[clickedCardArray][clickedCardIndex].color;
    if(card2Color !== card1Color){
    	return true;
    }else{
    	return false;
    }
}

export function isCard1SuitSameAsClickedCard(arrayCollection, selectedCard1Array, selectedCard1Index, clickedCardArray, clickedCardIndex){
	let card1Suit = arrayCollection[selectedCard1Array][selectedCard1Index].suit;
    let card2Suit = arrayCollection[clickedCardArray][clickedCardIndex].suit;
    if(card2Suit === card1Suit){
    	return true;
    }else{
    	return false;
    }
}

export function isClickedCardEmptyPileCard(clickedCardDomElement){
    if(clickedCardDomElement.className==='emptyPileCard'){
    	return true;
    }else{
    	return false;
    }
}

export function isSelectedCard1EmptyPileCard(selectedCard1DomElement){
	
	
    if(selectedCard1DomElement.className==='emptyPileCard'){
    	return true;
    }else{
    	return false;
    }
}

export function isClickedCardFaceDown(arrayCollection, clickedCardArray, clickedCardIndex){
    if(arrayCollection[clickedCardArray][clickedCardIndex].face === 'down'){
        return true;
    }else{
    	return false;
    }
}

export function isClickedCardBottomCard(clickedCardDomElement){
    let parentElement = clickedCardDomElement.parentElement;
    if(clickedCardDomElement === parentElement.lastElementChild){
    	return true;
    }else{
    	return false;
    }
}

export function isSelectedCard1BottomCard(selectedCard1DomElement, selectedCard1Index){
    let parentElement = selectedCard1DomElement.parentElement;
    if(selectedCard1Index === parentElement.children.length-2){
    	return true;
    }else{
    	return false;
    }
}

export function isSelectedCard1RankKing(arrayCollection, selectedCard1Array, selectedCard1Index){
	if(arrayCollection[selectedCard1Array][selectedCard1Index].rank === 'K'){
    	return true;
    }else{
    	return false;
    }
}

export function isSelectedCard1RankAce(arrayCollection, selectedCard1Array, selectedCard1Index){
	if(arrayCollection[selectedCard1Array][selectedCard1Index].rank === 'A'){
    	return true;
    }else{
    	return false;
    }
}

export function isThereFaceDownCardAboveSelectedCard1(selectedCard1Index, arrayCollection, selectedCard1Array){
    
    if(selectedCard1Index - 1 >= 0){
    	if(arrayCollection[selectedCard1Array][selectedCard1Index-1].face === 'down'){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

export function isAutoFillReadyForDisplay(arrayCollection){
	if(areStockAndWastePilesEmpty(arrayCollection) && areAllTableauPileCardsFaceUp(arrayCollection)){
		return true;
	}else{
		return false;
	}
}

export function areFoundationsComplete(arrayCollection){
	for(let i=1; i<5; i++){
		let foundationArray = `foundation${i}`;
		let foundationArrayLength = arrayCollection[foundationArray+'Array'].length;
		if(arrayCollection[foundationArray+'Array'].length === 0){
			return false;
		}else{
			if(arrayCollection[foundationArray+'Array'][foundationArrayLength - 1].rank !== 'K'){
				return false;
			}
		}
	}
	return true;
}

export function areStockAndWastePilesEmpty(arrayCollection){
	if(arrayCollection['stockArray'].length === 0 && arrayCollection['wasteArray'].length === 0){
		return true;
	}else{
		return false;
	}
}

export function areAllTableauPileCardsFaceUp(arrayCollection){
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

export function didClickOnEmptyPileCard(clickedCardDomElement){
	if(clickedCardDomElement.className === 'emptyPileCard'){
    	return true;
    }else{
    	return false;
    }
}

export function didClickOnSamePile(clickedCardDomElement, selectedCard1DomElement){
    if(clickedCardDomElement.parentElement === selectedCard1DomElement.parentElement){
    	return true;
    }
    else{
    	return false;
    }
}


export function didClickOnSameCard(clickedCardDomElement, selectedCard1DomElement){
	if(clickedCardDomElement === selectedCard1DomElement){
    	return true;
    }else{
    	return false;
    }
}