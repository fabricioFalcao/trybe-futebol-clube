import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Example from '../database/models/ExampleModel';
import SeqTeamModel from '../database/models/SeqTeamModel';

import { Response } from 'superagent';

import { mockedTeamsList } from './mocks/teams.mocks'

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App()

describe('Teams endpoints integration tests', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  beforeEach(sinon.restore)

  it('should return status 200 and the list of all teams from database', async () => {
    // Arrange
    const mockFindAllTeams = SeqTeamModel.bulkBuild(mockedTeamsList)
    sinon.stub(SeqTeamModel, 'findAll').resolves(mockFindAllTeams)

    // Act
    const { status, body } = await chai.request(app).get('/teams')

    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedTeamsList);
  });

  it('should return status 200 and the correct team when searching by id', async () => {
    // Arrange
    const mockFindTeamById = SeqTeamModel.build(mockedTeamsList[0])
    sinon.stub(SeqTeamModel, 'findByPk').resolves(mockFindTeamById)

    // Act
    const { status, body } = await chai.request(app).get('/teams/1')

    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedTeamsList[0]);
  });
});
