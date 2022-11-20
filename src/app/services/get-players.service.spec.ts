import { TestBed } from '@angular/core/testing';

import { GetPlayersService } from './get-players.service';

describe('GetPlayersService', () => {
  let service: GetPlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
