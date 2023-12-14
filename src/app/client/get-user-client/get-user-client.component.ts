import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClientService } from '../client.service';
import { Client } from '../interfaces/client';
import { CreateClientComponent } from '../create-client/create-client.component';

@Component({
  selector: 'app-get-user-client',
  templateUrl: './get-user-client.component.html',
  styleUrls: ['./get-user-client.component.sass']
})
export class GetUserClientComponent implements OnInit {
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };

  clientList: Client[] = [];

  displayedColumns: string[] = ['check', 'id', 'name', 'surname', 'identificationNumber', 'actions'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatTable) table: MatTable<Client>;

  arrayChecked: number[] = [];

  idFilter: number;
  nameFilter: string;

  constructor(
    private clientService: ClientService,
    public dialogCreateClient: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.clientList);
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.arrayChecked = [];
    this.getUserClientRowCount();
    this.getUserClients();
  }

  getUserClientRowCount() {
    this.clientService.getUserClientsRowCount(this.idFilter, this.nameFilter).subscribe({
      next: (rowCount: number) => {
        this.pageEvent.length = rowCount;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  getUserClients(): void {
    this.clientService.getUserClients(
      this.pageEvent.pageIndex + 1,
      this.pageEvent.pageSize,
      this.idFilter, this.nameFilter
      )
      .subscribe({
      next: (clientList: Client[]) => {
        this.clientList = clientList;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.refreshData();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  rowClick(row: any) {
    let check = document.getElementById('check-' + row.id + '-input');
    check.click();
  }

  onCheckboxChange(event: MouseEvent) {
    let element = event.target as HTMLInputElement;
    let clientId: number = +element.value;
    if (element.checked) {
      this.arrayChecked.push(clientId);
    } else {
      let indexOfId = this.arrayChecked.indexOf(clientId);
      this.arrayChecked.splice(indexOfId, 1);
    }
  }

  selectAll(event: MouseEvent) {
    let element = event.target as HTMLInputElement;
    let doChecked = element.checked;

    let checks = document.getElementsByName('check-delete');
    for (let key = 0; key < checks.length; key++) {
      let button = checks[key];
      let buttonId: string = button.getAttribute('id');

      if (buttonId.includes('input')) {
        let buttonClass: string = button.getAttribute('class');
        let buttonIsSelected: boolean = buttonClass.includes('selected');

        let buttonElement = document.getElementById(buttonId);

        if (doChecked) {
          if (!buttonIsSelected) {
            buttonElement.click();
          }
        } else {
          if (buttonIsSelected) {
            buttonElement.click();
          }
        }
      }
    }
  }

  showCreateClientDialog() {
    const dialogCreateClient = this.dialogCreateClient.open(CreateClientComponent, {
      data: 'String Data',
      panelClass: ['w-3/4', 'sm:w-80', 'h-50']
    });
    dialogCreateClient.afterClosed().subscribe(
      (newClient) => {
        if (newClient) {
          if (this.clientList === null) {
            this.clientList = [];
          }

          this.clientList.push(newClient);
          this.pageEvent.length++;
          this.table.renderRows();
          this.openSnackBar('Client created', 'Ok');
        }
      }
    );
  }

  editUserClient(event: MouseEvent) {

  }

  deleteUserClient(event: MouseEvent): void {
    let element = event.target as HTMLInputElement;
    let target: HTMLElement = element.parentElement;
    let clientId: number = +target.id;
    let clientName: string = target.getAttribute('name');

    let indexToRemove = this.clientList.findIndex(client => {
      return client.id == clientId;
    });

    if (indexToRemove >= 0) {
      target.setAttribute('disabled', 'true');
      this.clientService.deleteUserClient(clientId).subscribe({
        next: (deleted: boolean) => {
          if (deleted) {
            this.clientList.splice(indexToRemove, 1);
            this.pageEvent.length--;
            this.table.renderRows();
            this.openSnackBar('Client "' + clientName + '" deleted', 'Ok');
          }
        },
        error: (err) => {
          target.removeAttribute('disabled');
          console.log(err.error)
        }
      });
    }
  }

  removeSelectedClient() {
    this.clientService.bulkDeleteClient(this.arrayChecked).subscribe({
      next: (clientArray: Client[]) => {
        clientArray.forEach(
          (userClient) => {
            let indexToRemove = this.clientList.findIndex(client => {
              return client.id == userClient.id;
            });

            if (indexToRemove >= 0) {
              this.clientList.splice(indexToRemove, 1);
              this.pageEvent.length--;
            }
          }
        );

        this.table.renderRows();
        this.arrayChecked = [];
        this.openSnackBar('Clients deleted', 'Ok');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
