import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test-front/components/test.component';
import { FinishScreenComponent } from './finish-screen/finish-screen.component';
import { FinishScreenFailComponent } from './finish-screen-fail/finish-screen-fail.component';
import { PostTestComponent } from './test-admin/components/post-test/post-test.component';
import { RedirectToTestComponent } from './redirect-to-test/redirect-to-test.component';
import { ListTestComponent } from './test-admin/components/list-test/list-test.component';
import { EditTestComponent } from './test-admin/components/edit-test/edit-test.component';

const routes: Routes = [{
  path: ':test_id/questions',
  component: TestComponent
}, 
{
  path: 'finishFail', component: FinishScreenFailComponent
},
{
  path: 'finishSuccess', component: FinishScreenComponent
},
{
  path: 'update-test/:test_id', component: EditTestComponent
},
{
  path: 'add-test', component: PostTestComponent
}, 
{
  path: 'list-test', component: ListTestComponent
}, 
{
  path: 'redirect-to-test', component: RedirectToTestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
