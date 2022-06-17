import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { ServiceListComponent } from '../service-list/service-list.component';
import { ServiceCreateComponent } from '../service-create/service-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/main_menu', pathMatch: 'full' },
  { path: 'main_menu', component: MainMenuComponent },
  { path: 'service_list', component: ServiceListComponent},
  { path: 'service_create', component: ServiceCreateComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
