import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Card from '../src/Card'
import { expect, it, test } from 'vitest'

describe('Card', () => {

    const cardProps = {
        title: "Income",
        detail: "Food",
        amount: "100"
    }

    test("renders correct title",()=>{
        render(<Card {...cardProps} />);
        expect(screen.getByText(cardProps.title)).toBeInTheDocument()
    })

    test("renders correct detail",()=>{
        render(<Card {...cardProps} />);
        expect(screen.getByText(cardProps.detail)).toBeInTheDocument()
    })

    test("renders correct amount",()=>{
        render(<Card {...cardProps} />);
        expect(screen.getByText(`$${cardProps.amount}`)).toBeInTheDocument()
    })

})