describe('App Load', () => {

  it('should be able to visit app and render the correct elements', () => {
    cy.visit('http://localhost:3000')
    cy.fixture('/data.js').then((data) => {
        const allMovieTitles = data.movieData.map(movie => movie.title);
        allMovieTitles.forEach(movieTitle => {
          cy.get('div').contains(movieTitle)
        })
    });
    cy.contains('Rancid Tomatillos')
  });

  it('should show an informative Unprocessable Entity error message', () => {
    cy.intercept({
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
      },
      {
        statusCode: 422,
      })
      cy.visit('http://localhost:3000')
      .get('h2').contains('This is a 400 error message on the Movie Library Page')
  });

  it('should show an informative error message when the server is down', () => {
    cy.intercept({
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
      },
      {
        statusCode: 500,
      })
      cy.visit('http://localhost:3000')
      .get('h2').contains('This is a 500 error message on the Movie Library Page')
  });
});

describe('Rancid Tomatillos', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should be able to click on a single movie poster to display that movies details', () => {
    cy.fixture('data').then(data => {

      cy.get('div[id="694919"]').click()
      .get('div[class="movie-details-card"]').should('be.visible')

      let movieOne = data.movieDetails[0];

      cy.get('h1[class="movie-title"]').contains(movieOne.title)
      cy.get('p').contains(movieOne.overview)
      cy.get('p').contains('Action * 2020-09-29 * 1h 22m')
      cy.get('p').contains(movieOne.average_rating)
      cy.get('td').contains(movieOne.budget)
      cy.get('td').contains(movieOne.revenue)

      cy.get('button[class="close-button"]').click()

      cy.get('div[id="539885"]').click()
      .get('div[class="movie-details-card"]')
      .get('h2').contains(data.movieDetails[1].tagline)
    });
  });

  it('should hide the movie poster library when a movie details card is being displayed', () => {
    cy.get('div[id="694919"]').click()
    cy.get('div[class="movie-container"]').should('not.exist')
  })

  it('should be able to click on the x button to close the movie details card and return to the all movie library', () => {
    cy.get('div[id="694919"]').click().get('button[class="close-button"]').click()
    cy.get('div[class="movie-details-card"]').should('not.exist')
    cy.get('div[class="movie-container"]').should('be.visible')
  })

  it('should display an appropriate error message if the network request returns a 400 error', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    },
    {
      statusCode: 404,
    })
    .get('div[id="694919"]').click()
    .get('h2').contains('This is a 400 error message on the Movie Details Card')
  })

  it('should display an appropriate error message if the network request returns a 500 error', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    },
    {
      statusCode: 500,
    })
    .get('div[id="694919"]').click()
    .get('h2').contains('This is a 500 error message on the Movie Details Card')
  })

  it('should provide the user with a way to navigate back to the movie library in the event of an error', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    },
    {
      statusCode: 500,
    })
    .get('div[id="694919"]').click()
    .get('button[class="back-button"]').click()
    cy.get('div[class="movie-details-card"]').should('not.exist')
    cy.get('div[class="movie-container"]').should('be.visible')
  })

});
