import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLivComponent } from './dialog-liv.component';

describe('DialogLivComponent', () => {
  let component: DialogLivComponent;
  let fixture: ComponentFixture<DialogLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
