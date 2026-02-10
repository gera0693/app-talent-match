import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailDialog } from './match-detail-dialog';

describe('MatchDetailDialog', () => {
  let component: MatchDetailDialog;
  let fixture: ComponentFixture<MatchDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchDetailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchDetailDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
