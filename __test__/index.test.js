const RomanNumeralGenerator = require('../index');

let rng;
describe('validate', () => {
    beforeEach(() => {
        rng = new RomanNumeralGenerator();
    });
    test('it validates with a valid number', () => {
        expect(rng._validate('123').valid).toEqual(true);
    });
    test('it fails validation with an invalid number', () => {
        expect(rng._validate('123abc').valid).toEqual(false);
    });
    test('it fails validation with a number too big', () => {
        expect(rng._validate('10000000').valid).toEqual(false);
    });
    test('it fails validation with a negative number', () => {
        expect(rng._validate('-10000000').valid).toEqual(false);
    });
    test('it force breaks', () => {
        let response = rng._process('1000000000000000');
        expect(response.valid).toEqual(false);
        expect(response.message).toEqual(`Error, stopped processing. Too many iterations.`);
    });
});

describe('generate', () => {
    beforeEach(() => {
        rng = new RomanNumeralGenerator();
    });
    test('it validates with a valid number', () => {
        expect(rng.generate('1')).toEqual('I');
        expect(rng.generate('4')).toEqual('IV');
        expect(rng.generate('5')).toEqual('V');
        expect(rng.generate('9')).toEqual('IX');
        expect(rng.generate('10')).toEqual('X');
        expect(rng.generate('40')).toEqual('XL');
        expect(rng.generate('50')).toEqual('L');
        expect(rng.generate('90')).toEqual('XC');
        expect(rng.generate('100')).toEqual('C');
        expect(rng.generate('400')).toEqual('CD');
        expect(rng.generate('500')).toEqual('D');
        expect(rng.generate('900')).toEqual('CM');
        expect(rng.generate('1000')).toEqual('M');
        expect(rng.generate('2018')).toEqual('MMXVIII');
        expect(rng.generate('3999')).toEqual('MMMCMXCIX');
    });
});
