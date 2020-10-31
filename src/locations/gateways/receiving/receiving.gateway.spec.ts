import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingGateway } from './receiving.gateway';

describe('ReceivingGateway', () => {
  let gateway: ReceivingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivingGateway],
    }).compile();

    gateway = module.get<ReceivingGateway>(ReceivingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
