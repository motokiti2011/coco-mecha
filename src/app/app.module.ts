import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { 
  HttpClientModule,
  HttpClientJsonpModule,
} from '@angular/common/http';
import { ServiceListcomponentService } from './service-contents/service-list/service-listcomponent.service';
import { ServiceListComponent } from './service-contents/service-list/service-list.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { ServiceCreateComponent } from './service-contents/service-create/service-create.component';
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
import { ServiceSerchConditionsComponent } from './service-contents/service-serch-conditions/service-serch-conditions.component';
import { LoginComponent } from './modal/login/login.component';
import { ReissuePasswdComponent } from './auth/reissue-passwd/reissue-passwd.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ServiceDetailComponent } from './service-contents/service-detail/service-detail.component';
import { TrimPipe } from './pipe/trim-pipe/trim-pipe';
import { NextModalComponent } from './modal/next-modal/next-modal/next-modal.component';
import { ServiceListSideMenuComponent } from './service-contents/service-list/service-list-side-menu/service-list-side-menu/service-list-side-menu.component';

const ROUTE_TABLE: Routes = [
  { path: '', redirectTo: '/main_menu', pathMatch: 'full' },
  { path: 'main_menu', component: MainMenuComponent },
  { path: 'service_list', component: ServiceListComponent },
  { path: 'service_create', component: ServiceCreateComponent },
  { path: 'transaction_menu', component: TransactionMenuComponent },
  { path: 'service_serchConditions_component', component: ServiceSerchConditionsComponent },
  { path: 'reissue_passwd_component', component: ReissuePasswdComponent },
  { path: 'sign-up-component', component: SignUpComponent },
  { path: 'service-detail-component', component: ServiceDetailComponent },
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
    LoginComponent,
    ReissuePasswdComponent,
    SignUpComponent,
    ServiceDetailComponent,
    TrimPipe,
    NextModalComponent,
    ServiceListSideMenuComponent,
  ],
  entryComponents: [
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
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(ROUTE_TABLE),
  ],
  providers: [
    TransactionMenuService,
    // サービス依頼画面日付のMatarial部品日本語化
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
