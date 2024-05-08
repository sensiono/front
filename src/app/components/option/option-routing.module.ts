import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionComponent } from 'c:/Users/Le Chikour/Desktop/pi/Front-main/src/app/components/option/option.component';
import { OptionAdminComponent } from 'c:/Users/Le Chikour/Desktop/pi/Front-main/src/app/components/option/option-admin/components/option-admin.component';

const routes: Routes = [
  {
    path: 'all',
    component: OptionComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionRoutingModule { }
