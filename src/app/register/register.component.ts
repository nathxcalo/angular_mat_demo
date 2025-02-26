import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatSliderModule } from '@angular/material/slider'; 
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Ensure it's imported

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule, // Added module for slide toggle
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkillLevel: number = 5;
  darkMode: boolean = false; // For light/dark mode
  submitted = false;
  minSkillLevel = 1;
  maxSkillLevel = 10;

  formdata: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z0-9]*$/)]), // Starts with a letter and alphanumeric
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.pattern(/^[A-Za-z][A-Za-z0-9]*$/) // Starts with letter, alphanumeric
    ]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required, this.ageValidator]), // Age validation
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5),
    darkMode: new FormControl(false) // Ensure darkMode control is part of the form group
  });

  // Custom validator for Date of Birth (Age validation)
  ageValidator(control: FormControl): { [key: string]: boolean } | null {
    const dob = control.value;
    if (dob && new Date(dob).getFullYear() > 2006) {
      return { age: true };
    }
    return null;
  }

  // Toggle Dark Mode
  toggleDarkMode(event: any) {
    this.darkMode = event.checked;
    document.body.classList.toggle('dark-theme', this.darkMode);
  }

  onClickSubmit(data: { 
    userName: string; 
    email: string; 
    password: string;
    gender: string;
    address: string;
    birthDate: Date;
    angularSkillLevel: number;
    darkMode: boolean;
  }) {
    this.submitted = true;
    this.userName = data.userName; 
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.address = data.address;
    this.angularSkillLevel = data.angularSkillLevel;
    this.birthDate = data.birthDate;
    this.darkMode = data.darkMode;
    if (this.formdata.valid) {
      console.log("Form Submitted!", this.formdata.value);
    } else {
      console.log('Form is not valid!');
    }
  }
}
