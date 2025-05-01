/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ChatsService } from './Chats.service';

describe('Service: Chats', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatsService],
    });
  });

  it('should ...', inject([ChatsService], (service: ChatsService) => {
    expect(service).toBeTruthy();
  }));
});
