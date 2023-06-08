import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecComponent } from './dialog-rec.component';

describe('DialogRecComponent', () => {
  let component: DialogRecComponent;
  let fixture: ComponentFixture<DialogRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
