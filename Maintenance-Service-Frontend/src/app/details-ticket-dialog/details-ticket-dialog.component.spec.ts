import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTicketDialogComponent } from './details-ticket-dialog.component';

describe('DetailsTicketDialogComponent', () => {
  let component: DetailsTicketDialogComponent;
  let fixture: ComponentFixture<DetailsTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTicketDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
