import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SeqUserModel from '../database/models/SeqUserModel'

import { Response } from 'superagent';

import { role, token, userFromDB } from './mocks/user.mock'

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
    const { status, body } = await chai.request(app).post('/login')

    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(token);
  })

})

describe('Role endpoint integration tests', () => {
  beforeEach(sinon.restore)

  it('should return status 200 and the correct role when authenticated', async () => {
    // Arrange
    const mockFindOneReturn = SeqUserModel.build(userFromDB);
    sinon.stub(SeqUserModel, 'findByPk').resolves(mockFindOneReturn)

    // Act
    const { status, body } = await chai.request(app).get('/login/role')

    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(role);
  })

})