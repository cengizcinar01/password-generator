(() => {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const DOM = {
        alert: $('.alert'),
        password: $('.password'),
        copyBtn: $('.copy-btn'),
        charLength: $('.label-container span'),
        charInput: $('.slider-range'),
        numbersSwitch: $('input[name="numbers-switch"]'),
        symbolsSwitch: $('input[name="symbols-switch"]'),
        strengthBars: $$('.strength-meter .bars .bar'),
        submitBtn: $('.submit-btn'),
    };

    DOM.copyBtn.addEventListener('click', (e) => {
        copyToClipboard(DOM.password.textContent);
        DOM.alert.style.visibility = 'visible';

        setTimeout(() => {
            DOM.alert.style.visibility = 'hidden';
        }, 3000);
    });

    DOM.charInput.addEventListener('input', (e) => {
        DOM.charLength.textContent = e.target.value;
    });

    DOM.submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const charLength = DOM.charInput.value;
        const numbers = DOM.numbersSwitch.checked;
        const symbols = DOM.symbolsSwitch.checked;

        const password = generateRandomPassword(charLength, numbers, symbols);
        setFontSize(password);
        DOM.password.textContent = password;
        setBars(checkPasswordStrength(password));
    });

    const copyToClipboard = async (str) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return await navigator.clipboard.writeText(str);
        }

        throw new Error('Clipboard not supported');
    };

    const replaceRandomChar = (password, replacementChar) => {
        const randomIndex = Math.floor(Math.random() * password.length);
        const passwordArray = password.split('');
        passwordArray[randomIndex] = replacementChar;
        return passwordArray;
    };

    const generateRandomPassword = (length, includeNumbers, includeSymbols) => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!?@#$%^&*()_';

        let charset = lowercaseChars + uppercaseChars;
        if (includeNumbers) charset += numberChars;
        if (includeSymbols) charset += symbolChars;

        let password = [];
        let hasNumber = false;
        let hasSymbol = false;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            const randomChar = charset[randomIndex];
            password.push(randomChar);

            if (includeNumbers && numberChars.includes(randomChar)) {
                hasNumber = true;
            }

            if (includeSymbols && symbolChars.includes(randomChar)) {
                hasSymbol = true;
            }
        }

        if (includeNumbers && !hasNumber) {
            const randomNumIndex = Math.floor(Math.random() * numberChars.length);
            password = replaceRandomChar(password.join(''), numberChars[randomNumIndex]);
        }

        if (includeSymbols && !hasSymbol) {
            const randomSymbolIndex = Math.floor(Math.random() * symbolChars.length);
            password = replaceRandomChar(password.join(''), symbolChars[randomSymbolIndex]);
        }

        if (includeNumbers && includeSymbols && (!hasNumber || !hasSymbol)) {
            let randomIndex = Math.floor(Math.random() * password.length);

            if (!hasNumber) {
                const randomNumIndex = Math.floor(Math.random() * numberChars.length);
                password = replaceRandomChar(password.join(''), numberChars[randomNumIndex]);
                randomIndex = (randomIndex + 1) % length;
            }

            if (!hasSymbol) {
                const randomSymbolIndex = Math.floor(Math.random() * symbolChars.length);
                password = replaceRandomChar(password.join(''), symbolChars[randomSymbolIndex]);
            }
        }

        return password.join('');
    };

    const setFontSize = (password) => {
        const length = password.length;

        if (length < 20) {
            DOM.password.style.fontSize = '1.5rem';
        } else if (length < 25) {
            DOM.password.style.fontSize = '1.25rem';
        } else if (length < 27) {
            DOM.password.style.fontSize = '1.15rem';
        } else {
            DOM.password.style.fontSize = '1rem';
        }
    };

    const checkPasswordStrength = (password) => {
        let score = 0;

        if (/[!?@#$%^&*()_]/g.test(password)) score += 10;
        if (/[0-9]/g.test(password)) score += 10;

        if (password.length < 8) {
            score = 0;
        } else if (password.length >= 8 && password.length <= 12) {
            score += 10;
        } else if (password.length >= 13 && password.length < 20) {
            score += 30;
        } else if (password.length >= 20) {
            score += 40;
        }

        return score;
    };

    const styleBars = (start, end, bgColor, borderColor) => {
        for (let i = start; i < end; i++) {
            DOM.strengthBars[i].style.backgroundColor = `var(--${bgColor})`;
            DOM.strengthBars[i].style.border = `1px solid var(--${borderColor})`;
        }
    };

    const setBars = (score) => {
        const barCount = DOM.strengthBars.length;

        styleBars(0, barCount, 'dark', 'light-gray');

        if (score < 10) {
            styleBars(0, 1, 'danger', 'danger');
        } else if (score < 20) {
            styleBars(0, 2, 'warning', 'warning');
        } else if (score < 40) {
            styleBars(0, 3, 'warning', 'warning');
        } else {
            styleBars(0, barCount, 'safe', 'safe');
        }
    };
})();
