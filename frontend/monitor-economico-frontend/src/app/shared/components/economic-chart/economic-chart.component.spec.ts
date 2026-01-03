import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicChartComponent } from './economic-chart.component';

describe('EconomicChartComponent', () => {
  let component: EconomicChartComponent;
  let fixture: ComponentFixture<EconomicChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomicChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
