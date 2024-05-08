import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionRoutingModule } from './option-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DockModule } from 'primeng/dock';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OptionRoutingModule,
    HttpClientModule,
    DockModule,
    MenubarModule
  ]
})
export class OptionModule { }
