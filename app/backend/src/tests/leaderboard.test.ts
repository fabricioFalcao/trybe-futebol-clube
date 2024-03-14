import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SeqUserModel from '../database/models/SeqUserModel'

import { Response } from 'superagent';


import SeqTeamModel from '../database/models/SeqTeamModel';
import { mockedTeamsList } from './mocks/team.mocks';
import SeqMatchModel from '../database/models/SeqMatchModel';
import { mockedMatches, mockedResults } from './mocks/leaderboard.mock';


chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App()

describe('Leaderboard endpoint integration tests', () => {
  beforeEach(sinon.restore)

  it('should return status 200 and the correct leaderboard', async () => {
    // Arrange
    const mockFindAllTeams = SeqTeamModel.bulkBuild(mockedTeamsList)
    sinon.stub(SeqTeamModel, 'findAll').resolves(mockFindAllTeams)

    const mockFindAllMatches = SeqMatchModel.bulkBuild(mockedMatches)
    sinon.stub(SeqMatchModel, 'findAll').resolves(mockFindAllMatches)

    // Act
    const { status, body } = await chai.request(app).get('/leaderboard')

    // Assert
    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(mockedResults);
  })

})
