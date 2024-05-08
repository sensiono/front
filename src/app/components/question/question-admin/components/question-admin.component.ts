import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { Option } from 'src/app/models/option';

@Component({
  selector: 'winder-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.scss']
})
export class QuestionAdminComponent {
  public questions: Question[] = [];
  public options: Option[] = [];

  items!: any[] ;
  position: string = 'top';

  positionOptions = [
      {
          label: 'Bottom',
          value: 'bottom'
      },
      {
          label: 'Top',
          value: 'top'
      },
      {
          label: 'Left',
          value: 'left'
      },
      {
          label: 'Right',
          value: 'right'
      }
  ];
  
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private questionService: QuestionService
    ){}

  ngOnInit() {
    this.getQuestions();
    this.InitDock();
  }

  InitDock() {
    this.items = [
      {
          label: 'Finder',
          icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg'
      },
      {
          label: 'App Store',
          icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
      },
      {
          label: 'Photos',
          icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
      },
      {
          label: 'Trash',
          icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
      }
  ];
  }

  public getQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (response: Question[]) => {
        this.questions = response;
        console.log(this.questions);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
