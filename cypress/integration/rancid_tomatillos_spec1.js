import movieData from './data.js';

describe('App', () => {

  it('should be able to visit app and render the correct elements', () => {
    cy.visit('http://localhost:3000')
    const allMovieTitles = movieData.movies.map(movie => movie.title);

    allMovieTitles.forEach(movieTitle => {
      cy.get('div').contains(movieTitle)
    });

    cy.contains('Rancid Tomatillos')
  });

  it('should show an informative error message when the server is down', () => {
    cy.intercept({
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
      },
      {
        statusCode: 422,
      })
      cy.visit('http://localhost:3000')
      .get('h2').should('contain', 'Oh wow. This is embarassing. Try again later? 😅')
  })

  // it('should show an informative error', () => {
  //   cy.intercept({
  //       method: 'GET',
  //       url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
  //     },
  //     {
  //       statusCode: 500,
  //     })
  //     cy.visit('http://localhost:3000')
  //     .get('h2').should('contain', 'Oop, that/s no good 😅')
  // })

});
