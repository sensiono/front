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
import { AdminmainComponent } from './components/admin/adminmain/adminmain.component';
import { TestComponent } from './components/test/test-front/components/test.component';
import { RedirectToTestComponent } from './components/test/redirect-to-test/redirect-to-test.component';
import { PostTestComponent } from './components/test/test-admin/components/post-test/post-test.component';
import { ListTestComponent } from './components/test/test-admin/components/list-test/list-test.component';
import { EditTestComponent } from './components/test/test-admin/components/edit-test/edit-test.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'reclamations', component: ReclamationsComponent },
  { path: 'ajouter-reclamation', component: AjoutReclamationComponent },
  { path: 'modifier-reclamation/:id', component: ModifierReclamationComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'admin', component: AdminmainComponent }, // <-- Add a comma here
  //{ path: 'tests', loadChildren: () => import('./components/test/test.module').then((m) => m.TestModule) },
  { path: 'redirect-to-test', component: RedirectToTestComponent },
  { path: 'post-test', component: PostTestComponent },
  { path: 'list-test', component: ListTestComponent },
  { path: 'add-test', component: PostTestComponent },
  { path: 'update-test/:test_id', component: EditTestComponent },
  { path: ':test_id/questions', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
