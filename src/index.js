import './styles.css';

const cardNumberInput = document.getElementById('card-number');
const cardTypeDiv = document.getElementById('card-type');
const cardIcons = {
    visa: document.getElementById('visa'),
    mastercard: document.getElementById('mastercard'),
    amex: document.getElementById('amex'),
    mir: document.getElementById('mir'),
};

cardNumberInput.addEventListener('input', () => {
    const cardNumber = cardNumberInput.value;
    const cardType = getCardType(cardNumber);
    const isValid = isValidCardNumber(cardNumber);
    cardTypeDiv.textContent = cardType ? `${cardType} (${isValid ? 'Valid' : 'Invalid'})` : 'Unknown';
    highlightCardIcon(cardType);
});

function getCardType(number) {
    const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        mir: /^220[0-4][0-9]{12}$/,
    };

    for (const [card, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(number)) {
            return card;
        }
    }
    return null;
}

function highlightCardIcon(cardType) {
    Object.values(cardIcons).forEach(icon => icon.classList.remove('active'));
    if (cardType && cardIcons[cardType]) {
        cardIcons[cardType].classList.add('active');
    }
}


function isValidCardNumber(number) {
    const arr = number.split('').reverse().map(x => parseInt(x));
    const lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => {
        if (i % 2 === 0) {
            val *= 2;
            if (val > 9) val -= 9;
        }
        return acc + val;
    }, 0);
    sum += lastDigit;
    return sum % 10 === 0;
}