import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomOption } from 'src/app/Models/CustomOption';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  public options: CustomOption[] = [];

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private optionService: OptionService){}

  ngOnInit() {
    this.getOptions();
  }

  public getOptions(): void {
    this.optionService.getOptions().subscribe(
      (response: CustomOption[]) => {
        this.options = response;
        console.log(this.options);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
