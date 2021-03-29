import movieData from './data.js';

describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should be able to visit app and render the correct elements', () => {
    const allMovieTitles = movieData.movies.map(movie => movie.title);

    allMovieTitles.forEach(movieTitle => {
      cy.get('div').contains(movieTitle)
    });

    cy.contains('Rancid Tomatillos')
  });
  
});
