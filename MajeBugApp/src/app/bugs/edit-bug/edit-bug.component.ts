import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BugService } from '../../services/bug.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-edit-bug',
  templateUrl: './edit-bug.component.html',
  styleUrls: ['./edit-bug.component.css']
})
export class EditBugComponent implements OnInit {
  editBugForm: FormGroup;
  bug:any = {};
  errorMessage:string = '';
  constructor(private _activatedRoute: ActivatedRoute, private _router:Router, private _bugService:BugService, private fb:FormBuilder) {
    this.editBugForm = this.fb.group({
      'id':['',],
      'title': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(120)])],
      'body': ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
      'isFixed': false,
      'stepToReproduce': ['', Validators.maxLength(250)],
      'severity': 1
    });
  }

  save() {
    this.editBugForm.value['rowVersion'] = this.bug.rowVersion;
    this.editBugForm.value['createdAt'] = this.bug.createdAt;
    this.editBugForm.value['createdByid'] = this.bug.createdByid;
    // console.log(this.editBugForm.value);

    this._bugService.putBug(this.editBugForm.value).subscribe(data => {
      this._router.navigate(['/bugs']);
    }, error => {
      this.errorMessage = error;
    });
  }

  ngOnInit() {
    // get bug info.
    const param = this._activatedRoute.snapshot.paramMap.get('id');
    if (param) {
      this._bugService
      .getBug(Number(param))
      .subscribe(
        data => {
          this.bug = data;

          (<FormGroup>this.editBugForm.controls['id']).setValue(data.id, { onlySelf: true });
          (<FormGroup>this.editBugForm.controls['title']).setValue(data.title, { onlySelf: true });
          (<FormGroup>this.editBugForm.controls['body']).setValue(data.body, { onlySelf: true });
          (<FormGroup>this.editBugForm.controls['stepToReproduce']).setValue(data.stepToReproduce, { onlySelf: true });
          (<FormGroup>this.editBugForm.controls['severity']).setValue(data.severity, { onlySelf: true });
          (<FormGroup>this.editBugForm.controls['isFixed']).setValue(data.isFixed, { onlySelf: true });
        },
        error => {}
      );
    }

    $('.ui.dropdown')
    .dropdown();

  }

}
