import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog1RecComponent } from './dialog1-rec.component';

describe('Dialog1RecComponent', () => {
  let component: Dialog1RecComponent;
  let fixture: ComponentFixture<Dialog1RecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dialog1RecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog1RecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
