
import iinCheck from "../iin-check";
import miiCheck from "../mii-check";
import luhnCheck from "../Luhn";
import binList from "../data-loader.js";

const _list = binList();

describe("MII, IIN, Luhn check tests", () => {
  test.each([
    ['4556467913532850', 'Visa', true, true],
    ['4532740312351794', 'Visa', true, true],
    ['4034058707650662732', 'Visa', true, false],
    ['4034058707650662733123213', 'Visa', false, false],
    ['6011768738522735', 'Discover', true, true],
    ['6011566237679729', 'Discover', true, true],
    ['6011180697629145282', 'Discover', true, false],
    ['6011180', 'Discover', false, false],
    ['30575041769618', 'Diners Club', true, true],
    ['30365838725001', 'Diners Club', true, true],
    ['36482631708550', 'Diners Club', true, false],
    ['3058253', 'Diners Club', false, false],
    ['2720990064697557', 'Mastercard', true, true],
    ['5333521680773761', 'Mastercard', true, true],
    ['5277961557795863', 'Mastercard', true, false],
    ['527796155779586932233224', 'Mastercard', false, false],
    ['3589793489842883', 'JCB', true, true],
    ['3545217416533574', 'JCB', true, true],
    ['3531088634895373432', 'JCB', true, false],
    ['3531088634895373431212112', 'JCB', false, false],
    ['379383149778337', 'American Express', true, true],
    ['344940709263380', 'American Express', true, true],
    ['346626990427743', 'American Express', true, false],
    ['3466269904', 'American Express', false, false],
    ['2200222247782380', 'MIR', true, true],
    ['2201444347782388', 'MIR', true, true],
    ['2203444347431281216', 'MIR', true, false],
    ['220344434743128121832', 'MIR', false, false],
  ])('check card number %s (should get cards issuer: %s, IIN and MII check: %s, Luhn: %s)', (data, payment, iin, luhn) => {

    console.log(data)

    const result = [miiCheck(_list, data)[0], iinCheck(_list, data), luhnCheck(data)];
    const expected = [payment, iin, luhn];


    expect(result).toEqual(expected);

  });
});
