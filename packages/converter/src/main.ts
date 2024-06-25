import createOption from './modules/createOption';
import './style.css';

const getAllCurrencies = await fetch(
	'https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_PyMJ4rD5jHcet1MQkTr804JpFbG2lRurOB1L95Zu',
);

const { data: currencies } = await getAllCurrencies.json();

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');

if (fromCurrencySelect && toCurrencySelect) {
	for (let currency in currencies) {
		fromCurrencySelect.appendChild(createOption(currency, currencies));
		toCurrencySelect.appendChild(createOption(currency, currencies));
	}
}

const form = document.querySelector('form');

if (form) {
	form.onsubmit = async (event) => {
		event.preventDefault();

		const amountToConvert: HTMLInputElement | null = document.querySelector('#amountToConvert');
		const fromCurrency: HTMLSelectElement | null = document.querySelector('#fromCurrency');
		const toCurrency: HTMLSelectElement | null = document.querySelector('#toCurrency');
		const result = document.querySelector('#result');
		const resultSection = document.querySelector('.hide');

		if (amountToConvert && fromCurrency && toCurrency && result) {
			let amount = amountToConvert?.valueAsNumber;
			let from = fromCurrency?.value;
			let to = toCurrency?.value;

			let getCurrencieValueForSelected = await fetch(
				'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_PyMJ4rD5jHcet1MQkTr804JpFbG2lRurOB1L95Zu&base_currency=' +
					from,
			);

			const { data: changeValues } = await getCurrencieValueForSelected.json();

			let res = Math.round(amount * changeValues[to] * 100) / 100;

			if (resultSection) {
				resultSection.classList.remove('hide');
			}
			result.textContent = res.toString() + ' ' + to;
		}
	};
}
