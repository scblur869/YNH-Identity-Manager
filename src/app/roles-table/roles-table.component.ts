import { RoleService } from './../services/role.service';
import { RoleTableItem, UserRole } from './../roles.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild, Output, EventEmitter, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
export interface RoleDialogData {
  name: string;
  displayname: string;
  description: string;
}

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RolesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new MatTableDataSource<RoleTableItem>();
  selection = new SelectionModel<RoleTableItem>(true, []);
  roleList: RoleTableItem[] = [];
  itemsSelected: RoleTableItem[] = [];
  item!: RoleTableItem;
  public dData!: RoleDialogData;
  displayedColumns = ['id', 'name', 'displayname', 'description', 'action'];
  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  updateDS(): void {
    this.roleService.listRoles().subscribe(r => {
      this.roleList = r;
      this.dataSource.data = this.roleList;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });

  }

  async fillRolesTable(): Promise<any> {
    return await this.roleService.listRoles().toPromise();
  }

  async AddRole(role: UserRole): Promise<any> {
    return await this.roleService.addNewRole(role).toPromise();
  }

  async UpdateRole(role: UserRole): Promise<any> {
    return await this.roleService.updateExistingRole(role).toPromise();
  }

  async RemoveRole(role: UserRole): Promise<any> {
    return await this.roleService.removeExistingRole(role).toPromise();
  }

  newRole(): void {
    const dialogRef = this.dialog.open(RolesDialogComponent,
      {
        width: '575px',
        height: '500px',
        data: { user: '', displayname: '', description: '' }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dData = result;
        const role = new UserRole();
        role.name = this.dData.name;
        role.displayname = this.dData.displayname;
        role.description = this.dData.description;
        this.roleService.addNewRole(role)
          .subscribe(res => {
            this.updateDS();
          });
      }
    });
  }


  updateRole(roleInfo: UserRole): void {
    const dialogRef = this.dialog.open(RolesDialogComponent,
      {
        width: '575px',
        height: '500px',
        data: { name: roleInfo.name, displayname: roleInfo.displayname, description: roleInfo.description }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dData = result;
        const role = new UserRole();
        role.name = this.dData.name;
        role.displayname = this.dData.displayname;
        role.description = this.dData.description;
        this.roleService.addNewRole(role)
          .subscribe(res => {
            this.updateDS();
          });
      }
    });
  }

  removeRole(role: UserRole): void {
    const r = this.RemoveRole(role);
    r.then(x => {
      console.log(x);
      this.updateDS();
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    const u = this.fillRolesTable();
    u.then(results => {
      if (results) {
        this.roleList = results;
        this.dataSource.data = this.roleList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    }).catch(error => {
      console.log(error);

    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}


@Component({
  selector: 'app-roles-dialog-component',
  styleUrls: ['./roles-table.component.scss'],
  templateUrl: './dialog.html',
})
export class RolesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RolesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleDialogData) {

  }
  onNoClick(): void {

    this.dialogRef.close();
  }

}
