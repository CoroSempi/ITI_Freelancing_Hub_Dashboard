import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditUserService } from '../../services/editUser/editUser.service';

import { TracksService } from '../../services/Tracks/alltracks.service';
import { CommonModule, Location } from '@angular/common';
import ITICourses from '../tracks/addnew/ITICourses';

@Component({
  selector: 'app-EditUser',
  templateUrl: './EditUser.component.html',
  styleUrls: ['./EditUser.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  user!: any;
  isLoading: boolean = false;
  itiTracks: any[] = ITICourses;
  selectedTrack!: string;
  msg: string = '';
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private editUserService: EditUserService,
    private location: Location,
    private trackService: TracksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.loadUserData(id);

        console.log('User ID:', this.userId);
      }
    });
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      graduationGrade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      faculty: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      university: ['', Validators.required],
      personalID: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      trackName: ['', Validators.required],
    });

    this.editUserService.getUserById(this.userId).subscribe((res) => {
      this.user = res;
      const user = res;

      this.selectedTrack = user.trackName;
      if (user) {
        this.userForm.patchValue({
          fullName: user.fullName,
          graduationGrade: user.graduationGrade,
          email: user.email,
          faculty: user.faculty,
          phone: user.phone,
          university: user.university,
          personalID: user.personalID,
          trackName: user.trackName,
        });

        this.trackService.getAllTracks().subscribe((res) => {
          this.itiTracks = res.filter((track: any) =>
            this.itiTracks.includes(track.trackName)
          );

          this.itiTracks = this.itiTracks.map((track: any) => track.trackName);
        });
      } else {
        console.log('User not found:', user);
      }
    });
  }

  loadUserData(id: string): void {
    this.editUserService.getUserById(id).subscribe((res) => {
      this.user = res;
      const user = res;

      this.selectedTrack = user.trackName;

      this.userForm.patchValue({
        fullName: user.fullName,
        graduationGrade: user.graduationGrade,
        email: user.email,
        faculty: user.faculty,
        phone: user.phone,
        university: user.university,
        personalID: user.personalID,
        trackName: user.trackName,
      });
    });
  }

  onSubmit() {
    const updatedUser = this.userForm.value;
    this.isLoading = true;
    this.editUserService.updateUserById(this.userId, updatedUser).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.msg = 'User updated successfully';
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      },

      error: (err) => {
        this.isLoading = false;
        console.error('Error updating user:', err);
      },
    });
  }

  selectTrack(track: string) {
    this.selectedTrack = track;
    this.userForm.patchValue({
      trackName: track,
    });
  }

  back(): void {
    this.location.back();
  }
}
