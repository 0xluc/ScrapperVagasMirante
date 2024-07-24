import { keyv } from "@/db/db";
import { PostService } from "./post.service"; // Assuming the service is in a file named post.service.ts
import { PostEntity } from "@/models/post";

// Mock the keyv dependency (consider using a mocking library)
jest.mock("@/db/db", () => ({
    keyv: {
        get: jest.fn(),
        set: jest.fn(),
    },
}));

describe("PostService", () => {
    let service: PostService;
    let mockKeyv: any; // Any type for mocked keyv

    beforeEach(() => {
        service = new PostService();
        mockKeyv = keyv; // Access the mocked keyv from jest.mock
    });

    describe("getPost", () => {
        it("should return a parsed PostEntity if key exists", async () => {
            const expectedPost = {
                title: "Test Post",
                content: "This is a test content",
            };
            mockKeyv.get.mockResolvedValueOnce(JSON.stringify(expectedPost));

            const post = await service.getPost("123"); // Replace with an example ID

            expect(post).toEqual(expectedPost);
            expect(mockKeyv.get).toHaveBeenCalledWith("123"); // Check if get was called with the ID
        });

        it("should return null if key does not exist", async () => {
            mockKeyv.get.mockResolvedValueOnce(null);

            const post = await service.getPost("456"); // Replace with another example ID

            expect(post).toBe(null);
            expect(mockKeyv.get).toHaveBeenCalledWith("456");
        });
    });

    describe("createPost", () => {
        it("should stringify and set the post to keyv", async () => {
            const newPost: PostEntity = {
                codigoVaga: "123",
                nomeVaga: "New Post",
                descVaga: "Some new content",
                dataVaga: "Some date",
                localVaga: "Some local",
            };

            const result = await service.createPost(newPost);

            expect(result).toBeUndefined(); // Likely undefined for set operation
            expect(mockKeyv.set).toHaveBeenCalledWith(
                newPost.codigoVaga,
                JSON.stringify(newPost)
            );
        });
    });
});
