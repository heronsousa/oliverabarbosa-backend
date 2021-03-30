import { getRepository } from 'typeorm';

import Post from '../models/Post';

interface Request {
    title: string;
    content: string;
    reading_time: number;
    filename: string;
}

class CreatePostService {
    public async execute({ title, content, reading_time, filename }: Request): Promise<Post> {
        const postsRepository = getRepository(Post);

        const post = postsRepository.create({
            title,
            content,
            reading_time,
            image: filename
        });

        await postsRepository.save(post);

        return post;
    }
}

export default CreatePostService;
