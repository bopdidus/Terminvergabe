import { ComponentFixture, TestBed  } from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

let loader: HarnessLoader;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[MatCardModule, MatIconModule, MatDividerModule,BrowserAnimationsModule,
        ReactiveFormsModule, MatInputModule ] //import all the required import in order to test the projects
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form - check Email', ()=>{
    let email = component.loginForm.controls['emailCtrl'];
    expect(email.valid).toBeFalsy();
    expect(email.errors!['required']).toBeTruthy();
});

it('Form - check Invalid Email', ()=>{
      let email = component.loginForm.controls['emailCtrl'];
      email.setValue('john.doe@bochum')
      expect(email.valid).toBeFalsy();
      expect(email.errors!['pattern']).toBeTruthy();
  });

   it('Form - check valid Email', ()=>{
          let email = component.loginForm.controls['emailCtrl'];
          email.setValue('john.doe@hs-bochum.de')
          expect(email.valid).toBeTruthy();
          expect(email.errors).toBeNull();
    });

    it('Form - check password', ()=>{
      let password = component.loginForm.controls['passwordCtrl'];
      expect(password.valid).toBeFalsy();
      expect(password.errors!['required']).toBeTruthy();
  });

  it('Form - check validating', ()=>{
    expect(component.loginForm.invalid).toBeTruthy();
    let btnLogin = fixture.debugElement.query(By.css('#btnLogin'))

    component.loginForm.controls['emailCtrl'].setValue("john.doe@example.de")
    component.loginForm.controls['passwordCtrl'].setValue("12345brice")

    component.SignIn()
    fixture.detectChanges()

});

});
