require('dotenv').config();
const User = require('../models/userModel');
const { getUser } = require('../api/v1/middlewares/userMiddleware');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');

jest.setTimeout(20000); // Increase timeout

describe('User Middleware Test', () => {
    let req, res, next;

    beforeAll(async () => {
        try {
            await mongoose.connect(process.env.DATABASE_URL);
        } catch (error) {
            console.error('Database connection error:', error);
        }
    });

    afterAll(async () => {
        try {
            await mongoose.connection.close();
        } catch (error) {
            console.error('Error closing the database connection:', error);
        }
    });

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    afterEach(async () => {
        try {
            await User.deleteMany({});
        } catch (error) {
            console.error('Error cleaning up users:', error);
        }
    });

    it('should call next() when user is found by ID', async () => {
        const user = new User({ name: 'Jane Doe' });
        await user.save();

        req.params.id = user._id;

        await getUser(req, res, next);

        expect(next).toBeCalled();
        expect(res.user).toBeDefined();
        expect(res.user.name).toBe('Jane Doe');
    });

    it('should return 404 when user is not found by ID', async () => {
        req.params.id = new mongoose.Types.ObjectId();

        await getUser(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(JSON.parse(res._getData())).toMatchObject({ message: 'Cannot find user' });
    });

    it('should call next() when user is found by name', async () => {
        const user = new User({ name: 'John Doe' });
        await user.save();

        req.query.name = 'John Doe';

        await getUser(req, res, next);

        expect(next).toBeCalled();
        expect(res.user).toBeDefined();
        expect(res.user.name).toBe('John Doe');
    });

    it('should return 404 when user is not found by name', async () => {
        req.query.name = 'Non-existent User';

        await getUser(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(JSON.parse(res._getData())).toMatchObject({ message: 'Cannot find user' });
    });
});
