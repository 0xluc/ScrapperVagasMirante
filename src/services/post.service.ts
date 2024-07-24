import { keyv } from "@/db/db";
import { PostEntity } from "@/models/post";

export class PostService {
    async getPost(id: string) {
        const message = await keyv.get(id);
        if (message) {
            return JSON.parse(message);
        }
        return null;
    }
    async createPost(post: PostEntity) {
        const serielizedPost = JSON.stringify(post);
        const result = await keyv.set(post.codigoVaga, serielizedPost);
        return result;
    }
}
