export default function iinCheck(binList, data) {

    let payment = [];

    for (const [key, value] of Object.entries(binList)) {
        for (let item of value.value) {
            let number = item.toString();
            if (data.indexOf(number) === 0) {
                payment.push(key);
            }
        }
    }
    
    if (payment.length != 0){
        if (binList[payment[0]].minlength <= data.length & binList[payment[0]].maxlength >= data.length) {
            return true
        }
    } 
    
    return false
    
}





