import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffresComponent } from './components/offres/offres.component';
import { AjouterOffreComponent } from './components/ajouter-offre/ajouter-offre.component';
import { ModifierOffreComponent } from './components/modifier-offre/modifier-offre.component';
import { AjoutReclamationComponent } from './components/ajout-reclamation/ajout-reclamation.component';
import { ModifierReclamationComponent } from './components/modifier-reclamation/modifier-reclamation.component';
import { ReclamationsComponent } from './components/reclamations/reclamations.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'reclamations', component: ReclamationsComponent },
  { path: 'ajouter-reclamation', component: AjoutReclamationComponent },
  { path: 'modifier-reclamation/:id', component: ModifierReclamationComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
