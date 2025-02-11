import binList from "./data-loader.js";
import luhnCheck from "./Luhn.js";
import iinCheck from "./iin-check.js";


export default class BinCheckWidget {
    constructor(parentEl) {
        this.parentEl = parentEl;
        this.binList = binList();

        this.onSubmit = this.onSubmit.bind(this)
        this.onInput = this.onInput.bind(this)
    }

    static get markup() {
        return `
            <div class='bin-form'>
            <h3>Check your credit card number</h3>
            <ul class="cards">
                <li><span class="card visa" title="Visa">Visa</span></li>
                <li><span class="card master" title="Mastercard">Mastercard</span></li>
                <li><span class="card amex" title="American Express">American Express</span></li>
                <li><span class="card discover" title="Discover">Discover</span></li>
                <li><span class="card jcb" title="JCB">JCB</span></li>
                <li><span class="card diners_club" title="Diners Club">Diners Club</span></li>
                <li><span class="card mir" title="MIR">Mir</span></li>
            </ul>
            <form id="form" class="bin-form-widget" novalidate="novalidate">
                <div class="control">
                    <input class="input" id="card_number" name="card_number" type="text" placeholder="Credit card number" data-original-title="" title="">
                    <button class="submit">Click to Validate</a>
                </div>
            </form>
            </div>
            <div class='bin-check'>
                <h3>Luhn Algorithm Check
                <span class="glyphicon glyphicon-ok validluhn" style="color: green; display: none;"></span>
                <span class="glyphicon glyphicon-remove novalidluhn" style="color: red; display: none;"></span>
                </h3>
                <p class="updateluhn" style="display: block;">We'll check your number against the Luhn Algorithm to see if it is a valid credit card number.</p>
                <p class="validluhn" style="display: none;">The credit card number you entered <strong>passed</strong> the Luhn Check and is therefore a valid credit card number!</p>
                <p class="novalidluhn" style="display: none;">The credit card number you entered <strong>failed</strong> the Luhn Check. It's not valid, did you make a typo?</p>
                <h3>Issuer identification number
                <span class="glyphicon glyphicon-ok validiin" style="color: green; display: none;"></span>
                <span class="glyphicon glyphicon-remove novalidiin" style="color: red; display: none;"></span>
                </h3>
                <p class="updateiin" style="display: block;">The first six or eight digits of a card number (including the initial MII digit) are known as the issuer identification number.
                These identify the card issuing institution that issued the card to the card holder.</p>
                <p class="validiin" style="display: none;">This credit card number belongs to the <strong>Travel and entertainment and banking/financial</strong> industry.</p>
                <p class="novalidiin" style="display: none;">We couldn't find an institution that matched your credit card number. Sorry.</p>
            </div>
        `;
    }

    static get formSelector() {
        return `.bin-form-widget`;
    }

    static get inputSelector() {
        return `.input`;
    }

    static get submitSelector() {
        return `.submit`;
    }

    static get liSelector() {
        return `.card`;
    }

    static get checkSelector() {
        return '.bin-check'
    }

    bindToDOM() {
        this.parentEl.innerHTML = BinCheckWidget.markup;

        this.li = this.parentEl.querySelectorAll(BinCheckWidget.liSelector);
    
        this.formEl = this.parentEl.querySelector(BinCheckWidget.formSelector);
        this.submit = this.formEl.querySelector(BinCheckWidget.submitSelector);
        this.input = this.formEl.querySelector(BinCheckWidget.inputSelector);

        this.checkEl = this.parentEl.querySelector(BinCheckWidget.checkSelector);

        this.formEl.addEventListener('submit', this.onSubmit);
        this.formEl.addEventListener('input', this.onInput)
    }

    onSubmit(e) {
        e.preventDefault();
        
        if (luhnCheck(this.input.value)) {
            this.checkEl.querySelector('span.validluhn').style.display = 'inline-block';
            this.checkEl.querySelector('span.novalidluhn').style.display = 'none';
            this.checkEl.querySelector('p.validluhn').style.display = 'inline-block';
            this.checkEl.querySelector('p.novalidluhn').style.display = 'none';
            this.checkEl.querySelector('p.updateluhn').style.display = 'none';
        } else if (this.input.value === ''){
            this.checkEl.querySelector('span.novalidluhn').style.display = 'none';
            this.checkEl.querySelector('span.validluhn').style.display = 'none';
            this.checkEl.querySelector('p.novalidluhn').style.display = 'none';
            this.checkEl.querySelector('p.validluhn').style.display = 'none';
            this.checkEl.querySelector('p.updateluhn').style.display = 'inline-block';
        } else {
            this.checkEl.querySelector('span.novalidluhn').style.display = 'inline-block';
            this.checkEl.querySelector('span.validluhn').style.display = 'none';
            this.checkEl.querySelector('p.novalidluhn').style.display = 'inline-block';
            this.checkEl.querySelector('p.validluhn').style.display = 'none';
            this.checkEl.querySelector('p.updateluhn').style.display = 'none';
        }

        if (iinCheck(this.binList, this.input.value)) {
            this.checkEl.querySelector('span.validiin').style.display = 'inline-block';
            this.checkEl.querySelector('span.novalidiin').style.display = 'none';
            this.checkEl.querySelector('p.validiin').style.display = 'inline-block';
            this.checkEl.querySelector('p.novalidiin').style.display = 'none';
            this.checkEl.querySelector('p.updateiin').style.display = 'none';
        } else if (this.input.value === ''){
            this.checkEl.querySelector('span.novalidiin').style.display = 'none';
            this.checkEl.querySelector('span.validiin').style.display = 'none';
            this.checkEl.querySelector('p.novalidiin').style.display = 'none';
            this.checkEl.querySelector('p.validiin').style.display = 'none';
            this.checkEl.querySelector('p.updateiin').style.display = 'inline-block';
        } else {
            this.checkEl.querySelector('span.novalidiin').style.display = 'inline-block';
            this.checkEl.querySelector('span.validiin').style.display = 'none';
            this.checkEl.querySelector('p.novalidiin').style.display = 'inline-block';
            this.checkEl.querySelector('p.validiin').style.display = 'none';
            this.checkEl.querySelector('p.updateiin').style.display = 'none';
        }


    }

    onInput(e) {
        let data = e.target.value
        let payment = [];

        for (const [key, value] of Object.entries(this.binList)) {
            for (let item of value.value) {
                let number = item.toString();
                if (data.indexOf(number) === 0) {
                    payment.push(key);
                }
            }
        }

        if (data) {
            for (let li of this.li) {
                if (!payment.includes(li.title)) {
                    li.classList.add('disabled')
                } else {
                    li.classList.remove('disabled')
                }
            }

        } else if (!data){
            for (let li of this.li) {
                li.classList.remove('disabled')
            }

        }
    }
}