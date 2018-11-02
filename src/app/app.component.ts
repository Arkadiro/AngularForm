import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild ('f') form : NgForm;
  @ViewChild ('email') email: HTMLElement;
  @ViewChild ('userData') userData: NgForm;

  disabled = false;
  defaultQuestion = 'pet';
  answer='';
  users=[];
  genders=['male', 'female'];
  selectedGender='female';
  submited = false;
  spinner = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.form.setValue({
    //   userData:{
    //     username: suggestedName,
    //     useremail: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: 'lusy',
    //   gender: 'female'
    // })
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }
  ngOnInit(){
    if (JSON.parse(sessionStorage.getItem('users'))!== null) {this.users = JSON.parse(sessionStorage.getItem('users'))}
  }

  onSubmit() {
    //this.users.push(this.userData.value);
    this.submited = true;
    this.users.push(this.form.value);
    sessionStorage.clear();
    sessionStorage.setItem('users', JSON.stringify(this.users))
    this.spinner=true;
    setTimeout(()=>{
      this.spinner = false;
      setTimeout(()=>this.resetform(),800)
    },2000)

  }

  resetform(){
    this.form.reset();
  }
}
