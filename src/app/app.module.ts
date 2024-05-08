import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffresComponent } from './components/offres/offres.component';
import { FormsModule } from '@angular/forms';
import { DockModule } from 'primeng/dock';
import { AnimateModule } from 'primeng/animate';
import { MegaMenuModule } from 'primeng/megamenu';
import { QuestionAdminComponent } from './components/question/question-admin/components/question-admin.component';
import { FinishScreenFailComponent } from './components/test/finish-screen-fail/finish-screen-fail.component';
import { FinishScreenComponent } from './components/test/finish-screen/finish-screen.component';
import { PostTestComponent } from './components/test/test-admin/components/post-test/post-test.component';
import { RedirectToTestComponent } from './components/test/redirect-to-test/redirect-to-test.component';
import { NgProgressModule } from 'ngx-progressbar';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

import { OptionModule } from './components/option/option.module';
import { TestModule } from './components/test/test.module';
import { QuestionModule } from './components/question/question.module';

import { AjouterOffreComponent } from './components/ajouter-offre/ajouter-offre.component';
import { ModifierOffreComponent } from './components/modifier-offre/modifier-offre.component';
import { HttpClientModule } from '@angular/common/http';

import { ReclamationsComponent } from './components/reclamations/reclamations.component';
import { ModifierReclamationComponent } from './components/modifier-reclamation/modifier-reclamation.component';
import { AjoutReclamationComponent } from './components/ajout-reclamation/ajout-reclamation.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminmainComponent } from './components/admin/adminmain/adminmain.component';
import { AdminsidebarComponent } from './components/admin/adminsidebar/adminsidebar.component';
import { AdminheaderComponent } from './components/admin/adminheader/adminheader.component';


@NgModule({
  declarations: [
    AppComponent,
    OffresComponent,
    AjouterOffreComponent,
    ModifierOffreComponent,
    QuestionAdminComponent,
    FinishScreenComponent,
    FinishScreenFailComponent,
    RedirectToTestComponent,
    AjoutReclamationComponent,
    ReclamationsComponent,
    ModifierReclamationComponent,
    ChatComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminmainComponent,
    AdminsidebarComponent,
    AdminheaderComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DockModule,
    AnimateModule,
    MegaMenuModule,
    NgProgressModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    DialogModule,
    OptionModule,
    TestModule,
    QuestionModule,



    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
