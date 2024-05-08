import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { Question } from 'src/app/models/question';
import { Test } from 'src/app/models/test';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'winder-redirect-to-test',
  templateUrl: './redirect-to-test.component.html',
  styleUrls: ['./redirect-to-test.component.scss']
})
export class RedirectToTestComponent implements OnInit {
  tests: Test[] = [];
  testId: string = ''; // Variable to store the test ID from the text field
  matchingId: number[] = [];
  displayedColumns: string[] = ['test_id', 'stack']; // Define the columns to display in the table
  dataSource: MatTableDataSource<Test>; // Data source for the table
  visibleRows: Test[] = []; // Array to store visible rows

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {
    this.dataSource = new MatTableDataSource<Test>(this.tests);
  }

  ngOnInit() {
    this.testService.getTests().subscribe((response: Test[]) => {
      console.log('Initial testId:', this.testId);
      this.tests = response;
      this.matchingId = response.map((test) => test.test_id);
      this.dataSource.data = this.tests; // Update the data source with fetched tests
      this.visibleRows = this.tests; // Set initial visible rows
      console.log(this.tests); // Check if data is fetched correctly
    });
  }

  gotoTest() {
    console.log('Current testId:', this.testId); // Check the value of testId
    if (this.testId && this.matchingId.includes(Number(this.testId))) {
      console.log('Valid testId:', this.testId); // Check when a valid testId is detected
      this.router.navigate([+this.testId+"/questions"]);
    }
  
  }
  
}
