import { PostEntity } from "./post";

export const fakePostEntity = {
    codigoVaga: "12345",
    localVaga: "Location 1",
    dataVaga: "2024-07-24",
    nomeVaga: "Job Title 1",
    descVaga: "Description 1",
};
describe("Post", () => {
    it("can be created", () => {
        const obj = new PostEntity(fakePostEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakePostEntity,
        });
    });
});
