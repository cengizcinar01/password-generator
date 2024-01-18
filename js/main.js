() => {
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

        DOM.charInput.addEventListener('Input', (e) => {
            DOM.charLength.textContent = e.target.value;
        });

        DOM.submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const charLength = DOM.charInput.value;
            const numbers = DOM.numbersSwitch.checked;
            const symbols = DOM.symbolsSwitch.checked;
        });

        const copyToClipboard = async (str) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                return await navigator.clipboard.writeText(str);
            }

            throw new Error('Clipboard not supported');
        };
    });
};
