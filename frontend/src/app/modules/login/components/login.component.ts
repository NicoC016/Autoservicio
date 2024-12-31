import { Component } from '@angular/core';
import { LoginService } from '../providers/login.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup = new FormGroup({});
  constructor(
    public loginService:LoginService,
    public formBuilder:FormBuilder,
    public router:Router,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(""),
      password: new FormControl(""),
  });
  }

  loginUser(){
    this.loginService.login(this.form.value).subscribe((res:any)=> {
      if(res.HttpStatus === 'OK'){
        let user = `{"email": "${res.resp.email}", "role":"${res.resp.role}", "isActive":${res.resp.isActive}}`;
        localStorage.setItem('userData', user);
        this.router.navigate(['/']);
        let interval = setInterval(()=>{
          location.reload();
          clearInterval(interval)
        }, 0);
      }
    })
  }

}
