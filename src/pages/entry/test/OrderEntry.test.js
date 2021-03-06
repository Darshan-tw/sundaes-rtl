import {render, screen, waitFor} from "../../../test-utils/testing-library-utils"
import {OrderEntry} from "../OrderEntry";
import {server} from "../../../mocks/server";
import {rest} from "msw";

describe('Order entry', ()=> {
    test('render alert when server throws error', async () => {
        server.resetHandlers(
            rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
                res(ctx.status(500))
            ),
            rest.get('http://localhost:3030/toppings',
                (req, res, ctx) =>
                    res(ctx.status(500))
            )
        )
        render(<OrderEntry setOrderPhase={jest.fn()}/>)
        await waitFor(async ()=> {
            const alert = await screen.findAllByRole('alert')
            expect(alert).toHaveLength(2)
        })

    })
})