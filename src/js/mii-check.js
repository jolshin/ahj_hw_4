export default function miiCheck(binList, data) {

    let payment = [];

    for (const [key, value] of Object.entries(binList)) {
        for (let item of value.value) {
            let number = item.toString();
            if (data.indexOf(number) === 0) {
                payment.push(key);
            }
        }
    }
    return payment;
}



