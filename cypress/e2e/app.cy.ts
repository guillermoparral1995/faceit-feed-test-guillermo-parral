describe('Navigation', () => {
    it('should navigate to a specific post', () => {
      cy.visit('http://localhost:3000/')
   
      cy.get('a[href="/1"]').click()
   
      cy.url().should('include', '/1')
   
      cy.get('h2').contains('Eryn MacGiolla Pheadair')
    })

    it('should navigate back to main page from a specific post', () => {
      cy.visit('http://localhost:3000/')
   
      cy.get('a[href="/1"]').click()
   
      cy.url().should('include', '/1')
   
      cy.get('.p-4 > nav').click()
   
      cy.url().should('eq', 'http://localhost:3000/')
    })

    it('should load more posts when scrolling down', () => {
      cy.visit('http://localhost:3000/')
   
      cy.scrollTo('bottom')

      cy.get('a[href="/21"]').contains('Midge Hildred')
    })


    it('should trigger new post when clicking action', () => {
      cy.visit('http://localhost:3000/')
   
      cy.get('.border').click()

      cy.get('a[href="/1001"]').should('exist')
    })

    it('should scroll up automatically to new post when clicking action', () => {
      cy.visit('http://localhost:3000/')

      cy.scrollTo('bottom')
      cy.scrollTo('bottom')
      cy.get('.border').click()

      cy.get('a[href="/1002"]').should('exist')
      cy.window().its('scrollY').should('eq', 0)
    })
  })