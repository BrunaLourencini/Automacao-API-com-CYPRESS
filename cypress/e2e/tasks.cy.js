/// <reference types="cypress" />

describe('tarefas', () => {

  let testData;

  before(()=> {
    cy.fixture('tasks').then(t => {
      testData = t
    })
  })

  context('cadastro', () => {
    it('deve cadastrar uma nova tarefa', () => {
      const tasksName = 'Estudar js'
      cy.visit('/')
      cy.removeTaskByName(tasksName)
      //cy.get('input[placeholder="Add a new Task"]').type('Ler um livre de node.js')
      cy.get('input[placeholder="Add a new Task"]').type(tasksName)
      cy.contains('button', 'Create').click()
      cy.contains('main div p', tasksName).should('be.visible')
    })

    // AQUI EU FAÇO O CADASTRO DO ESTEPE ABAIXO, UTILIZANDO API
    // LEMBRANDO DE DEIXAR O TESTE INDEPENDENTE
    it('não deve permitir tarefa duplicada', () => {
      const tasksName = testData.dup
      
      cy.removeTaskByName(tasksName.name)
      // Dado que eu tenho uma tarefa duplicada
      cy.postTask(tasksName)
      // Quando faço o cadastro dessa tarefa
      cy.createTask(tasksName.name)
      // Então vejo a mensagem de duplicidade
      cy.get('.swal2-html-container').should('be.visible').should('have.text', 'Task already exists!')
    })

    it('campo obrigatório', () => {
      cy.createTask()
      cy.isRequired('This is a required field')
    })

    context('atualização', () => {
      it('deve concluir uma tarefa', () => {
        const tasksName = {
          name: 'Pagar conta',
          is_done: false
        }
        cy.removeTaskByName(tasksName.name)
        cy.postTask(tasksName)
        cy.visit('/')
        cy.contains('p', tasksName.name).parent().find('button[class*=ItemToggle]').click()
        cy.contains('p', tasksName.name).should('have.css', 'text-decoration-line', 'line-through')
      })
    })

    context('exclusão', () => {
      it('deve remover uma tarefa', () => {
        const tasksName = {
          name: 'Estudar js',
          is_done: false
        }
        cy.removeTaskByName(tasksName.name)
        cy.postTask(tasksName)
        cy.visit('/')
        cy.contains('p', tasksName.name).parent().find('button[class*=ItemDelete]').click()
        cy.contains('p', tasksName.name).should('not.exist')
      })
    })

  })

})

