const User = require('../models/userModel')
const mongoose = require('mongoose')

describe('User Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save a user successfully', async () => {
        const validUser = new User({ name: 'John Doe' });
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe('John Doe');
    });

    it('should fail when saving a user without required fields', async () => {
        const invalidUser = new User({});
        let err;
        try {
            const savedUser = await invalidUser.save();
            error = savedUser;
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });
});
