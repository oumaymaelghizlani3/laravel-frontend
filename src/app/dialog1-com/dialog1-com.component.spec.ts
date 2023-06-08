import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog1ComComponent } from './dialog1-com.component';

describe('Dialog1ComComponent', () => {
  let component: Dialog1ComComponent;
  let fixture: ComponentFixture<Dialog1ComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dialog1ComComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog1ComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
