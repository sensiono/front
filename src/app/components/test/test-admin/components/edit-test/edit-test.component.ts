import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test';
import { Question } from 'src/app/models/question';


@Component({
  selector: 'winder-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit{
  test_id!: number;
  test!: Test;
  questions1: Question[] = [];
  constructor(private fb: FormBuilder, private testService: TestService,private route: ActivatedRoute, private router: Router) {
    }
  ngOnInit(): void {
    
    this.test_id = +Number(this.route.snapshot.paramMap.get('test_id'));
    this.testService.retrieveTest(this.test_id).subscribe((response: Test) => {
      this.test = response;
      this.initPostForm();
      });
      this.testService.getTestQuestions(this.test_id).subscribe((response: Question[]) => {
        this.questions1 = response;})
  }

  stacks= [
    'angular',
    'react',
    'nest',
    'dino',
    'node',
    'java',
    'python',
    'c++',
    'c#',
    'c',
    'php',
    'ruby',
    'swift',
    'kotlin',
    'go',
    'rust',
    'scala',
    'sql',
    'nosql',
    'mongodb',
    'mysql',
    'postgresql',
    'oracle',
    'sqlite',
    'redis',
    'memcached',
    'cassandra',
    'docker',
    'kubernetes',
    'jenkins',
    'travis',
    'circleci',
    'git',
    'github',
    'bitbucket',
    'gitlab'
  ]; 

  levels =[
    'Beginner',
    'Intermediate',
    'Expert'
  ]

  

  initPostForm() {
    this.postForm = this.fb.group({
      name: [this.test.name, Validators.required],
      description: [this.test.description, Validators.required],
      stack: [this.test.stack, Validators.required], 
      level: [this.test.level, Validators.required],
      questions: this.fb.array([])
    });
    this.populateQuestions();
    console.log(this.test)
  }

  questions(): FormArray {

    console.log(this.postForm.get("questions") as FormArray);
    
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
  

  populateQuestions() {
    const questions = this.test.questions || [];

  const questionFormArray = this.postForm.get('questions') as FormArray;

  questions.forEach((question) => {
    const questionGroup = this.fb.group({
      text: '',
      correct_option: '',
      options: this.fb.array([])
    });

    const optionsFormArray = questionGroup.get('options') as FormArray;
    const options = question.options || [];

    options.forEach((option) => {
      const optionGroup = this.fb.group({
        text: ''
      });

      optionsFormArray.push(optionGroup);
    });

    questionGroup.patchValue(question);
    questionFormArray.push(questionGroup);
  });
  }
  

  postForm!: FormGroup;
  
  formGroupNames = ['name', 'description', 'stack', 'level', 'questions'];


  isMessageTooShort() {
    return this.postForm.controls['description'].value.length < 50;
  }


  onSubmit() {
    const test: Test = this.postForm.value;
    console.log(test);
  }

  redirectToTest() {
    this.router.navigate(['/tests']);
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
   this.testService.updateTest(this.test_id,body).subscribe((res) => {
      console.log(res);
    });
  }

}
