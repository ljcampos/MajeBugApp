import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms'; // import this for use ngModel
import { WellcomeComponent } from './home/wellcome/wellcome.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountService } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BugListComponent } from './bugs/bug-list/bug-list.component';
import { BugService } from './services/bug.service';
import { FromnowPipe } from './pipes/fromnow.pipe';
import { SeverityComponent } from './bugs/severity/severity.component';
import { BugDetailComponent } from './bugs/bug-detail/bug-detail.component';
import { BugGuard } from './guards/bug.guard';
import { AuthGuard } from './guards/auth.guard';
import { AddBugComponent } from './bugs/add-bug/add-bug.component';
import { BugsModule } from './bugs/bugs.module';
import { EditBugComponent } from './bugs/edit-bug/edit-bug.component';

@NgModule({
  declarations: [
    AppComponent,
    WellcomeComponent,
    LoginComponent,
    BugListComponent,
    FromnowPipe,
    SeverityComponent,
    BugDetailComponent,
    AddBugComponent,
    EditBugComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'wellcome', component: WellcomeComponent, canActivate: [AuthGuard]},
      {path:'login', component: LoginComponent},
      {path:'bugs', component: BugListComponent, canActivate: [AuthGuard]},
      {path:'bugs/:id', component: BugDetailComponent, canActivate: [BugGuard]},
      {path:'addBug', component: AddBugComponent },
      {path:'editBug/:id', component: EditBugComponent },
      {path:'', redirectTo: 'login', pathMatch:'full'},
      {path:'**', redirectTo: 'login', pathMatch:'full'},
    ]),
    ReactiveFormsModule,
    BugsModule
  ],
  providers: [
    AccountService,
    BugService,
    BugGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
