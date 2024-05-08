import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Option } from 'src/app/models/option';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailsTestComponent } from '../details-test/details-test.component';

@Component({
  selector: 'winder-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss'],
  providers: [DialogService]

})
export class ListTestComponent  {
  tests: Test[] = [];
  test1!: Test;
  layout: string = 'list';



  constructor(private route: ActivatedRoute,
    public dialogService: DialogService, 
    private router: Router, 
    private testService: TestService){
    }
    ref!: DynamicDialogRef;

  ngOnInit(): void {
    
    this.retrieveTests();
  }

  show(data:any) {
    this.ref = this.dialogService.open(DetailsTestComponent, {
        header: 'Select a Product',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: { data:data  }

    });
  }
  visible!: boolean;

  showDialog(test_id: number) {
      this.visible = true;
      this.testService.retrieveTest(test_id).subscribe((response: Test) => {
        this.test1 = response;
        });
  }

  public retrieveTests(): void {
    this.testService.getTests().subscribe((response: Test[]) => {
      this.tests = response;
      console.log(this.tests);
      });
}

testDetails(test_id: number){
  this.router.navigate(['/test-details', test_id]);
}

updateTest(test_id: number){
  this.router.navigate(['/update-test', test_id]);
}

addTest(){
  this.router.navigate(['/add-test']);
}

deleteTest(test_id: number){
  this.testService.deleteTest(test_id).subscribe( data => {
    console.log(data);
    this.retrieveTests();
  })
}



}
