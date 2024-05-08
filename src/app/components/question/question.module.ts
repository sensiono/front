import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuestionRoutingModule } from './question-routing.module';
import { DockModule } from 'primeng/dock';
import { QuestionComponent } from 'c:/Users/Le Chikour/Desktop/pi/Front-main/src/app/components/question/question.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    HttpClientModule,
    DockModule,
    MultiSelectModule,
    ChipModule, 
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule
  ]
})
export class QuestionModule { }
