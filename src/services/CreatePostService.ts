import { getRepository } from 'typeorm';

import Post from '../models/Post';
import User from '../models/User';

interface Request {
    user_id: string;
    title: string;
    content: string;
    reading_time: number;
    filename: string;
}

class CreatePostService {
    public async execute({ user_id, title, content, reading_time, filename }: Request): Promise<Post> {
        const postsRepository = getRepository(Post);
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { id: user_id },
        });

        const post = postsRepository.create({
            user_id,
            user,
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
