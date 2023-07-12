import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'src/app/base.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private loginService: LoginService, private baseService: BaseService, private fb: FormBuilder, private router: Router) { }

  authenticate() {
    if(!this.loginForm.valid) {
      alert('Email e Senha são obrigatórios')
      return;
    };

    this.loginService.Authenticate(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
      next: (data: any) => {
        this.baseService.saveUser(data.retorno)
        this.router.navigateByUrl('/');
      },
      error: (error: any) => {
        alert('Email ou senha incorretos')
      }
    })
  }
}
