import { describe, it } from 'vitest';
import createOption from '../../src/modules/createOption';

describe('Test', () => {
	it('createOption function', ({ expect }) => {
		expect(createOption('EUR', { EUR: { name: 'euro', symbol: '€' } }).outerHTML).toBe(
			'<option value="EUR">euro (€)</option>',
		);
	});
});
