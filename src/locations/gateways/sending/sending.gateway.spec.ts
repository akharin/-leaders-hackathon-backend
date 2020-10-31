import { Test, TestingModule } from '@nestjs/testing';
import { SendingGateway } from './sending.gateway';

describe('SendingGateway', () => {
  let gateway: SendingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendingGateway],
    }).compile();

    gateway = module.get<SendingGateway>(SendingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
