import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffreComponent } from './offre/offre.component';
import { AjoutReclamationComponent } from './components/ajout-reclamation/ajout-reclamation.component';
import { HomeComponent } from './components/home/home.component';
import { ReclamationsComponent } from './components/reclamations copy/reclamations.component';
import { ModifierReclamationComponent } from './components/modifier-reclamation/modifier-reclamation.component';
import { AdminmainComponent } from './components/admin/adminmain/adminmain.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { CalendarComponent } from './components/calender/calender.component';
import { BlogComponent } from './components/blog/blog.component';
import { ViewBlogsComponent } from './components/view-blogs/view-blogs.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { SearchByNameBlogComponent } from './components/search-by-name-blog/search-by-name-blog.component';

import { RecomendationComponent } from './components/recomendation/recomendation.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EvenementComponent } from './evenement/evenement.component';
import { EventsComponent } from './events/events.component';
import { HomeoffreComponent } from './homeoffre/homeoffre.component';
import { ModifierOffreComponent } from './modifier-offre/modifier-offre.component';
import { PostulationComponent } from './postulation/postulation.component';


const routes: Routes = [
  
  { path: 'offre', component: OffreComponent },
  { path: '', component: HomeComponent }, 
  { path: 'reclamations', component: ReclamationsComponent },
  { path: 'ajouter-reclamation', component: AjoutReclamationComponent },
  { path: 'modifier-reclamation/:id', component: ModifierReclamationComponent },
  { path: 'admin', component:  AdminmainComponent },
  { path: 'blog', component:BlogComponent},
  { path: 'view-all', component:ViewBlogsComponent},
  { path: 'view-blog/:id', component:ViewBlogComponent},
  { path: 'search-by-name', component:SearchByNameBlogComponent},

  { path: 'booklist', component:  BooklistComponent },
  { path: 'calender', component:  CalendarComponent },
  { path: 'addbook', component:  AddbookComponent },
  { path: 'recomend', component:  RecomendationComponent },
  { path: 'offres', component: HomeoffreComponent },
  { path: 'modifier-offre/:id', component: ModifierOffreComponent },
  { path: 'postulation', component: PostulationComponent},
  { path: 'event', component: CreateEventComponent},
  { path: 'events', component: EventsComponent},
  {path:'front', component:EvenementComponent},
  


  
  { path: '**', redirectTo: '' },

  // Handle unknown routes
  /*{ path: 'addbook', component:  AddbookComponent },
  { path: 'booklist', component:  BooklistComponent },
  { path: 'calender', component:  CalendarComponent },*/
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
