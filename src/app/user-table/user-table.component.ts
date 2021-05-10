
import { AccountService } from './../services/account.service';
import { UserRole } from './../roles.model';
import { RoleService } from './../services/role.service';
import { UserModel } from './../user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild, Output, EventEmitter, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserTableItem } from '../user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
export interface DialogData {
  user: string;
  pass: string;
  displayName: string;
  email: string;
  role: string;
  isEnabled: number;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new MatTableDataSource<UserTableItem>();
  selection = new SelectionModel<UserTableItem>(true, []);
  userList: UserTableItem[] = [];
  itemsSelected: UserTableItem[] = [];
  item!: UserTableItem;
  public dData!: DialogData;
  public username!: string;
  public password!: string;
  public selectedRoles!: string[];
  public display!: string;
  public role!: string;
  errors!: string;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'username', 'displayname', 'email', 'role', 'isenabled', 'action'];
  constructor(private authService: AuthService, private dialog: MatDialog, private accountService: AccountService) {

  }

  async fillUserTable(): Promise<any> {
    return await this.authService.listAccounts().toPromise();
  }

  async AddUser(user: UserModel): Promise<any> {
    return await this.authService.newAccount(user).toPromise();
  }

  async UpdateUser(user: UserModel): Promise<any> {
    return await this.authService.updateAccount(user).toPromise();
  }

  async RemoveAccount(user: UserModel): Promise<any> {
    return await this.authService.removeAccount(user).toPromise();
  }



  newUser(): void {

    const dialogRef = this.dialog.open(DialogComponent,
      {
        width: '575px',
        height: '700px',
        data: { user: '', pass: '', email: '', displayName: '', role: '' }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dData = result;
        console.log(this.dData);
        const user = new UserModel();
        user.username = this.dData.user;
        user.password = this.dData.pass;
        user.email = this.dData.email;
        user.displayname = this.dData.displayName;
        user.role = this.dData.role;
        this.authService.newAccount(user)
          .subscribe(res => {
            this.updateDS();
          });
      }
    });
  }

  updateAccount(user: UserModel): void {

    const dialogRef = this.dialog.open(DialogComponent,
      {
        width: '575px',
        height: '620px',
        data: { user: user.username, email: user.email, displayName: user.displayname, role: user.role}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dData = result;
        user.username = this.dData.user;
        user.email = this.dData.email;
        user.displayname = this.dData.displayName;
        user.role = this.dData.role;
        const x = this.UpdateUser(user)
          .then(res => {
            console.log(res);
            this.updateDS();
          }).catch(error => {
            console.log(error);
          });
      }
    });
  }

  setPassword(user: UserModel): void {
    this.accountService.setPassword(user).subscribe((result: any) => {
     console.log(result);
    });
  }

  toggleAccountStatus(user: UserModel): void {
    this.accountService.toggleAccount(user).subscribe((result: any) => {
      console.log(result);
     });
  }

  openSecurityDialog(user: UserModel): void {

    const dialogRef = this.dialog.open(SecDialogComponent,
      {
        width: '575px',
        height: '350px',
        data: { pass: user.password, isEnabled: user.isenabled }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if ( result ){
        this.dData = result;
        user.password = this.dData.pass;
        user.isenabled = this.dData.isEnabled;
        if (this.dData.pass == '') {
          user.password = 'password'
        } else {
          user.password = this.dData.pass;
          this.setPassword(user);
        }
        this.toggleAccountStatus(user);
      }
      });

  }

  // newer way to handle obvervable pattern
  updateDS(): void {
    const updateOb = this.authService.listAccounts();
    const updateObserver = {
      next: (r: any) => {
        if (r) {
          this.userList = r;
          this.dataSource.data = this.userList;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed');
      }
    };
    updateOb.subscribe(updateObserver);
  }

  removeUser(user: UserModel): void {
    const r = this.RemoveAccount(user);
    r.then(x => {
      console.log(x);
      this.updateDS();
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    const u = this.fillUserTable();
    u.then(results => {
      if (results) {
        this.userList = results;
        this.dataSource.data = this.userList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    }).catch(error => {
      console.log(error);

    });
  }

  ngAfterViewInit(): any {
  }
}


@Component({
  selector: 'app-dialog-component',
  styleUrls: ['./user-table.component.scss'],
  templateUrl: './dialog.html',
})
export class DialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  public roles: UserRole[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private roleService: RoleService) { }

  async fillRolesSelect(): Promise<UserRole[]> {
    return await this.roleService.listRoles().toPromise();
  }
  changeRole(event: any): any {
    this.data.role = event;
  }
  onNoClick(): void {

    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }
  ngOnInit(): void {
    this.form.setValue({ user: this.data.user, displayName: this.data.displayName, email: this.data.email, role: this.data.role });
    const roles = this.fillRolesSelect();
    roles.then(list => {
      this.roles = list;
    });
  }
}


@Component({
  selector: 'app-sec-dialog-component',
  styleUrls: ['./user-table.component.scss'],
  templateUrl: './security.html',
})
export class SecDialogComponent implements OnInit {
  isEnabled!: boolean;
  userSec = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<SecDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private authService: AuthService) { }

  toggle(event: any): any {
    if (event === true) {
      this.data.isEnabled = 1;
    } else {
      this.data.isEnabled = 0;
    }
    console.log(this.data.isEnabled);
  }
  onNoClick(): void {

    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
