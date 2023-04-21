import { TestBed } from '@angular/core/testing';

import { StabledifusionService } from './stabledifusion.service';

describe('StabledifusionService', () => {
  let service: StabledifusionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StabledifusionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
