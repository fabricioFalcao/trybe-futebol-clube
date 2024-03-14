import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SeqTeamModel from '../database/models/SeqTeamModel';

import { Response } from 'superagent';

import SeqMatchModel from '../database/models/SeqMatchModel';
import { mockedInputMatch, mockedMatch, mockedMatchList, mockedReturnList } from './mocks/match.mock';
import { token } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App()

describe('Teams endpoints integration tests', () => {
  beforeEach(sinon.restore)

  it('should return status 200 and the list of all teams matches for no query', async () => {
    // Arrange
    const mockFindAllMatches = SeqMatchModel.bulkBuild(mockedMatchList, {
      include: [
        { model: SeqTeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: SeqTeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    })
    sinon.stub(SeqMatchModel, 'findAll').resolves(mockFindAllMatches)

    // Act
    const { status, body } = await chai.request(app).get('/matches')

    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedReturnList);
  });

  it('should return status 200 and the correct message when finishing an match', async () => {
    // Arrange
    sinon.stub(SeqMatchModel, 'update').resolves([1])
    const authHeader = `Bearer ${token}`;

    // Act
    const { status, body } = await chai.request(app).patch('/matches/41/finish').set('Authorization', authHeader)

    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: "Finished" });
  });

  it('should return status 200 and the correct message when updating an match', async () => {
    // Arrange
    sinon.stub(SeqMatchModel, 'update').resolves([1])
    const authHeader = `Bearer ${token}`;

    // Act
    const { status, body } = await chai.request(app).patch('/matches/41').set('Authorization', authHeader)

    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: "Updated" });
  });

  it('should return status 200 and the correct data when creating an match', async () => {
    // Arrange
    const mockCreateReturn = SeqMatchModel.build(mockedMatch)
    sinon.stub(SeqMatchModel, 'create').resolves(mockCreateReturn)
    const authHeader = `Bearer ${token}`;

    // Act
    const { status, body } = await chai.request(app).post('/matches').send(mockedInputMatch).set('Authorization', authHeader)

    // Assert
    expect(status).to.equal(201);
    expect(body).to.deep.equal(mockedMatch);
  });
});
