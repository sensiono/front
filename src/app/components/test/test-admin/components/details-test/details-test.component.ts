import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'winder-details-test',
  templateUrl: './details-test.component.html',
  styleUrls: ['./details-test.component.scss']
})
export class DetailsTestComponent {
  test:any

  constructor(private config: DynamicDialogConfig,  public ref: DynamicDialogRef) {
    
    this.test = this.config.data.data
  }

  ngOnInit(){
    console.log(this.test);
    
  }

}
