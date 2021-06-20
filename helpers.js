/**
 * getTotalPagesFromResults converts number of results into a page, based off
 * itemsPerPage
 * 
 * - totalResults default value: 0
 * - itemsPerPage default value: 10
 * @param {Number} totalResults Number || Parse-able string
 * @param {Number} itemsPerPage Number 
 * @returns Number
 */
const getTotalPagesFromResults = (totalResults = 0, itemsPerPage = 10) => {
	if (!Number.isFinite(+totalResults) || !Number.isFinite(itemsPerPage)) {
		throw new Error('totalResults must be finite');
	}
	return Math.floor(+totalResults / itemsPerPage) + 1;
};

module.exports = { getTotalPagesFromResults };
