import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SeqUserModel from '../database/models/SeqUserModel'

import { Response } from 'superagent';

import { role, token, userFromDB, validLogin } from './mocks/user.mock'

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App()

describe('Login endpoint integration tests', () => {
  beforeEach(sinon.restore)

  it('should return status 200 and the correct token for a successful login', async () => {
    // Arrange
    const mockFindOneReturn = SeqUserModel.build(userFromDB);
    sinon.stub(SeqUserModel, 'findOne').resolves(mockFindOneReturn)

    // Act
    const { status, body } = await chai.request(app).post('/login').send(validLogin)

    // Assert
    expect(status).to.equal(200);
    expect(body.token.split('.')[0]).to.be.equal(token.split('.')[0]);
  })

})

describe('Role endpoint integration tests', () => {
  beforeEach(sinon.restore)

  it('should return status 200 and the correct role when authenticated', async () => {
    // Arrange
    const authHeader = `Bearer ${token}`;

    // Act
    const { status, body } = await chai.request(app).get('/login/role').set('Authorization', authHeader);

    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(role);

  })

})