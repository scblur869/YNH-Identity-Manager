import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MainComponent } from './main/main.component';
import { TabBarComponent } from './main/tab-bar/tab-bar.component';
import { UserStoreComponent } from './user-store/user-store.component';
import { ClaimsStoreComponent } from './claims-store/claims-store.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { httpInterceptorProviders } from './interceptors/index';
import { ManageComponent } from './manage/manage.component';
import { UserTableComponent, DialogComponent, SecDialogComponent } from './user-table/user-table.component';
import { MatSortModule } from '@angular/material/sort';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RolesTableComponent, RolesDialogComponent } from './roles-table/roles-table.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    MainComponent,
    NavBarComponent,
    TabBarComponent,
    UserStoreComponent,
    ClaimsStoreComponent,
    ManageComponent,
    DialogComponent,
    UserTableComponent,
    PageNotFoundComponent,
    RolesTableComponent,
    RolesDialogComponent,
    SecDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatListModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    LayoutModule,
    MatSortModule,

  ],
  entryComponents: [
    DialogComponent,
    RolesDialogComponent,
    SecDialogComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy },
  { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
