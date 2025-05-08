import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesificUsersComponent } from './spesific-users.component';

describe('SpesificUsersComponent', () => {
  let component: SpesificUsersComponent;
  let fixture: ComponentFixture<SpesificUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpesificUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpesificUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
