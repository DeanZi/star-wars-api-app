const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;


describe('Test /api/films', () => {
    it('Return all 6 films', (done) => {
        chai.request(server)
            .get('/api/films')
            .end((err, res) => {
                // eslint-disable-next-line jest/valid-expect
                expect(res).to.have.status(200);
                // eslint-disable-next-line jest/valid-expect
                expect(res.body).to.be.an('array');
                // eslint-disable-next-line jest/valid-expect
                expect(res.body.length).to.equal(6);
                done();
            });
    }).timeout(10000);
});


describe('Test /api/films?filter=the', () => {
    it('Return all 5 films with "the"', (done) => {
        chai.request(server)
            .get('/api/films?title=the')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(5);

                res.body.forEach((film) => {
                    expect(film).to.have.property('title');
                    expect(film.title.toLowerCase()).to.contain('the');
                });

                done();
            });
    }).timeout(10000);
});

describe('Test /api/films/1?expand=characters', () => {
    it('Return "A New Hope" with expanded characters (at least 1 character in list)', (done) => {
        chai.request(server)
            .get('/api/films/1?expand=characters')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.title).to.equal('A New Hope');
                expect(res.body.characters).to.be.an('array');
                expect(res.body.characters.length).to.be.greaterThan(0);
                done();
            });
    }).timeout(10000);
});
