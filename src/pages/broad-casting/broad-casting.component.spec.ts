import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadCastingComponent } from './broad-casting.component';

describe('BroadCastingComponent', () => {
  let component: BroadCastingComponent;
  let fixture: ComponentFixture<BroadCastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BroadCastingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BroadCastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
