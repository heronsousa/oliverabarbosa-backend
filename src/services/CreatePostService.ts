import { getRepository } from 'typeorm';

import Post from '../models/Post';

interface Request {
    title: string;
    content: string;
    reading_time: number;
}

class CreatePostService {
    public async execute({ title, content, reading_time }: Request): Promise<Post> {
        const postsRepository = getRepository(Post);

        const post = postsRepository.create({
            title,
            content,
            reading_time
        });

        await postsRepository.save(post);

        return post;
    }
}

export default CreatePostService;
