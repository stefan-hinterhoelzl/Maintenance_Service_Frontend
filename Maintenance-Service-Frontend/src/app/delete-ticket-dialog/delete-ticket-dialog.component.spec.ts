import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTicketDialogComponent } from './delete-ticket-dialog.component';

describe('DeletePostDialogComponent', () => {
  let component: DeleteTicketDialogComponent;
  let fixture: ComponentFixture<DeleteTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTicketDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
