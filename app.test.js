const request = require('supertest');
const app = require('./app');

// describe is for grouping tests
describe('Todos', ()=> {
    it('GET /todos --> array todos', () => {
        return ( request(app)
            .get('/todos')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name : expect.any(String),
                            completed : expect.any(Boolean)
                        })
                    ])
                )
            })
        )
    })

    it('GET /todos/:id --> single todo', () => {
        return ( request(app)
            .get('/todos/0')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name : expect.any(String),
                        completed : expect.any(Boolean)
                    })
                )
            })
        )
    })

    it('GET /todos/:id --> 404 if not found', () => {
        return ( request(app)
            .get('/todos/1999934934')
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message : expect.any(String)
                    })
                )
            })
        )
    })

    it('POST /todos --> created todo', () => {
        return ( request(app)
            .post("/todos")
            .send({
                name : 'do dishes'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: "Successfully created a todo.",
                        result: expect.objectContaining({
                            id: expect.any(Number),
                            name : 'do dishes',
                            completed : false
                        }) 
                    })
                )
            })
        )
    })

    it('POST /todos --> validates request body', () => {
        return ( request(app)
            .post('/todos')
            .send({})
            .expect(422)
        )
    })
})