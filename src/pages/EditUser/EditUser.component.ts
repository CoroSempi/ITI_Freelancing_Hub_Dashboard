import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditUserService } from '../../services/editUser/editUser.service';


import { TracksService } from '../../services/Tracks/alltracks.service';

@Component({
  selector: 'app-EditUser',
  templateUrl: './EditUser.component.html',
  styleUrls: ['./EditUser.component.css'],
  imports: [ReactiveFormsModule, FormsModule],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  fullName: string = '';
  trackName: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private editUserService: EditUserService,
    // private trackService: TracksService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      grade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      faculty: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      university: ['', Validators.required],
      personalID: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      track: ['', Validators.required],
    });

    const trackId = '6805b41e38a05b42192e69d0';

    this.editUserService.getUsersByTrack(trackId).subscribe((res) => {
      const allUsers = res || [];

      console.log('this is res', res);

      const user = allUsers.find((u: any) => u._id === this.userId);

      console.log('all users', allUsers);

      if (user) {
        console.log('my User found:', user);

        this.fullName = user.fullName;
        this.trackName = user.trackName || 'Front End & cross platform';

        this.userForm.patchValue({
          fullName: user.fullName,
          grade: user.graduationGrade,
          email: user.email,
          faculty: user.faculty,
          phone: user.phone,
          university: user.university,
          personalID: user.personalID,
          track: user.trackName || user.track,
        });
      } else {
        console.log('User not found:', user);
      }
    });
  }

  onSubmit() {
    console.log('Submit clicked!');

    const updatedUser = this.userForm.value;
    console.log('Form data:', updatedUser);

    this.editUserService.updateUserById(this.userId, updatedUser).subscribe({
      next: (res) => {
        console.log('User updated successfully', res);
        alert('updated successfully');
      },
      error: (err) => {
        console.error('Error updating user:', err);
        alert('Error occurred');
      },
    });
  }
}
