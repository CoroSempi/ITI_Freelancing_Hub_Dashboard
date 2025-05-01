/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentChatComponent } from './student-chat.component';

describe('StudentChatComponent', () => {
  let component: StudentChatComponent;
  let fixture: ComponentFixture<StudentChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
