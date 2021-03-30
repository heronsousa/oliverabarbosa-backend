import { Router } from 'express';

import CreatePostService from '../services/CreatePostService';

const postsRouter = Router();

postsRouter.get('/', (request, response) => {

    return response.json({ ok: true });
});

postsRouter.post('/', async (request, response) => {
    const { title, content, reading_time } = request.body;

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({
        title,
        content,
        reading_time
    });

    return response.json(post);
});

export default postsRouter;
