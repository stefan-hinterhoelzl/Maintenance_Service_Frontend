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

  displayedColumns: string[] = ['date', 'roomNr', 'title', 'priority', 'status', 'roomStatus', 'edit', 'delete'];
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
    this.tickets = [];
    
    let res = await this.api.getAllTicketsFirestore();
    res.forEach((doc) => {
      let curr: Ticket = {...doc.data()};
      curr.id = doc.id;
      this.tickets.push(curr);
    });

    this.dataCleaned = this.tickets.map(x => Object.assign({}, x));
    
    //Map the objects to the correct strings - no map because apparantly i am stupid
    for (var i = 0; i<this.tickets.length; i++) {
      if (this.dataCleaned[i].resolved == true) {
        this.dataCleaned[i].resolved = "Geschlossen";
      } else {
        this.dataCleaned[i].resolved = "Offen";
      }
    }

    this.dataCleaned.sort((a,b) => {
      return a.createdTimeInSeconds - b.createdTimeInSeconds;
    });

    this.dataSource = new MatTableDataSource(this.dataCleaned);
  }

  openDetailsDialog(element: Ticket) {
    const dialogConfigEdit = new MatDialogConfig();

    dialogConfigEdit.disableClose = true;
    dialogConfigEdit.autoFocus = true;
    dialogConfigEdit.width = "30%"

    let oTicket: Ticket = this.tickets.find(e => {
      return element.id == e.id;
    });
    
    dialogConfigEdit.data= {...oTicket}
    
    const dialogRef = this.dialog.open(DetailsTicketDialogComponent, dialogConfigEdit);

    dialogRef.afterClosed().pipe(take(1)).subscribe((data) => {
      console.log(data);
      if (data == true) {
        this.alterTicket(oTicket);
      }
    });

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
    let res = await this.api.updateTicketFirestore(ticket);
    this.alert.success("Ticket wurde bearbeitet!");

    this.getTickets();

  }

  async deleteTicket(ticket: String) {
    let res = await this.api.deleteTicketFirestore(ticket);
    this.alert.success("Ticket wurde gelöscht!");
    
    this.getTickets();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  alterTicket(element: Ticket) {
    let status: boolean = !element.resolved;
    element.resolved = status;
    if (status == true) {
      element.resolvedTimeInSeconds = Date.now();
    }else {
      element.resolvedTimeInSeconds = 0;
    }
    
    this.editTicket(element)
  }
}
