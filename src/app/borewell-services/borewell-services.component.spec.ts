import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorewellServicesComponent } from './borewell-services.component';

describe('BorewellServicesComponent', () => {
  let component: BorewellServicesComponent;
  let fixture: ComponentFixture<BorewellServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorewellServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorewellServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
