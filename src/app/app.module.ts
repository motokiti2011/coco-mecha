import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { TransactionMenuComponent } from './transaction-menu/transaction-menu.component';
import { TransactionListComponent } from './transaction-menu/transaction/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-menu/transaction/transaction-detail/transaction-detail.component';
import { MyListComponent } from './transaction-menu/mylist-tab/mylist-detail/my-list/my-list.component';
import { MylistDetailComponent } from './transaction-menu/mylist-tab/mylist-detail/mylist-detail.component';
import { BrowsingHistoryComponent } from './transaction-menu/browsing-history-tab/browsing-history-detail/browsing-history/browsing-history.component';
import { BrowsingHistoryDetailComponent } from './transaction-menu/browsing-history-tab/browsing-history-detail/browsing-history-detail.component';
import { TansactionCompleteComponent } from './transaction-menu/transaction-complete-tab/transaction-complete-detail/tansaction-complete/tansaction-complete.component';
import { TransactionCompleteDetailComponent } from './transaction-menu/transaction-complete-tab/transaction-complete-detail/transaction-complete-detail.component';
import { TransactionMenuService } from './transaction-menu/transaction-menu.service';
import { ServiceSerchConditionsComponent } from './service-serch-conditions/service-serch-conditions.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginComponent } from './modal/login/login.component';
import { ReissuePasswdComponent } from './reissue-passwd/reissue-passwd.component';


const ROUTE_TABLE: Routes = [
  { path: '', redirectTo: '/main_menu', pathMatch: 'full' },
  { path: 'main_menu', component: MainMenuComponent },
  { path: 'service_list', component: ServiceListComponent},
  { path: 'service_create', component: ServiceCreateComponent},
  { path: 'transaction_menu', component: TransactionMenuComponent},
  { path: 'service_serchConditions_component', component: ServiceSerchConditionsComponent},
  { path: 'userRegster_component', component: UserRegisterComponent},
  { path: 'reissue_passwd_component', component: ReissuePasswdComponent},


  
]

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    ServiceListComponent,
    SideMenuComponent,
    HeaderMenuComponent,
    ServiceCreateComponent,
    TransactionMenuComponent,
    TransactionListComponent,
    TransactionDetailComponent,
    MyListComponent,
    BrowsingHistoryComponent,
    TansactionCompleteComponent,
    MylistDetailComponent,
    BrowsingHistoryDetailComponent,
    TransactionCompleteDetailComponent,
    ServiceSerchConditionsComponent,
    UserRegisterComponent,
    LoginComponent,
    ReissuePasswdComponent,
  ],
  entryComponents:[
    TransactionListComponent,
    TransactionDetailComponent,
    MyListComponent,
    BrowsingHistoryComponent,
    TansactionCompleteComponent,
    MylistDetailComponent,
    BrowsingHistoryDetailComponent,
    TransactionCompleteDetailComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forRoot(ROUTE_TABLE),
  ],
  providers: [
    TransactionMenuService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
