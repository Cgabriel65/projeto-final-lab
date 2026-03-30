import { TestBed } from '@angular/core/testing';

import { Texts } from './texts';

describe('Texts', () => {
  let service: Texts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Texts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
