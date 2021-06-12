import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Priority, Ticket } from '../model/ticket';
import { AlertService } from '../services/alertService';
import { ApiService } from '../services/api-service';
import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTicketDialogComponent } from '../edit-ticket-dialog/edit-ticket-dialog.component';
import { take, map } from 'rxjs/operators';
import { DeleteTicketDialogComponent } from '../delete-ticket-dialog/delete-ticket-dialog.component';
import { DetailsTicketDialogComponent } from '../details-ticket-dialog/details-ticket-dialog.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'roomNr', 'title', 'priority', 'status', 'roomStatus', 'edit', 'delete', 'complete'];
  dataSource: any;
  result: any;
  tickets: Ticket[] = [];
  dataCleaned: any[] = [];



  constructor(private api: ApiService, private alert: AlertService, public dialog: MatDialog) { }
  

  async ngOnInit(){
    this.getTickets();
  }

  async getTickets(){
    this.dataCleaned = [];
    this.result = await this.api.getAllTickets().catch( error => {
      this.alert.error("Tickets not accessable" + error)
    })

    if(this.result._embedded != null){
      this.tickets = this.result._embedded.ticketList
    }else{
      this.tickets = [];
    }

    this.dataCleaned = this.tickets.map(x => Object.assign({}, x));
    
    //Map the objects to the correct strings - no map because apparantly i am stupid
    for (var i = 0; i<this.tickets.length; i++) {
      if (this.dataCleaned[i].resolved == true) {
        this.dataCleaned[i].resolved = "Geschlossen";
      } else {
        this.dataCleaned[i].resolved = "Offen";
      }

      if (this.dataCleaned[i].room.booked == true) {
        this.dataCleaned[i].room.booked = "Besetzt"
      } else {
        this.dataCleaned[i].room.booked = "Frei"
      }
    }
    console.log(this.dataCleaned)

    this.dataSource = new MatTableDataSource(this.dataCleaned);
  }

  openDetailsDialog(element: Ticket) {
    const dialogConfigEdit = new MatDialogConfig();

    dialogConfigEdit.disableClose = true;
    dialogConfigEdit.autoFocus = true;
    dialogConfigEdit.width = "30%"
    
    dialogConfigEdit.data= {...element}
    
    this.dialog.open(DetailsTicketDialogComponent, dialogConfigEdit);

  }
  

  openEditDialog(element: Ticket) {
    const dialogConfigEdit = new MatDialogConfig();

    dialogConfigEdit.disableClose = true;
    dialogConfigEdit.autoFocus = true;
    dialogConfigEdit.width = "30%"
    
    let oTicket: Ticket = this.tickets.find(e => {
      return element.id == e.id;
    });

    dialogConfigEdit.data= {...oTicket}
    
    
    const dialogRef = this.dialog.open(EditTicketDialogComponent, dialogConfigEdit);

    dialogRef.afterClosed().pipe(take(1)).subscribe((data) => {
      if (data != undefined) {
       this.editTicket(data)
      }
    });
  }

  openDeleteDialog(element: Ticket) {
    const dialogConfigDelete = new MatDialogConfig();

    dialogConfigDelete.disableClose = true;
    dialogConfigDelete.autoFocus = true;

    dialogConfigDelete.data= {
      id: element.id,
    }
    
    const dialogRef = this.dialog.open(DeleteTicketDialogComponent, dialogConfigDelete);

    dialogRef.afterClosed().pipe(take(1)).subscribe((data) => {
      if (data == true) {
        this.deleteTicket(element.id);
      }
    });
  } 

  async editTicket(ticket: Ticket) {
    console.log(ticket);
    let res = await this.api.updateTicket(ticket).catch(error => {
      this.alert.error("Fehler beim Aktualisieren des Tickets"+ error)
    });

    console.log(res);
    this.getTickets();

  }

  async deleteTicket(ticket: number) {
    let res = await this.api.deleteTicket(ticket).catch(error => {
      this.alert.error("Fehler beim Löschen des Tickets"+ error);
    });
    
    console.log(res);
    this.getTickets();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  alterTicket(element: Ticket) {
    element.resolved = !element.resolved;
    this.editTicket(element)
  }
}
