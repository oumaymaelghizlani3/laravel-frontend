import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog1LivComponent } from './dialog1-liv.component';

describe('Dialog1LivComponent', () => {
  let component: Dialog1LivComponent;
  let fixture: ComponentFixture<Dialog1LivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dialog1LivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog1LivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
