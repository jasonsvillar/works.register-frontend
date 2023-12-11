import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ServiceService } from '../service.service';
import { Service } from '../interfaces/service';
import { CreateServiceComponent } from '../create-service/create-service.component';
import { FilterServiceComponent } from '../filter-service/filter-service.component';
import { EditServiceComponent } from '../edit-service/edit-service.component';

@Component({
  selector: 'app-get-user-service',
  templateUrl: './get-user-service.component.html',
  styleUrls: ['./get-user-service.component.sass'],
})

export class GetUserServiceComponent implements OnInit {
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };

  serviceList: Service[] = [];

  displayedColumns: string[] = ['check', 'id', 'name', 'actions'];
  dataSource: MatTableDataSource<Service>;

  @ViewChild(MatTable) table: MatTable<Service>;

  arrayChecked: number[] = [];

  idFilter: number;
  nameFilter: string;

  constructor(
    private serviceService: ServiceService,
    public dialogCreateService: MatDialog,
    public dialogFilterService: MatDialog,
    public dialogEditService: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.serviceList);
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.arrayChecked = [];
    this.getUserServiceRowCount();
    this.getUserServices();
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.refreshData();
  }

  getUserServiceRowCount() {
    this.serviceService.getUserServicesRowCount(this.idFilter, this.nameFilter).subscribe({
      next: (rowCount: number) => {
        this.pageEvent.length = rowCount;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  getUserServices(): void {
    this.serviceService.getUserServices(
      this.pageEvent.pageIndex + 1,
      this.pageEvent.pageSize,
      this.idFilter, this.nameFilter
      )
      .subscribe({
      next: (serviceList: Service[]) => {
        this.serviceList = serviceList;
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }

  deleteUserService(event: MouseEvent): void {
    let element = event.target as HTMLInputElement;
    let target: HTMLElement = element.parentElement;
    let serviceId: number = +target.id;
    let serviceName: string = target.getAttribute('name');

    let indexToRemove = this.serviceList.findIndex(service => {
      return service.id == serviceId;
    });

    if (indexToRemove >= 0) {
      target.setAttribute('disabled', 'true');
      this.serviceService.deleteUserService(serviceId).subscribe({
        next: (deleted: boolean) => {
          if (deleted) {
            this.serviceList.splice(indexToRemove, 1);
            this.pageEvent.length--;
            this.table.renderRows();
            this.openSnackBar('Service "' + serviceName + '" deleted', 'Ok');
          }
        },
        error: (err) => {
          target.removeAttribute('disabled');
          console.log(err.error)
        }
      });
    }
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
    let serviceId: number = +element.value;
    if (element.checked) {
      this.arrayChecked.push(serviceId);
    } else {
      let indexOfId = this.arrayChecked.indexOf(serviceId);
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

  showCreateServiceDialog() {
    const dialogCreateService = this.dialogCreateService.open(CreateServiceComponent, {
      data: 'String Data',
      panelClass: ['w-3/4', 'sm:w-80', 'h-50']
    });
    dialogCreateService.afterClosed().subscribe(
      (newService) => {
        if (newService) {
          if (this.serviceList === null) {
            this.serviceList = [];
          }

          this.serviceList.push(newService);
          this.pageEvent.length++;
          this.table.renderRows();
          this.openSnackBar('Service created', 'Ok');
        }
      }
    );
  }

  removeSelectedService() {
    this.serviceService.bulkDeleteService(this.arrayChecked).subscribe({
      next: (serviceArray: Service[]) => {
        serviceArray.forEach(
          (userService) => {
            let indexToRemove = this.serviceList.findIndex(service => {
              return service.id == userService.id;
            });

            if (indexToRemove >= 0) {
              this.serviceList.splice(indexToRemove, 1);
              this.pageEvent.length--;
            }
          }
        );

        this.table.renderRows();
        this.arrayChecked = [];
        this.openSnackBar('Services deleted', 'Ok');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  showFilterDialog(): void {
    const dialogFilterService = this.dialogFilterService.open(FilterServiceComponent, {
      data: {id: this.idFilter, name: this.nameFilter},
      panelClass: ['w-3/4', 'sm:w-80', 'h-70']
    });

    dialogFilterService.afterClosed().subscribe(
      (data: string[]) => {
        if (data) {
          this.idFilter = +data['id'];
          this.nameFilter = data['name'];

          this.refreshData();
        }
      }
    );
  }

  editUserService(event: MouseEvent): void {
    let element = event.target as HTMLInputElement;
    let target: HTMLElement = element.parentElement;
    let serviceId: number = +target.id;
    let serviceName: string = target.getAttribute('name');

    let indexToEdit = this.serviceList.findIndex(service => {
      return service.id == serviceId;
    });

    let serviceToEdit: Service = {
      id: serviceId,
      name: serviceName
    };

    if (indexToEdit >= 0) {
      target.setAttribute('disabled', 'true');
      
      const dialogEditService = this.dialogEditService.open(EditServiceComponent, {
        data: serviceToEdit,
        panelClass: ['w-3/4', 'sm:w-80', 'h-70']
      });
  
      dialogEditService.afterClosed().subscribe(
        (serviceEdited: Service) => {
          if (serviceEdited) {
            this.serviceList.at(indexToEdit).name = serviceEdited.name;
            this.openSnackBar('Service ' + serviceId + ' edited', 'Ok');
          }

          target.removeAttribute('disabled');
        }
      );
    }
  }
}
