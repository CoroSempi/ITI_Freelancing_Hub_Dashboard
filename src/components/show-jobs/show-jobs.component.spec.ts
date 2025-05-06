import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobsComponent } from './show-jobs.component';
import { NgClass } from '@angular/common';

describe('ShowJobsComponent', () => {
  let component: ShowJobsComponent;
  let fixture: ComponentFixture<ShowJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowJobsComponent,NgClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
