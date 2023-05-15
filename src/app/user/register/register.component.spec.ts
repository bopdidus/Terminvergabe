import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MatCardModule } from '@angular/material/card';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [MatCardModule, MatIconModule,MatStepperModule,
         MatInputModule, MatDividerModule,BrowserAnimationsModule,
        ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form - check Firtname', ()=>{
    let firstname = component.firstFormGroup.controls['firstCtrl'];
    expect(firstname.valid).toBeFalsy();
    expect(firstname.errors!['required']).toBeTruthy();
});

it('Form - check Firtname minlength', ()=>{
  let firstname = component.firstFormGroup.controls['firstCtrl'];
  firstname.setValue('bo')
  expect(firstname.valid).toBeFalsy();
  expect(firstname.errors!['minlength']).toBeTruthy();
});

it('Form - check Firtname minlength', ()=>{
  let firstname = component.firstFormGroup.controls['firstCtrl'];
  firstname.setValue('bob')
  expect(firstname.valid).toBeTruthy();
  expect(firstname.errors).toBeNull();
});

it('Form - check Lastname', ()=>{
  let lastname = component.firstFormGroup.controls['lastCtrl'];
  expect(lastname.valid).toBeFalsy();
  expect(lastname.errors!['required']).toBeTruthy();
});

it('Form - check Lastname minlength', ()=>{
  let lastname = component.firstFormGroup.controls['lastCtrl'];
lastname.setValue('b')
expect(lastname.valid).toBeFalsy();
expect(lastname.errors!['minlength']).toBeTruthy();
});

it('Form - check Lastname minlength', ()=>{
  let lastname = component.firstFormGroup.controls['lastCtrl'];
  lastname.setValue('bopda')
expect(lastname.valid).toBeTruthy();
expect(lastname.errors).toBeNull();
});

it('Form - check birthdate', ()=>{
  let birthdate = component.firstFormGroup.controls['birthCtrl'];
  expect(birthdate.valid).toBeFalsy();
  expect(birthdate.errors!['required']).toBeTruthy();
});

it('Form - check Birthdate mindate', ()=>{
  let birthdate = component.firstFormGroup.controls['birthCtrl'];
  birthdate.setValue('12-31-1800')
  expect(birthdate.valid).toBeFalsy();
});

it('Form - check Birthdate bad date', ()=>{
  let birthdate = component.firstFormGroup.controls['birthCtrl'];
  birthdate.setValue('02-30-2000')
  expect(birthdate.valid).toBeFalsy();
});

it('Form - check birthdate correct', ()=>{
  let birthdate = component.firstFormGroup.controls['birthCtrl'];
  birthdate.setValue('2001-05-31')
expect(birthdate.valid).toBeTruthy();
expect(birthdate.errors).toBeNull();
});


it('Form - check Invalid Email', ()=>{
      let email = component.secondFormGroup.controls['emailCtrl'];
      email.setValue('john.doe@bochum')
      expect(email.valid).toBeFalsy();
      expect(email.errors!['pattern']).toBeTruthy();
  });

   it('Form - check valid Email', ()=>{
          let email = component.secondFormGroup.controls['emailCtrl'];
          email.setValue('john.doe@hs-bochum.de')
          expect(email.valid).toBeTruthy();
          expect(email.errors).toBeNull();
    });

    it('Form - check address', ()=>{
      let address = component.thirdFormGroup.controls['addCtrl'];
      expect(address.valid).toBeFalsy();
      expect(address.errors!['required']).toBeTruthy();
    });

    it('Form - check city', ()=>{
      let city = component.thirdFormGroup.controls['cityCtrl'];
      expect(city.valid).toBeFalsy();
      expect(city.errors!['required']).toBeTruthy();
    });

    it('Form - check postal', ()=>{
      let postal = component.thirdFormGroup.controls['postalCtrl'];
      expect(postal.valid).toBeFalsy();
      expect(postal.errors!['required']).toBeTruthy();
    });

    it('Form - check postal', ()=>{
      let postal = component.thirdFormGroup.controls['postalCtrl'];
      postal.setValue('12b3')
      expect(postal.valid).toBeFalsy();
      expect(postal.errors!['pattern']).toBeTruthy();
    });

    it('Form - check correct postal', ()=>{
      let postal = component.thirdFormGroup.controls['postalCtrl'];
      postal.setValue('44801')
      expect(postal.valid).toBeTruthy();
      expect(postal.errors).toBeNull();
    });

    it('Form - check password', ()=>{
      let password = component.secondFormGroup.controls['passwordCtrl'];
      expect(password.valid).toBeFalsy();
      expect(password.errors!['required']).toBeTruthy();
    });

    it('Form - check password minlength', ()=>{
      let password = component.secondFormGroup.controls['passwordCtrl'];
      password.setValue('pass')
      expect(password.valid).toBeFalsy();
      expect(password.errors!['minlength']).toBeTruthy();
    });

    it('Form - check correct password', ()=>{
      let password = component.secondFormGroup.controls['passwordCtrl'];
      password.setValue('password')
      expect(password.valid).toBeTruthy();
      expect(password.errors).toBeNull();
    });


});
