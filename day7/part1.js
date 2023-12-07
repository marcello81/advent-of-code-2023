const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');

    const handBids = parseHandBids(rows);
    handBids.sort( compare );

    let sum = 0;
    for(let i=0; i<handBids.length; i++) {
        sum += handBids[i][1] * (i + 1);
    }
   
    return sum;
}

const compare = (handBitA, handBitB) => {
    const result = getHandScore(handBitA[0]) - getHandScore(handBitB[0]);
    if(result == 0) {
        for(let i=0; i<handBitA[0].length; i++) {
            if(CARD_ORDER.get(handBitA[0][i]) == CARD_ORDER.get(handBitB[0][i])) continue;
            return CARD_ORDER.get(handBitA[0][i]) - CARD_ORDER.get(handBitB[0][i]);
        }
    }
    return result;
}

const parseHandBids = (rows) => {
    const handBids = [];
    rows.forEach(row => {
        const [ hand, bid ] = row.trim().split(" ");
        handBids.push([ hand, Number(bid)]);
    });
    return handBids;
}

const getHandScore = (hand) => {
    let handScore = 0;
    if(hasFiveOfAKind(hand)) handScore = 6
    else if(hasFourOfAKind(hand)) handScore = 5
    else if(hasFullHouse(hand)) handScore = 4
    else if(hasThreeOfAKind(hand)) handScore = 3
    else if(hasTwoPair(hand)) handScore = 2
    else if(hasOnePair(hand)) handScore = 1
    return handScore;
}

const hasFiveOfAKind = (hand) => hasXOfAKind(hand, 5);
const hasFourOfAKind = (hand) => hasXOfAKind(hand, 4);
const hasFullHouse = (hand) => hasThreeOfAKind(hand) && hasOnePair(hand, 2);
const hasThreeOfAKind = (hand) => hasXOfAKind(hand, 3);
const hasXOfAKind = (hand, x) => getHandMap(hand).some(v => v == x);
const hasTwoPair = (hand) => getHandMap(hand).indexOf(2) != getHandMap(hand).lastIndexOf(2);
const hasOnePair = (hand) => hasXOfAKind(hand, 2);

const getHandMap = (hand) => {
    const map = [];
    for(let i=0; i<hand.length; i++) {
        const card = hand[i];
        let count = map[CARD_ORDER.get(card)] || 0;
        map[CARD_ORDER.get(card)] = ++count;
    }
    return map;
}

const CARD_ORDER = new Map([["A", 12], ["K", 11], ["Q", 10], ["J", 9], ["T", 8], ["9", 7], ["8", 6], ["7", 5], ["6", 4], ["5", 3], ["4", 2], ["3", 1], ["2", 0] ]);

module.exports = run;