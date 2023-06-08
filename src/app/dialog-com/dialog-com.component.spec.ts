import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComComponent } from './dialog-com.component';

describe('DialogComComponent', () => {
  let component: DialogComComponent;
  let fixture: ComponentFixture<DialogComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
