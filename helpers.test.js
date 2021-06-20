const { getTotalPagesFromResults } = require('./helpers');
describe('getTotalPagesFromResults', () => {
	test('should return 1 if no argument or falsy argument', () => {
		expect(getTotalPagesFromResults()).toBe(1);
		expect(getTotalPagesFromResults(undefined)).toBe(1);
		expect(getTotalPagesFromResults(null)).toBe(1);
	});
	test('should return 1 when given "1" and 1', () => {
		expect(getTotalPagesFromResults('1')).toBe(1);
		expect(getTotalPagesFromResults(1)).toBe(1);
	});
	test('should return 2 when given "10" and 10', () => {
		expect(getTotalPagesFromResults('10')).toBe(2);
		expect(getTotalPagesFromResults(10)).toBe(2);
	});
	test('should return 11 when given "101" and 101', () => {
		expect(getTotalPagesFromResults('101')).toBe(11);
		expect(getTotalPagesFromResults(101)).toBe(11);
	});
});
