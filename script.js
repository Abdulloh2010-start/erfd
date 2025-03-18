let key = '761faeb14c5445cd31bf132d';
let apiKey = `https://v6.exchangerate-api.com/v6/${key}/latest/USD`;
const selectFrom = document.getElementById('currency1');
const selectTo = document.getElementById('currency2');
const Result = document.getElementById('Result');
const moneyInput = document.getElementById('money');
const result = document.getElementById('result');
const iconFrom = document.getElementById('iconFrom');
const iconTo = document.getElementById('iconTo');
const flags = {
    USD: "https://flagcdn.com/us.svg",
    EUR: "https://flagcdn.com/eu.svg",
    RUB: "https://flagcdn.com/ru.svg",
    JPY: "https://flagcdn.com/jp.svg",
    GBP: "https://flagcdn.com/gb.svg",
    CNY: "https://flagcdn.com/cn.svg",
    AUD: "https://flagcdn.com/au.svg",
    CAD: "https://flagcdn.com/ca.svg",
    CHF: "https://flagcdn.com/ch.svg",
    UZS: "https://flagcdn.com/uz.svg",
    KZT: "https://flagcdn.com/kz.svg",
    TRY: "https://flagcdn.com/tr.svg",
    INR: "https://flagcdn.com/in.svg",
    BRL: "https://flagcdn.com/br.svg",
    KRW: "https://flagcdn.com/kr.svg",
    SEK: "https://flagcdn.com/se.svg",
    NOK: "https://flagcdn.com/no.svg",
    PLN: "https://flagcdn.com/pl.svg",
    MXN: "https://flagcdn.com/mx.svg",
    HKD: "https://flagcdn.com/hk.svg",
    SGD: "https://flagcdn.com/sg.svg",
    ZAR: "https://flagcdn.com/za.svg",
    DKK: "https://flagcdn.com/dk.svg",
    MYR: "https://flagcdn.com/my.svg",
    TWD: "https://flagcdn.com/tw.svg",
    IDR: "https://flagcdn.com/id.svg",
    PHP: "https://flagcdn.com/ph.svg",
    CZK: "https://flagcdn.com/cz.svg",
    HUF: "https://flagcdn.com/hu.svg",
    ILS: "https://flagcdn.com/il.svg",
    SAR: "https://flagcdn.com/sa.svg",
    AED: "https://flagcdn.com/ae.svg",
    ARS: "https://flagcdn.com/ar.svg",
    CLP: "https://flagcdn.com/cl.svg",
    COP: "https://flagcdn.com/co.svg",
    EGP: "https://flagcdn.com/eg.svg",
    NGN: "https://flagcdn.com/ng.svg",
    VND: "https://flagcdn.com/vn.svg",
    PKR: "https://flagcdn.com/pk.svg",
    LKR: "https://flagcdn.com/lk.svg",
    UAH: "https://flagcdn.com/ua.svg",
    QAR: "https://flagcdn.com/qa.svg",
    KWD: "https://flagcdn.com/kw.svg",
    BHD: "https://flagcdn.com/bh.svg",
    OMR: "https://flagcdn.com/om.svg",
};
function updateFlag(selectElement, imgElement) {
    const currencyCode = selectElement.value;
    if (flags[currencyCode]) {
        imgElement.src = flags[currencyCode];
    } else {
        imgElement.src = "https://flagcdn.com/un.svg";
    }
}
async function fetchApi() {
    try {
        const response = await fetch(apiKey);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            selectFrom.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            selectTo.appendChild(option2);
        });
        updateFlag(selectFrom, iconFrom);
        updateFlag(selectTo, iconTo);
    } catch (error) {
        console.log('Error fetching API:', error);
    }
}
async function showResult() {
    try {
        const inputValue = parseFloat(moneyInput.value);
        const from = selectFrom.value;
        const to = selectTo.value;
        const url = `https://v6.exchangerate-api.com/v6/${key}/pair/${from}/${to}/${inputValue}`;
        const response = await fetch(url);
        const data = await response.json();
        result.textContent = `${data.conversion_result} ${to}`;
    } catch (error) {
        console.log('Error:', error);
    }
}
selectFrom.addEventListener('change', () => updateFlag(selectFrom, iconFrom));
selectTo.addEventListener('change', () => updateFlag(selectTo, iconTo));
Result.addEventListener('click', showResult);
fetchApi();