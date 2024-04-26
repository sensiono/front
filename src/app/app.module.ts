import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffresComponent } from './components/offres/offres.component';
import { FormsModule } from '@angular/forms';
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
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgxChartsModule,



    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
