const supertest = require('supertest');
const app = require("../src");
const request = supertest(app);
describe('GET /' , ()=>{
    describe('Api should be working fine' , ()=>{
        test('give true status code while open server' , async()=>{
            const res = await request.get('/')
            expect(res.status).toBe(200)
        })
    })
})

describe('POST /posts' , ()=>{
    describe('given content and userId for post' , ()=>{
        test('should create a new post with status code 200' , async()=>{
            const res = await request.post('/posts').send({
                content: 'Hello Good Evening',
                user_id:'643230f590488663e5232217'
            })
            expect(res.status).toBe(200)
        })
    })
})


describe('POST /users' , ()=>{
    describe('given name , email and bio of users' , ()=>{
        test('should create a new user with status code 200' , async()=>{
            const res = await request.post('/users').send({
                name : `${new Date().getTime()}`,
                email:`${new Date().getTime()}@gmail.com`,
                bio:'Happy Boy'
            })
            expect(res.status).toBe(200)
        })
        test('should throw an error with status code 401 while createing duplicate users' , async()=>{
            const res = await request.post('/users').send({
                name : 'Faizan Alam',
                email:'faizan@gmail.com',
                bio:'Full Stack Web Developer'
            })
            expect(res.status).toBe(401)
        })
    })
})
 


describe('GET /users' , ()=>{
    describe('user data should given' , ()=>{
        test('should give a user by userId' , async()=>{
            const res = await request.get(`/users/643230f590488663e5232217`)
            expect(res.status).toBe(200)
        })
        test('should throw error by wrong userId' , async()=>{
            const res = await request.get(`/users/643230f590488663e5232`)
            expect(res.status).toBe(401)
        })
        test('should give all users' , async()=>{
            const res = await request.get('/users/analytics')
            expect(res.status).toBe(200)
        })
        test('should give top 5 active users' , async()=>{
            const res = await request.get('/users/analytics/top_active')
            expect(res.status).toBe(200)
        })
    })
})

describe('GET /posts' , ()=>{
    describe('post data should given' , ()=>{
        test('should give a user by post id' , async()=>{
            const res = await request.get(`/posts/6432315b9e266a0e984c5d49`)
            expect(res.status).toBe(200)
        })
        test('should throw error by wrong post id' , async()=>{
            const res = await request.get(`/posts/643230f590488663e5232`)
            expect(res.status).toBe(401)
        })
        test('should give all posts' , async()=>{
            const res = await request.get('/posts/analytics')
            expect(res.status).toBe(200)
        })
        test('should give top 5 liked posts' , async()=>{
            const res = await request.get('/posts/analytics/topliked')
            expect(res.status).toBe(200)
        })
    })
})

describe('PUT /request' , ()=>{
        test('post content should be changed' , async()=>{
            const res = await request.put(`/posts/6432315b9e266a0e984c5d49`).send({
                content : 'RCB VS LSG'
            })
            expect(res.status).toBe(200)
        })
        test('User bio and name should be changed' , async()=>{
            const res = await request.put(`/users/6432dd8565dcff4d355e43db`).send({
                name : 'Bilal Khan',
                bio:'Happy boy'
            })
            expect(res.status).toBe(200)
        })
})


describe('DELETE /request' , ()=>{

    test('post should be deleted' , async()=>{
        const posts1 = await request.get('/posts/analytics')
        let posts = await posts1;
        const res = await request.delete(`/posts/${posts._body.post[posts._body.post.length -1]._id}`)
        expect(res.status).toBe(200)
    })
    test('User should be deleted' , async()=>{
        const users1 = await request.get('/users/analytics')
        let users = await users1;
        const res = await (await request.delete(`/users/${users._body.user[users._body.user.length -1]._id}`))
        expect(res.status).toBe(200)
    })
})


describe('POST /like' , ()=>{
    test('post like should be increases' , async()=>{
        const res = await request.post(`/posts/like/6432315b9e266a0e984c5d49`)
        expect(res.status).toBe(200)
    })

    test('post like should be increases' , async()=>{
        const res = await request.post(`/posts/unlike/6432315b9e266a0e984c5d49`)
        expect(res.status).toBe(200)
    })
   
})