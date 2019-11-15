import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  data;
  local;
  errorMsg = true;
  showSpinner = false;
  myForm: FormGroup;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl('')
    });
  }
  onSubmit() {
    this.errorMsg = true;
    this.showSpinner = true;
    this.local = localStorage.getItem(this.myForm.value.username);
    if (this.local) {
      this.data = JSON.parse(this.local);
      this.showSpinner = false;
    } else {
      // tslint:disable-next-line: max-line-length
      this.http.get('https://api.github.com/users/' + this.myForm.value.username).subscribe(Response => {
        console.log(Response);
        this.data = Response;
        this.showSpinner = false;
        localStorage.setItem(this.myForm.value.username, JSON.stringify(Response));
      }, err => {
        this.snackBar.open('No data found', 'oops', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'right' });
        this.errorMsg = false;
        this.data = false;
        this.showSpinner = false;
      });
    }
  }
}
