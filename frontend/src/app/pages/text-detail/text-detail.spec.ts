import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDetail } from './text-detail';

describe('TextDetail', () => {
  let component: TextDetail;
  let fixture: ComponentFixture<TextDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(TextDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
