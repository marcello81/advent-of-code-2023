const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');
    const handBids = parseHandBids(rows);    
    const sum = getBidSum(handBids);   
    return sum;
}

const parseHandBids = (rows) => {
    const handBids = [];
    rows.forEach(row => {
        const [ hand, bid ] = row.trim().split(" ");
        handBids.push([ hand, Number(bid)]);
    });
    handBids.sort(compareHands);
    return handBids;
}

const compareHands = (handBidA, handBidB) => {
    const result = getHandScore(handBidA[0]) - getHandScore(handBidB[0]);
    if(result == 0) {
        for(let i=0; i<handBidA[0].length; i++) {
            if(CARD_ORDER.get(handBidA[0][i]) == CARD_ORDER.get(handBidB[0][i])) continue;
            return CARD_ORDER.get(handBidA[0][i]) - CARD_ORDER.get(handBidB[0][i]);
        }
    }
    return result;
}

const getBidSum = (handBids) => {
    let sum = 0;
    for(let i=0; i<handBids.length; i++) {
        sum += handBids[i][1] * (i + 1);
    }
    return sum;
}

const getHandScore = (hand) => {
    let handMap = getHandMap(hand);
    const jokers = handMap[0];
    handMap = handMap.slice(1);

    let handScore = 0;
    if(hasFiveOfAKind(handMap)) handScore = 6
    else if(hasFourOfAKind(handMap)) handScore = 5
    else if(hasFullHouse(handMap)) handScore = 4
    else if(hasThreeOfAKind(handMap)) handScore = 3
    else if(hasTwoPair(handMap)) handScore = 2
    else if(hasOnePair(handMap)) handScore = 1

    for(let i=0; i<jokers; i++) {
        handScore = upgradeHandScore(handScore);
    }

    return handScore;
}

const upgradeHandScore = handScore => {
    switch(handScore) {
        case 0: return 1;
        case 1: return 3;
        case 2: return 4;
        case 3: return 5;
        case 4: return 5;
        case 5: return 6;
        default: return handScore;
    }
}

const hasFiveOfAKind = handMap => hasXOfAKind(handMap, 5);
const hasFourOfAKind = handMap => hasXOfAKind(handMap, 4);
const hasFullHouse = handMap => hasThreeOfAKind(handMap) && hasOnePair(handMap, 2);
const hasThreeOfAKind = handMap => hasXOfAKind(handMap, 3);
const hasXOfAKind = (handMap, x) => handMap.some(v => v == x);
const hasTwoPair = handMap => handMap.indexOf(2) != handMap.lastIndexOf(2);
const hasOnePair = handMap => hasXOfAKind(handMap, 2);

const getHandMap = (hand) => {
    const map = [];
    for(let i=0; i<hand.length; i++) {
        const card = hand[i];
        let count = map[CARD_ORDER.get(card)] || 0;
        map[CARD_ORDER.get(card)] = ++count;
    }
    return map;
}

const CARD_ORDER = new Map([["A", 13], ["K", 12], ["Q", 11], ["J", 10], ["T", 9], ["9", 8], ["8", 7], ["7", 6], ["6", 5], ["5", 4], ["4", 3], ["3", 2], ["2", 1], ["J", 0] ]);

module.exports = run;