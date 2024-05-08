import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { QuestionService } from 'src/app/services/question.service';
import { Observable } from 'rxjs';
import { OptionService } from 'src/app/services/Option.service';
import { Test } from 'src/app/models/test';
import { Question } from 'src/app/models/question';



@Component({
  selector: 'winder-post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.scss'],
  providers: [DialogService]
})

export class PostTestComponent implements OnInit{
  //questions!: Observable<any>;
  text!: Question;
  constructor(private fb: FormBuilder, public dialogService: DialogService, private testService: TestService, private router: Router) {
    }
  ngOnInit(): void {
    this.initPostForm();
  
   
  }

  stacks= [
    'angular',
    'java',
    'python',
    'networking',
    'php',
    'mysql',
    'linux',
    'docker',
    
  ]; 

  levels =[
    'Beginner',
    'Intermediate',
    'Expert'
  ]

  initPostForm() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      stack: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  questions(): FormArray {
    return this.postForm.get("questions") as FormArray
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      text: '',
      correct_option: '',
      options:this.fb.array([])
    })
  }

  addQuestion() {
    this.questions().push(this.newQuestion());
  }

  removeQuestion(questIndex:number) {
    this.questions().removeAt(questIndex);
  }

  questionOptions(questIndex:number) : FormArray {
    return this.questions().at(questIndex).get("options") as FormArray
  }

  newOption(): FormGroup {
    return this.fb.group({
      text: ''
    })
  }

  addQuestionOption(questIndex:number) {
    this.questionOptions(questIndex).push(this.newOption());
  }

  removeQuestionOption(questIndex:number,optionIndex:number) {
    this.questionOptions(questIndex).removeAt(optionIndex);
  }

 

  postForm!: FormGroup;
  step = 1;
  progress = 20;

  stepLabel = ['Title', 'Description', 'Stack', 'Level', 'Question', 'Submit'];
  leftPanelHeader = [
    'Write a title for your new test',
    'Write a description for your test',
    'Next, choose the stack of your test.',
    'Choose the level of difficulty of your test.',
    'Last step, Add questions as well as their options to your test!'
  ];

  rightPanelHeader = ['What is the title of your new test?', 'Describe your test', 'What stack would your Test be about ?', 'Who is this meant for?'];

  leftPanelContent = [
    '',
    '',
    '',
    '',
    'Add as many questions and options as you like :)'
  ];
  formGroupNames = ['name', 'description', 'stack', 'level', 'questions'];

  setStepForward() {
    this.step++;
    this.progress = this.progress + 20;
  }

  setStepBack() {
    this.step--;
    this.progress = this.progress - 20;
  }
  isMessageTooShort() {
    return this.postForm.controls['description'].value.length < 50;
  }


  onSubmit() {
    const test: Test = this.postForm.value;
    console.log(test);
  
  }

  redirectToTest() {
    this.router.navigate(['/list-test']);
  }
 
  postTest() {
   // const test: Test = this.postForm.value;
   // console.log(test);
    const body = {
      test_id: 0,
      name: this.postForm.controls['name'].value,
      description: this.postForm.controls['description'].value,
      stack: this.postForm.controls['stack'].value,
      level: this.postForm.controls['level'].value,
      questions: this.postForm.controls['questions'].value
    };
    //console.log(body);
   this.testService.createTestWithQuestionsAndOptions(body).subscribe((res) => {
      console.log(res);
      this.redirectToTest();
    });
    
    
  }
}
