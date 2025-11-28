
import { rest } from 'msw';

export const handlers = [
    rest.get('/api/data', (req, res, ctx) => {
        return res(ctx.json({ data: '这里是模拟的数据' }));
    }),
];
