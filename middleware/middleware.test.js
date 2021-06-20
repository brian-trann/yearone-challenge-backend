const { BadRequestError } = require('../expressError');
const { validateQuery, validateInteraction } = require('./middleware');

describe('validateQuery', () => {
	test('should throw BadRequestError if no req.query', () => {
		expect.assertions(1);
		const req = { query: {} };
		const res = {};
		const next = (err) => {
			expect(err instanceof BadRequestError).toBeTruthy();
		};

		validateQuery(req, res, next);
	});
	test('should throw BadRequest if invalid req.query', () => {
		expect.assertions(1);
		const req = { query: { fake: 'test' } };
		const res = {};
		const next = (err) => {
			expect(err instanceof BadRequestError).toBeTruthy();
		};

		validateQuery(req, res, next);
	});
	test('should work if req.query is valid', () => {
		expect.assertions(1);
		const req = { query: { title: 'test' } };
		const res = {};
		const next = (err) => {
			expect(err).toBeFalsy();
		};

		validateQuery(req, res, next);
	});
	test('should not work if req.query.title is falsy', () => {
		expect.assertions(1);
		const req = { query: { title: '' } };
		const res = {};
		const next = (err) => {
			expect(err instanceof BadRequestError).toBeTruthy();
		};

		validateQuery(req, res, next);
	});
	test('should work if req.query is valid w/ multiple props', () => {
		expect.assertions(1);
		const req = { query: { title: 'test', page: 1 } };
		const res = {};
		const next = (err) => {
			expect(err).toBeFalsy();
		};

		validateQuery(req, res, next);
	});
	test('should not work if req.query is has a number that is not finite when parsed', () => {
		expect.assertions(1);
		const req = { query: { title: 'test', page: 'z' } };
		const res = {};
		const next = (err) => {
			expect(err).toBeTruthy();
		};

		validateQuery(req, res, next);
	});
});

describe('validateInteraction', () => {
	test('should work when given a valid like command', () => {
		expect.assertions(1);
		const req = { query: { command: 'like' } };
		const res = {};
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		validateInteraction(req, res, next);
	});
	test('should work when given a valid like uppercase command', () => {
		expect.assertions(1);
		const req = { query: { command: 'LIKE' } };
		const res = {};
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		validateInteraction(req, res, next);
	});
	test('should work when given a valid dislike command', () => {
		expect.assertions(1);
		const req = { query: { command: 'dislike' } };
		const res = {};
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		validateInteraction(req, res, next);
	});
	test('should work when given a valid dislike uppercase command', () => {
		expect.assertions(1);
		const req = { query: { command: 'DISLIKE' } };
		const res = {};
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		validateInteraction(req, res, next);
	});
	test('should throw BadRequestError if no req.query', () => {
		expect.assertions(1);
		const req = { query: {} };
		const res = {};
		const next = (err) => {
			expect(err instanceof BadRequestError).toBeTruthy();
		};

		validateInteraction(req, res, next);
	});
	test('should throw BadRequestError if req.query does not have command', () => {
		expect.assertions(1);
		const req = { query: { test: 'test' } };
		const res = {};
		const next = (err) => {
			expect(err instanceof BadRequestError).toBeTruthy();
		};

		validateInteraction(req, res, next);
	});
});
