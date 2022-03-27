import { rest } from "msw";

export const handlers = [
    rest.get("http://localhost:3000/scops", (req, res, ctx) => {
        return res(
            ctx.json([
                {name: 'Chocolate', imagePath:'/image/chocolate.png'},
                {name: 'Vanilla', imagePath:'/image/vanilla.png'},
            ])
        )
    })
]