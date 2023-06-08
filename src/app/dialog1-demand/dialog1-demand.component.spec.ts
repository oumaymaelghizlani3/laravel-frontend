import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog1DemandComponent } from './dialog1-demand.component';

describe('Dialog1DemandComponent', () => {
  let component: Dialog1DemandComponent;
  let fixture: ComponentFixture<Dialog1DemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dialog1DemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog1DemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
