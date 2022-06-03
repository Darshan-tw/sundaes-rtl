import {render, screen, waitFor} from "../../../test-utils/testing-library-utils"
import userEvent from "@testing-library/user-event";
import {Options} from "../Options";
import {OrderDetailsProvider} from "../../../context/OrderDetails";
import {OrderEntry} from "../OrderEntry";

describe('Total Updates',  ()=>{
    test('Scoops total calculate', async () => {
        render(<Options optionType={'scoops'}></Options>)
        const scoopsSubtotal = screen.getByText('Scoops total: $', {exact: false})
        expect(scoopsSubtotal).toHaveTextContent('0.00')
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1')
        expect(scoopsSubtotal).toHaveTextContent('2.00')

        const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '2')
        expect(scoopsSubtotal).toHaveTextContent('6.00')
    })

    test('topping total calculate', async () => {
        render(<Options optionType={'toppings'}></Options>)
        const toppingsSubtotal = screen.getByText('Toppings total: $', {exact: false})
        expect(toppingsSubtotal).toHaveTextContent('0.00')
        const mandmInput = await screen.findByRole('checkbox', {name: 'M&Ms'})
        userEvent.clear(mandmInput)
        userEvent.click(mandmInput)
        expect(toppingsSubtotal).toHaveTextContent('1.50')

        const hotFudgeInput = await screen.findByRole('checkbox', {name: 'Hot fudge'})
        userEvent.clear(hotFudgeInput)
        userEvent.click(hotFudgeInput)
        expect(toppingsSubtotal).toHaveTextContent('3.00')
    })
})

describe('grand total', ()=>{
    test('Grand total updates properly if scoops is added first', async ()=>{
        render(<OrderEntry/>)
        const grandTotal = screen.getByRole('heading', {name:/grand total: \$/i})
        expect(grandTotal).toHaveTextContent('0.00')
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1')

        expect(grandTotal).toHaveTextContent('2.00')
    })
    test('Grand total updates properly if toppings is added first', async ()=>{
        render(<OrderEntry/>)
        const mandmInput = await screen.findByRole('checkbox', {name: 'M&Ms'})
        userEvent.clear(mandmInput)
        userEvent.click(mandmInput)
        const grandTotal = screen.getByRole('heading', {name:/grand total: \$/i})
        expect(grandTotal).toHaveTextContent('1.50')
    })
})