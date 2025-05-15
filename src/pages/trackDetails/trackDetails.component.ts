import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common'; // Add this for ngIf
import { TracksService } from '../../services/Tracks/alltracks.service';

@Component({
  selector: 'app-trackDetails',
  templateUrl: './trackDetails.component.html',
  styleUrls: ['./trackDetails.component.css'],
  imports: [RouterLink, CommonModule],
})
export class TrackDetailsComponent implements OnInit {
  trackID!: string;
  trackName!: string;
  students!: any[];
  allStudents: any[] = [];
  filterdStudents: any[] = [];
  isLoading: boolean = true;
  filterd: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private trackService: TracksService,

    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(
      (params) => {
        const id = params.get('id');
        const trackName = params.get('trackName');
        this.trackID = id || 'none';
        this.trackName = trackName || 'none';

        this.trackService.getStudentsTrack(this.trackID).subscribe(
          (response) => {
            this.students = response;
            this.allStudents = response;

            this.filterdStudents = this.allStudents.filter(
              (std) => std.target == true
            );
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.error('Error:', error.error.message);
        this.isLoading = false;
      }
    );
  }

  handleFilter(filterd: boolean): void {
    if (filterd) {
      this.students = this.filterdStudents;
      this.filterd = true;
    } else {
      this.students = this.allStudents;
      this.filterd = false;
    }
  }

  back() {
    this.router.navigate(['tracks']);
  }

  deleteTrack() {
    this.trackService.deleteTrack(this.trackID).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['tracks']);
      },
      (error) => {
        console.error('Error deleting track:', error);
      }
    );
  }
}
