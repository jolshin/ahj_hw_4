export default function luhnCheck(cardNum) {
    let sum = 0;
    const cardNumArr = Array.from(String(cardNum), Number);
    const parity = cardNumArr.length % 2;

    for (let i = 0; i < cardNumArr.length - 1; i++) {
        if (i % 2 != parity) {
            sum += cardNumArr[i];
        } else if (cardNumArr[i] > 4) {
            sum += 2 * cardNumArr[i] - 9;
        } else {
            sum += 2 * cardNumArr[i];
        }
    }

    return cardNumArr[cardNumArr.length - 1] == ((10 - (sum % 10)) % 10);
}
