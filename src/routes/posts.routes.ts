import { Router } from 'express';
import multer from 'multer';

import CreatePostService from '../services/CreatePostService';
import uploadConfig from '../config/upload';

const postsRouter = Router();
const upload = multer(uploadConfig);

postsRouter.get('/', (request, response) => {

    return response.json({ ok: true });
});

postsRouter.post('/', upload.single('image'), async (request, response) => {
    const { user_id, title, content, reading_time } = request.body;
    const { filename } = request.file;

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({
        user_id,
        title,
        content,
        reading_time,
        filename
    });

    delete post.user.password;

    return response.json(post);
});

export default postsRouter;
