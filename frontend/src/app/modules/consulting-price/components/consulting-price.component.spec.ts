import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingPriceComponent } from './consulting-price.component';

describe('ConsultingPriceComponent', () => {
  let component: ConsultingPriceComponent;
  let fixture: ComponentFixture<ConsultingPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultingPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultingPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
