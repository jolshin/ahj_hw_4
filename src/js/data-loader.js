
export default function binList() {

    let binArray = [];
    let rangeTrigger = 0;
    let rangeStart = 0;
    let rangeEnd = 0;

    const binData = require('./bin.json');;

    for (const [key, value] of Object.entries(binData)) { 
        for (let cardNum of value.value) {
            
            if (rangeTrigger === 2) {
                rangeStart = cardNum;
            } else if (rangeTrigger === 1) {
                rangeEnd = cardNum;
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    binArray.push(i);
                }
            } 
            
            if (cardNum === 'range') {
                rangeTrigger = 2;
            } else if (rangeTrigger != 0) {
                rangeTrigger--;
            } else {
                binArray.push(cardNum);
            }

        }
        value.value = binArray;
        binArray = [];
    }

    return binData;
    
}

