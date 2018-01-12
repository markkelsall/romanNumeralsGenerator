class RomanNumeralGenerator {
    generate (input) {
        try {
            const validateResponse = this._validate(input);
            if (validateResponse && validateResponse.valid) {
                const processResponse = this._process(input);
                return processResponse.number;
            } else {
                return validateResponse;
            }
        } catch (e) {
            const message = `There was an error when trying to process the value entered: ${input}. Error: ${e}`;
            return {
                message,
                valid: false
            };
        }
    }

    _validate (input) {

        if (!input) {
            return {
                valid: false,
                message: `Please enter a valid number.`
            }
        }

        //TODO: check and trim spaces
        
        if (isNaN(input)) {
            return {
                valid: false,
                message: `${input} is not a valid number.`
            }
        }

        if (input < 0 || input > 3999) {
            return {
                valid: false,
                message: `Sorry, number must be between 1 - 3999.`
            };
        }

        //TODO: check for decimal numbers
        
        return {
            valid: true
        };
    }

    _process (input) {
        const map = [
            { decimal: 1, romanNumeral: 'I' },
            { decimal: 4, romanNumeral: 'IV' },
            { decimal: 5, romanNumeral: 'V' },
            { decimal: 9, romanNumeral: 'IX' },
            { decimal: 10, romanNumeral: 'X' },
            { decimal: 40, romanNumeral: 'XL' },
            { decimal: 50, romanNumeral: 'L' },
            { decimal: 90, romanNumeral: 'XC' },
            { decimal: 100, romanNumeral: 'C' },
            { decimal: 400, romanNumeral: 'CD' },
            { decimal: 500, romanNumeral: 'D' },
            { decimal: 900, romanNumeral: 'CM' },
            { decimal: 1000, romanNumeral: 'M' }
        ];
        
        //just incase something goes wrong, maxIterations should stop it in a continuous loop
        let maxIterations = 6;
        let i = 0;
        let forceBreak = false;

        let romanNumerals = '';
        
        while (input > 0) {
            let max = map[0];

            // highest mapped decimal less than or equal num
            map.map(arrayItem => {
                if (arrayItem.decimal <= input) {
                    max = arrayItem;
                }
            });
            
            romanNumerals += max.romanNumeral;
            input -= max.decimal;
            
            i++;
            if (i > 10) {
                forceBreak = true;
                break;
            }
        }
        
        if (forceBreak) {
            return {
                valid: false,
                message: `Error, stopped processing. Too many iterations.`
            };
        } else {
            return {
                valid: true,
                number: romanNumerals
            };
        }
    }
}

module.exports = RomanNumeralGenerator;
