import miiCheck from "./mii-check";

export default function iinCheck(binList, data) {

    let payment = miiCheck(binList, data);
    
    if (payment.length != 0){
        if (binList[payment[0]].minlength <= data.length & binList[payment[0]].maxlength >= data.length) {
            return true;
        }
    } 
    return false;
}





