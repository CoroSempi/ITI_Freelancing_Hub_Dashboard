import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import ITICourses from './ITICourses';
import { TracksService } from '../../../services/Tracks/alltracks.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./addnew.component.css'],
})
export class AddnewComponent implements OnInit {
  addTrackForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  allTracks: any[] = ITICourses;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private TracksService: TracksService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addTrackForm = this.fb.group({
      trackName: ['', Validators.required],
      startDate: ['', Validators.required],
      sheet: [null],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  onSubmit(): void {
    this.loading = true;
    console.log('clicked');
    if (this.addTrackForm.valid) {
      console.log('clicked2');
      const trackData = this.addTrackForm.value;
      const formData = new FormData();
      formData.append('trackName', trackData.trackName);
      formData.append('startDate', trackData.startDate);
      formData.append('sheet', this.selectedFile!, this.selectedFile!.name);

      this.TracksService.addTrack(formData).subscribe(
        (response) => {
          this.loading = false;
          console.log('Track added successfully:', response);
        },
        (error) => {
          console.error('Error adding track:', error);
        }
      );
    } else {
      this.loading = false;
      console.error('Form is invalid');
    }
  }
}
