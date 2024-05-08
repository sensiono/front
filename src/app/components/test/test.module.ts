import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test-front/components/test.component';
import { HttpClientModule } from '@angular/common/http';
import { DockModule } from 'primeng/dock';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MegaMenuModule } from 'primeng/megamenu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AccordionModule } from 'primeng/accordion';
import { PostTestComponent } from './test-admin/components/post-test/post-test.component';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule, DataViewLayoutOptions  } from "primeng/dataview";
import { ListTestComponent } from './test-admin/components/list-test/list-test.component';
import { EditTestComponent } from './test-admin/components/edit-test/edit-test.component';
import { DetailsTestComponent } from './test-admin/components/details-test/details-test.component';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    TestComponent, PostTestComponent, ListTestComponent, EditTestComponent, DetailsTestComponent
  ],

  imports: [
    CommonModule,
    TestRoutingModule,
    HttpClientModule,
    DockModule,
    MultiSelectModule,
    ChipModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    MegaMenuModule,
    CardModule,
    InputTextModule,
    ChipModule,
    CheckboxModule,
    ButtonModule,
    SidebarModule,
    DividerModule,
    ProgressBarModule,
    InputTextareaModule,
    MessageModule,
    RadioButtonModule,
    InputNumberModule,
    AngularEditorModule,
    DynamicDialogModule,
    AccordionModule,
    ReactiveFormsModule,
    DropdownModule,
    DataViewModule,
    DialogModule
  ]
})
export class TestModule {}
