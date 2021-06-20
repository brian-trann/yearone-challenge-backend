const { BadRequestError } = require('../expressError');
const validateQuery = (req, res, next) => {
	try {
		const values = Object.values(req.query);
		if (values.length === 0 || values.every((v) => !v)) {
			throw new BadRequestError();
		}
		return next();
	} catch (error) {
		return next(error);
	}
};
const validateInteraction = (req, res, next) => {
	try {
		const { command } = req.query;
		if (!command) {
			throw new BadRequestError();
		}

		const lowerCommand = command.toLowerCase();
		if (lowerCommand !== 'like' && lowerCommand !== 'dislike') {
			throw new BadRequestError();
		}
		return next();
	} catch (error) {
		return next(error);
	}
};
module.exports = { validateQuery, validateInteraction };
