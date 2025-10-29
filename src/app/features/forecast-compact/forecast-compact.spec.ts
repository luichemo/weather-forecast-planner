import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastCompact } from './forecast-compact';

describe('ForecastCompact', () => {
  let component: ForecastCompact;
  let fixture: ComponentFixture<ForecastCompact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastCompact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastCompact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
