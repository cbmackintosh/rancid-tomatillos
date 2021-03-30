
describe('Rancid Tomatillos', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should be able to click on a single movie poster to display that movies details', () => {
    cy.get('div[id="694919"]').click()
    .get('div[class="movie-details-card"]').should('be.visible')
    .get('h1[class="movie-title"]').contains('Money Plane')
  })
  
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
    .get('h2').contains('There was a problem loading this title. Try again later.')
  })

  it('should display an appropriate error message if the network request returns a 400 error', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
    },
    {
      statusCode: 500,
    })
    .get('div[id="694919"]').click()
    .get('h2').contains('There was a problem loading this title. Try again later.')
  })

});