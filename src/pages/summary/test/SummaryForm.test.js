import {screen, render} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import {SummaryForm} from '../SummaryForm'

describe('State of Checkbox and Button on initial page load', ()=>{
    test('checkbox should unchecked on page render', ()=> {
        render(<SummaryForm/>)
        const checkbox = screen.getByRole('checkbox', {name:'I agree to Terms and Conditions'})
        expect(checkbox).not.toBeChecked()
    })
    test('button should be disabled on page render', ()=> {
        render(<SummaryForm/>)
        const button = screen.getByRole('button', {name:'Submit'})
        expect(button).toBeDisabled()
    })
    test('button should be enabled on checkbox checked', ()=> {
        render(<SummaryForm/>)
        const checkbox = screen.getByRole('checkbox', {name:'I agree to Terms and Conditions'})
        const button = screen.getByRole('button', {name:'Submit'})
        userEvent.click(checkbox)
        expect(button).toBeEnabled()
    })
    test('button should be disabled on checkbox click two times on checkbox', ()=> {
        render(<SummaryForm/>)
        const checkbox = screen.getByRole('checkbox', {name:'I agree to Terms and Conditions'})
        const button = screen.getByRole('button', {name:'Submit'})
        userEvent.click(checkbox)
        expect(button).toBeEnabled()
        userEvent.click(checkbox)
        expect(button).toBeDisabled()
        expect(checkbox).not.toBeChecked()
    })

    test('popover should be hidden on first render', ()=> {
        render(<SummaryForm/>)
        const popover = screen.queryByText(/no ice cream will actually will be delivered/i)
        expect(popover).not.toBeInTheDocument()
    })

    test('popover should be shown on hover on Terms and Conditions text and disappear on unhover',  ()=> {
        render(<SummaryForm/>)
        const termsText = screen.getByText(/Terms and Conditions/i)
        userEvent.hover(termsText)
        const popover = screen.queryByText(/No ice cream will actually be delivered/i)
        expect(popover).toBeInTheDocument()
    })
})