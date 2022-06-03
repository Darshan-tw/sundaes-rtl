import {render, screen} from "@testing-library/react";
import {App} from "../App";
import userEvent from "@testing-library/user-event";

test('order complete flow', async ()=>{
    render(<App/>)
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1')

    const mandmInput = await screen.findByRole('checkbox', {name: 'M&Ms'})
    userEvent.click(mandmInput)

    const orderButton = screen.getByRole('button', {name: /order sundae!/i})

    userEvent.click(orderButton)


    const scoopsHeading = screen.getByRole('heading', {name: 'Scoops: $2.00'})
    const toppingsHeading = screen.getByRole('heading', {name: 'Toppings: $1.50'})
    expect(scoopsHeading).toBeInTheDocument()
    expect(toppingsHeading).toBeInTheDocument()
    expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
    expect(screen.getByText('M&Ms')).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox', {name:'I agree to Terms and Conditions'})
    const button = screen.getByRole('button', {name:'Confirm order'})
    userEvent.click(checkbox)
    userEvent.click(button)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(await screen.findByRole('heading', {name: 'Thank You!'})).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

    const newOrderButton = screen.getByRole('button', {name:'Create new order'})
    userEvent.click(newOrderButton)

    expect(screen.getByText('Scoops total: $0.00')).toBeInTheDocument()
    expect(screen.getByText('Toppings total: $0.00')).toBeInTheDocument()
    expect(screen.getByText('Grand total: $0.00')).toBeInTheDocument()

    await screen.findByRole('spinbutton', {name: 'Vanilla'})
    await screen.findByRole('checkbox', {name: 'M&Ms'})



})