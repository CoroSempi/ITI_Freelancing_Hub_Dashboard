import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Add this for ngIf
import { TracksService } from '../../services/Tracks/alltracks.service';

@Component({
  selector: 'app-trackDetails',
  templateUrl: './trackDetails.component.html',
  styleUrls: ['./trackDetails.component.css'],
  imports: [RouterLink,CommonModule] 
  
})
export class TrackDetailsComponent implements OnInit {
  studentID!: string;
  students: any[] = [];
  allStudents: any[] = [];
  filterdStudents: any[] = [];
  isLoading: boolean = true; //loading state
  
  constructor(
    private route: ActivatedRoute,
    private trackService: TracksService
  ) {}

  ngOnInit() {
    this.isLoading = true; 
    this.route.paramMap.subscribe(
      (params) => {
        const id = params.get('id');
        this.studentID = id || 'none';
        // console.log(this.studentID);

        this.trackService
          .getStudentsTrack(this.studentID)
          .subscribe(
            (response) => {
              this.students = response;
              this.allStudents = response;

              this.filterdStudents = this.allStudents.filter(
                (std) => std.target == true
              );
              this.isLoading = false; //  false when data arrives
              // console.log(this.allStudents);
              // console.log(this.filterdStudents);
            },
            (error) => {
              // console.error('Error:', error.error.message);
              this.isLoading = false; // Also set loading to false on error
            }
          );
      },
      (error) => {
        // console.error('Error:', error.error.message);
        this.isLoading = false; 
      }
    );
  }

  handleFilter(filterd: boolean): void {
    if (filterd) {
      this.students = this.filterdStudents;
    } else {
      this.students = this.allStudents;
    }

    // console.log(this.students);
  }
}