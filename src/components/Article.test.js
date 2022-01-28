import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testData = {
    id: '3',
    headline: 'Dolphins win SuperBowl!',
    author: 'My Dreams',
    summary: 'Unlikely',
    body: 'to happen'
}

const testDataNoAuth = {
    id: '3',
    headline: 'Dolphins win SuperBowl!',
    summary: 'Unlikely',
    body: 'to happen'
}

test('renders component without errors', ()=> {
    render(<Article article={testData}/>)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testData}/>)

    const headline = screen.queryByTestId(/headline/i);
    const author = screen.queryByTestId(/author/i);
    const summary = screen.queryByTestId(/summary/i);
    const body = screen.queryByTestId(/body/i);

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(body).toBeInTheDocument();

});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testDataNoAuth}/>)

    const headline = screen.queryByTestId(/headline/i);
    const author = screen.queryByTestId(/author/i);
    const summary = screen.queryByTestId(/summary/i);
    const body = screen.queryByTestId(/body/i);

    expect(headline).toBeInTheDocument();
    expect(author).toHaveTextContent(/associated press/i);
    expect(author).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(body).toBeInTheDocument();

});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();

    render(<Article article={testData} handleDelete={handleDelete}/>)

    const button = screen.getByTestId(/deletebutton/i)
    userEvent.click(button)

    waitFor(() => {
        expect(handleDelete).toHaveBeenCalled();
    })
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.