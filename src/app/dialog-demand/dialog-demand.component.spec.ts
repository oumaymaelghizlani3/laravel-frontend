import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDemandComponent } from './dialog-demand.component';

describe('DialogDemandComponent', () => {
  let component: DialogDemandComponent;
  let fixture: ComponentFixture<DialogDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
