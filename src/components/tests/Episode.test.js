import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


const testEpisode = {
    id:1,
    name: "",
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "",
    runtime: 1
}

const testEpisodeWithoutImage = {
    //Add in approprate test data structure here.
        id:1,
        name: "",
        image: "",
        season: 1,
        number: 1,
        summary: "",
        runtime: 1
}
    


test("renders without error", () => {
    render(<Episode episode={testEpisode}/>);

});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={{...testEpisode, summary: "summary test"}}/>);

    const summary = screen.queryByText(/summary test/i);

    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).not.toBeNull();
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisodeWithoutImage}/>);

    const altTag = screen.getAllByAltText("./stranger_things.png")
    expect(altTag).toBeTruthy()

    //OR

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', './stranger_things.png')
});
