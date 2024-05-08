import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { OffreComponent } from './offre/offre.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjoutReclamationComponent } from './components/ajout-reclamation/ajout-reclamation.component';
import { PopupComponent } from './components/ajout-reclamation/popupconfirmation/popup/popup.component';
import { ModifierReclamationComponent } from './components/modifier-reclamation/modifier-reclamation.component';
import { ReclamationsComponent } from './components/reclamations copy/reclamations.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminheaderComponent } from './components/admin/adminheader/adminheader.component';
import { AdminmainComponent } from './components/admin/adminmain/adminmain.component';
import { AdminsidebarComponent } from './components/admin/adminsidebar/adminsidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PopupsuccessComponent } from './components/modifier-reclamation/popupsuccess/popupsuccess/popupsuccess.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { CalendarComponent,  } from './components/calender/calender.component'; // Import MatButtonModule for triggering menus
import { MaterialModule } from './AngularMaterialModule';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { ViewBlogsComponent } from './components/view-blogs/view-blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { SearchByNameBlogComponent } from './components/search-by-name-blog/search-by-name-blog.component';
import { OptionComponent } from './components/option/option.component';
import { OptionAdminComponent } from './components/option/option-admin/option-admin.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ModifierComponent } from './components/modifier/modifier.component';
import { RecomendationComponent } from './components/recomendation/recomendation.component';
import { PostulationComponent } from './postulation/postulation.component';
import { ModifierOffreComponent } from './modifier-offre/modifier-offre.component';
import { HomeoffreComponent } from './homeoffre/homeoffre.component';
import { EventsComponent } from './events/events.component';
import { EvenementComponent } from './evenement/evenement.component';
import { CreateEventComponent } from './create-event/create-event.component';



@NgModule({
  declarations: [
    AppComponent, 
    OffreComponent,
    ReclamationsComponent,
    AjoutReclamationComponent,
    ModifierReclamationComponent,
    PopupComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminmainComponent,
    AdminsidebarComponent,
    AdminheaderComponent,
    PopupComponent,
    PopupsuccessComponent,
    ChatBubbleComponent,
    AddbookComponent,
    BooklistComponent,
    CalendarComponent,
    ViewBlogComponent,
    ViewBlogsComponent,
    BlogComponent,
    SearchByNameBlogComponent,
  
    ModifierComponent,
    BooklistComponent,
    ModifierComponent,
    AddbookComponent,
    CalendarComponent,
    RecomendationComponent,
    PostulationComponent,
    ModifierOffreComponent,
    HomeoffreComponent,
    EventsComponent,
    EvenementComponent,
    CreateEventComponent,
  
  
  ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RichTextEditorAllModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatDialogModule,
    NgxChartsModule,
    MatMenuModule,
    MatButtonModule,
    MaterialModule,
    MatTableModule,
    //DataViewModule,
    DialogModule,
    //DropdownModule,
    //AccordionModule,
    //OptionRoutingModule,
    //DockModule,
    //MenubarModule;


    
   

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
