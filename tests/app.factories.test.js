import { createRouter } from '../routes/app.route.js';
import { createApp } from '../app.js';

describe('test factory apps', () => {
    it('createRouter should return router', () => {
        const response = createRouter();

        expect(typeof response.get).toBe('function');
    });

    it('createApp should return app', () => {
        const response = createApp();

        expect(typeof response.listen).toBe('function');
    });
});