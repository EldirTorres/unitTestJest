const handlers = require('./index')

describe('Endpoints', () => {
    describe('users', () => {
        describe('get', () => {
            it('return to user json', async() => {
                //Mock
                const axios = {
                    get: jest.fn().mockResolvedValue({ data: 1 }),
                }
                //Para ver todo lo que tiene el mock
                //console.log(axios.get)
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn() //esto es un spia 
                }
                //Al haber inyectado axios nos facilita el test
                await handlers({ axios }).get({}, res)
                //Para saber con que propiedades se llamo
                //console.log(res.status.mock)
                //console.log(res.status.mock.calls)
                expect(res.status.mock.calls).toEqual([
                    [200]
                ])
                expect(res.send.mock.calls).toEqual([
                    [1]
                ])
            });
        });
        describe('post', () => {
            it('creates a resourses ', async () => {
                const axios = {
                    post: jest.fn().mockResolvedValue({ data: 1 }),
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                const req = {
                    body: 'request body'
                }
                await handlers({ axios }).post(req, res)
                expect(res.status.mock.calls).toEqual([
                    [201]
                ])
                expect(res.send.mock.calls).toEqual([
                    [1]
                ])
                expect(axios.post.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users', 'request body']
                ])
            });
        });
        describe('put', () => {
            it('update resource', async () => {
                const axios = {
                    put: jest.fn().mockResolvedValue({ data: 1 }),
                }
                const req = {
                    body: 'request body',
                    params: {
                        id: 12, //Puede ser cualquier valor
                    },
                }
                const res = {
                    sendStatus: jest.fn(),
                }
                await handlers({ axios }).put(req, res)
                expect(axios.put.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users/12', 'request body']
                ])
                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])
            });
        });
        describe('delete', () => {
            it('deletes a resource', async () => {
                const req = {
                    params: {
                        id: 54, //Puede ser cualquier valor
                    },
                }
                const axios = {
                    delete: jest.fn()
                }
                const res = {
                    sendStatus: jest.fn(),
                }
                await handlers({ axios }).delete(req, res)
                expect(axios.delete.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users/54']
                ])
                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])
            });
        });
    });
});