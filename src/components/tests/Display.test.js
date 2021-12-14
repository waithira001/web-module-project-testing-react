import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import fetchShow from "./../../api/fetchShow";
import { testShow } from "../tests/Show.test";


jest.mock("./../../api/fetchShow");


test('renders without errors with no props', ()=>{
    render(<Display />);

});

test('renders Show component when the button is clicked ', ()=>{
    fetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);
  const button = screen.getByRole("button");
  // act(() => {userEvent.click(button)});
  userEvent.click(button);

  await waitFor(() => {
    const showComp = screen.queryByTestId("show-container");
    expect(showComp).not.toBeNull();
  });
});

test('renders show season options matching your data when the button is clicked', ()=>{
    fetchShow.mockResolvedValueOnce(testShow)

    render(<Display />)
    const button = screen.getByRole("button")
    userEvent.click(button)

    await waitFor(() => {
        const select = screen.queryAllByTestId("season-option")
        expect(select).toHaveLength(3)
    })
});

test('display funciton is called when passed in as a prop', async () => {
    fetchShow.mockResolvedValueOnce(testShow)
    const mockDisplayFunc = jest.fn()

    render(<Display displayFunc={mockDisplayFunc} />)

    const button = screen.getByRole("button")
    userEvent.click(button)

    await waitFor(() => {
        expect(mockDisplayFunc).toBeCalledTimes(1)
    })
})
