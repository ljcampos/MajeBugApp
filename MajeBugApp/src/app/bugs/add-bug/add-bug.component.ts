import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BugService } from '../../services/bug.service';
import { Router } from '@angular/router';

declare var $:any;


@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css']
})
export class AddBugComponent implements OnInit {
  addBugForm: FormGroup;
  errorMessage:string = '';

  constructor(private fb:FormBuilder, private bugService:BugService, private _router:Router) {
    this.addBugForm = this.fb.group({
      'title': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(120)])],
      'body': ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      'isFixed': false,
      'stepToReproduce': ['', Validators.maxLength(250)],
      'severity': 1
    });
  }

  save() {
    this.bugService.postBug(this.addBugForm.value).subscribe(data => {
      this._router.navigate(['/bugs']);
    }, error => {
      this.errorMessage = error;
    });
  }

  ngOnInit() {
    $('.ui.dropdown')
    .dropdown();
  }

}
