describe('config can come from env', () => {
	test('should work', () => {
		process.env.SECRET_KEY = 'abc';
		process.env.PORT = '5000';
		process.env.DATABASE_URL = 'other';
		process.env.NODE_ENV = 'other';
		process.env.API_KEY = 'this-is-a-key';

		const config = require('./config');
		expect(config.SECRET_KEY).toEqual('abc');
		expect(config.PORT).toEqual(5000);
		expect(config.getDatabaseUri()).toEqual('other');
		expect(config.API_KEY).toEqual('this-is-a-key');

		delete process.env.SECRET_KEY;
		delete process.env.PORT;
		delete process.env.DATABASE_URL;

		expect(config.getDatabaseUri()).toEqual('yearone_takehome');
		process.env.NODE_ENV = 'test';

		expect(config.getDatabaseUri()).toEqual('yearone_takehome_test');
	});
});
