import { keyv } from './db'; // Adjust the path as needed

describe('Keyv instance', () => {
    it('should set and get a value', async () => {
        const key = 'test-key';
        const value = 'test-value';

        await keyv.set(key, value);
        const retrievedValue = await keyv.get(key);

        expect(retrievedValue).toBe(value);
    });

    it('should return undefined for a non-existent key', async () => {
        const key = 'non-existent-key';

        const retrievedValue = await keyv.get(key);

        expect(retrievedValue).toBeUndefined();
    });

    it('should delete a value', async () => {
        const key = 'test-key-to-delete';
        const value = 'test-value';

        await keyv.set(key, value);
        await keyv.delete(key);
        const retrievedValue = await keyv.get(key);

        expect(retrievedValue).toBeUndefined();
    });

    afterAll(async () => {
        // Close the Keyv connection after tests
        await keyv.clear();
        await keyv.opts.store.clear();
    });
});

