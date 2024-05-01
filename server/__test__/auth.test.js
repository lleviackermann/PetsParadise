const request = require("supertest")

const baseURL = "http://localhost:8000/";

describe('POST /auth/login', () => {
    it('should return 200 OK and a token if login is successful', async () => {
        const response = await request(baseURL)
            .post('auth/login')
            .send({ flag: "User", userId: 'chk240404@gmail.com', password: 'Koushik12' });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it("should return 401 Error and a error if password is wrong", async () => {
        const response = await request(baseURL)
            .post('auth/login')
            .send({ flag: "User", userId: 'chk240404@gmail.com', password: 'Koushik12121' });

        expect(response.status).toBe(401);
        expect(response.body.msg).toBe("Invalid Credentials");
    })
});


describe('POST /auth/register/user', () => {
    it('Should return 500 and error of duplicate key', async () => {
        const response = await request(baseURL)
            .post('auth/register/user')
            .send({ firstName: "koushik", 
            lastName: "kumar",
            email: 'chk240404@gmail.com', 
            password: 'Koushik12' 
        });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Email Id already exists");
    })
})

describe('GET /auth/orders', () => {
    it('Should return a list of orders', async () => {
        const response = await request(baseURL).get('auth/orders');

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('status');
    })
})