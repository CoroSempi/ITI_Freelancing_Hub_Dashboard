import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksLayoutComponent } from './tracks-layout.component';

describe('TracksLayoutComponent', () => {
  let component: TracksLayoutComponent;
  let fixture: ComponentFixture<TracksLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
