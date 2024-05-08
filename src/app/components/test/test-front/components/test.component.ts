import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Option } from 'src/app/models/option';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'winder-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef<HTMLDivElement>;
  @ViewChild('questionContainer') questionContainer!: ElementRef;
  @ViewChild('questionC') questionC!: ElementRef;
  @ViewChild('answer', { static: true }) answer!: ElementRef<HTMLDivElement>;
  @ViewChild('main', { static: true }) main!: ElementRef<HTMLDivElement>;
  @ViewChild('actions', { static: true }) actions!: ElementRef<HTMLDivElement>;
  @ViewChild('progress', { static: true }) progress!: ElementRef<HTMLDivElement>;
  @Output() questionViewd = new EventEmitter<string>();

  questions: Question[] = [];
  options!: Option[];
  score: number = 0;
  currentQuestionIndex = 0;
  progressValue!: number;
  answerForm!: FormGroup;
  answerElements: HTMLDivElement[] = [];
  selectedAnswer!: string;
  postForm!: FormGroup;
  items!: any[];
  position: string = 'top';
  selectedOption!: Option;
  answeredCorrectly = false;
  isLastQuestion!: boolean;
  timer: any;
  @Input() test_id!: number;
  question_id!: number;
  MaxScore!: number;
  test!: Test;

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
  requiredScore!: number;
  isButtonDisabled: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService, private cdr: ChangeDetectorRef) {
    this.answerForm = new FormGroup({
      answer: new FormControl('')
    });
  }

  ngOnInit() {
    this.test_id = +Number(this.route.snapshot.paramMap.get('test_id'));
    this.getQuestionsOfTest(this.test_id);
    this.InitDock();
    this.initAnimations();
    this.increaseProgressValue();
    this.answerElements = Array.from(this.answer.nativeElement.querySelectorAll('.answer-option'));
  }

  initAnimations() {
    gsap.from(this.main.nativeElement, {
      delay: 0.2,
      duration: 0.4,
      opacity: 0,
      y: -20
    });
    gsap.from(this.questionContainer.nativeElement.childNodes, {
      delay: 0.5,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15
    });
    gsap.from(this.actions.nativeElement.childNodes, {
      delay: 0.6,
      duration: 0.4,
      opacity: 0,
      y: -20
    });
    gsap.from(this.progress.nativeElement.childNodes, {
      delay: 0.7,
      duration: 0.4,
      opacity: 0,
      y: -20
    });
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

  increaseProgressValue(): void {
    this.progressValue = (100 * (this.currentQuestionIndex + 1)) / this.questions.length;
    if (this.currentQuestionIndex === 0) {
      gsap.to(this.slider.nativeElement, {
        delay: 0.7,
        duration: 0.6,
        width: `${this.progressValue}%`
      });
    } else {
      gsap.to(this.slider.nativeElement, {
        duration: 0.6,
        width: `${this.progressValue}%`
      });
    }
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      gsap.to(this.questionContainer.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
          this.currentQuestionIndex++;
          this.increaseProgressValue();
          this.cdr.detectChanges();
          gsap.to(this.questionContainer.nativeElement.childNodes, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            stagger: 0.2
          });
        }
      });
    } else {
      // If this is the last question, update the UI state to show the Finish button
      this.isLastQuestion = true;
    }
  }
  finishQuiz() {
    this.calculateScore();
  
    if (this.score >= this.requiredScore) {
      this.finishQuizSuccess();
      localStorage.setItem('score', 'true');
    } else {
      this.finishQuizFail();
    }
  }

  finishQuizSuccess() {
    this.router.navigate(['/finishSuccess']);
  }

  finishQuizFail() {
    this.router.navigate(['/finishFail']);
  }

  i: number = 0;

  updateQuestion() {
    this.i++;
    if (this.i <= 2) {
      const selectedQuestion = this.questionC.nativeElement.innerHTML;
      this.testService.getTestQuestions(this.test_id).subscribe((response: Question[]) => {
        const matchingQuestion = response.find((question) => question.text === selectedQuestion);
        if (matchingQuestion) {
          const question_id = matchingQuestion.question_id;
          console.log(question_id);
          this.testService.updateQuestionInTest(this.test_id, question_id).subscribe((response: Question[]) => {
            this.questions = response;
            console.log(this.questions);
          });
        }
      });
    } else {
      this.isButtonDisabled = true;
    }
  }

  public getQuestionsOfTest(test_id: any): void {
    this.testService.getTestQuestions(test_id).subscribe((response: Question[]) => {
      this.questions = response;
      this.timer = this.questions.length * 1 * 30;
      this.MaxScore = this.questions.length * 100;
      this.requiredScore = (70 / 100) * this.MaxScore;
      console.log(this.questions);
      this.startTimer();
    });
  }

  get question(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  onSelect(answer: HTMLDivElement): void {
    (this.answer.nativeElement.childNodes as NodeListOf<HTMLDivElement>).forEach((node: HTMLDivElement) => {
      if (node.classList && node.classList.contains('selected')) {
        node.classList.remove('selected');
      }
    });
    answer.classList.add('selected');
    const selectedAnswer = answer.innerText.trim(); // get the selected answer as a string
    this.answerForm.get('answer')!.setValue(selectedAnswer); // set the value of the answer form control

    if (selectedAnswer !== this.selectedAnswer) {
      //check if option is already selected, if no : continue
      this.selectedAnswer = selectedAnswer; // Update the selected answer and recalculate the score
      this.calculateScore();
      this.goToNextQuestion();
    }
  }

  calculateScore() {
    for (let question of this.questions) {
      if (question.correct_option === this.selectedAnswer) {
        this.score = this.score + 100;
      }
    }
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        if (this.score == this.MaxScore) {
          this.finishQuizSuccess();
        } else if (this.score != this.MaxScore) {
          this.finishQuizFail();
        }

        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
}
