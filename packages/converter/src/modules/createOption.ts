function createOption(currency: string, currencies: any) {
	let option = document.createElement('option');
	option.text = currencies[currency].name + ' (' + currencies[currency].symbol + ')';
	option.value = currency;
	return option;
}

export default createOption;
