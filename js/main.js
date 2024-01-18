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
};
