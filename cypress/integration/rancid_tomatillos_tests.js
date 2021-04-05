describe('Rancid Tomatillos', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('App Load', () => {

    it('should be able to visit app and render the correct elements', () => {
      cy.fixture('/data.js').then((data) => {
          const allMovieTitles = data.movieData.map(movie => movie.title);
          allMovieTitles.forEach(movieTitle => {
            cy.get('div').contains(movieTitle)
          })
      });
      cy.contains('Rancid Tomatillos')
      cy.get('form').should('be.visible')
    });

    it('should show an informative Unprocessable Entity error message', () => {
      cy.get('h2').contains('Loading...')
      cy.intercept({
          method: 'GET',
          url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
        },
        {
          statusCode: 422,
        })
        cy.wait(5000).get('h3').contains('Sorry, something went wrong. Please try again later.')
    });

    it.only('should show an informative error message when the server is down', () => {
      cy.intercept({
          method: 'GET',
          url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
        },
        {
          statusCode: 500,
        })
        cy.wait(5000).get('h3').contains(`Sorry, something's wrong with our system. Please try again later.`)
    });
  });

  describe('Movie Details', () => {

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
      cy.wait(2000).get('div[id="694919"]').click()
      cy.get('div[class="movie-container"]').should('not.exist')
    });

    it('should be able to click on the x button to close the movie details card and return to the all movie library', () => {
      cy.get('div[id="694919"]').click().get('button[class="close-button"]').click()
      cy.get('div[class="movie-details-card"]').should('not.exist')
      cy.get('div[class="movie-container"]').should('be.visible')
    });


//These may occur on page reload

    // it('should display an appropriate error message if the network request returns a 400 error', () => {
    //   cy.get('input').type('action')
    //   cy.intercept({
    //     method: 'GET',
    //     url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    //   },
    //   {
    //     statusCode: 404,
    //   })
    //   cy.wait(5000).reload()
    //   cy.wait(5000).get('h2').contains('This is a 400 error message on the Movie Details Card')
    // });
    //
    // it.only('should display an appropriate error message if the network request returns a 500 error', () => {
    //   cy.get('div[id="694919"]').click()
    //   cy.intercept({
    //     method: 'GET',
    //     url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    //   },
    //   {
    //     statusCode: 500,
    //   })
    //   cy.wait(5000).reload()
    //   .get('h2').contains('This is a 500 error message on the Movie Details Card')
    // });

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
    });
  });

  describe('Search Bar', () => {

    it('should update rendered movies by title as user types out a search', () => {
      cy.get('input').type('T').wait(3000).type('h').type('e').wait(3000)
      cy.fixture('/data.js').then((data) => {

          const foundMovieTitles = data.movieData.filter(movie => movie.title.includes('The'));
          foundMovieTitles.forEach(movie => {
            cy.get('div').contains(movie.title)
          });
          cy.get('div[id="539885"]').should('not.exist')
      });
    });

    it('should update rendered movies by genre as user types out a search', () => {
      cy.get('input').type('A').wait(3000)
      .type('ction').wait(3000)
      .fixture('/data.js').then((data) => {
          const searchedMovieTitles = data.movieDetails.filter(movie => movie.genres.includes('Action'));

          searchedMovieTitles.forEach(movie => {
            cy.get('div').contains(movie.title)
          });
          cy.get('div[id="627290"]').should('not.exist')
      });
    });

    it('should update rendered movies by overview as user types out a search', () => {
      cy.get('input').type('d').wait(2000).type('angerous').wait(3000)
      .fixture('/data.js').then((data) => {
          const searchedMovieTitles = data.movieDetails.filter(movie => movie.overview.includes('our'));
          console.log(data)
          searchedMovieTitles.forEach(movie => {
            cy.get('div').contains(movie.title)
          });
          cy.get('div[id="152812"]').should('not.exist')
      });
    });

    it('should not be visible on Movie Details view', () => {
      cy.get('div[id="694919"]').click()
      cy.get('form').should('not.be.visible')
    });

    it('should accept caps lock, lowercase, mixed searches and still produce reasonable results', () => {
      cy.get('input').type('d').wait(2000).type('ANGeroUs')
      cy.fixture('/data.js').then((data) => {
          const searchedMovieTitles = data.movieDetails.filter(movie => movie.overview.includes('dangerous') || movie.overview.includes('Dangerous'));
          searchedMovieTitles.forEach(movie => {
            cy.get('div').contains(movie.title)
          });
          cy.get('div[id="337401"]').should('not.exist')
      });
    });

    it('should display an informative message if search yields no results', () => {
      cy.get('input').type('asdfjgl;alskfd')
      cy.get('div').contains('There are no matches for your search. Try again?')
    });

    it('should provide the user with a way to navigate back to the movie library in the event of an error', () => {
      cy.expect(true).to.equal(false)
    });
  });

});
