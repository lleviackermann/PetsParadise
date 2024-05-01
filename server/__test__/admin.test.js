const request = require("supertest")

const baseURL = "http://localhost:8000/";

let adminToken = "";
describe('POST /auth/login', () => {
    it('should return 200 OK and a token if login is successful', async () => {
        const response = await request(baseURL)
            .post('auth/login')
            .send({ flag: "Admin", userId: 'admin101', password: 'Admin@101' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        adminToken = response.body.token;
    });
});


describe('GET /profile/admin/getAllUsers', () => {
    it('should return 200 and an array of users', async () => {
        const response = await request(baseURL)
            .get('profile/admin/getAllUsers')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('email');
        expect(response.body[0]).toHaveProperty('moneyspent');
        expect(response.body[0]).toHaveProperty('appointments');
    })
})

describe('GET /profile/admin/getAllEmployee', () => {
    it('should return 200 and an array of formatted employees data', async () => {
        const response = await request(baseURL)
            .get('profile/admin/getAllEmployee')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        response.body.forEach((employee) => {
            expect(employee).toHaveProperty('id');
            expect(employee).toHaveProperty('name');
            expect(employee).toHaveProperty('email');
            expect(employee).toHaveProperty('role');
            expect(employee).toHaveProperty('appointments');
            expect(employee).toHaveProperty('ordersDelievered'); // Typo: should be 'ordersDelivered'
        });
    });
});

describe('GET /profile/admin/getAllProducts', () => {
    it('should return 200 and an array of formatted products data', async () => {

      const response = await request(baseURL)
        .get('profile/admin/getAllProducts')
        .set('Authorization', `Bearer ${adminToken}`);
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
  
      response.body.forEach((product) => {
        expect(product).toHaveProperty('id'); 
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('petType');
        expect(product).toHaveProperty('rating');
        expect(product).toHaveProperty('breed');
      });
    });
  });