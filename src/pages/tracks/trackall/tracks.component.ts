import { Component, OnInit } from '@angular/core';
import { TracksService } from '../../../services/Tracks/alltracks.service';
import { CommonModule } from '@angular/common';
import { iTrack } from '../../../interfaces/iTrack';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  imports: [CommonModule],
  styleUrls: ['./tracks.component.css'],
})
export class TracksAllComponent implements OnInit {
  tracks!: iTrack[];
  loading: boolean = true;
  percentage: number = 0;
  constructor(private TracksService: TracksService, private router: Router) {}

  ngOnInit(): void {
    this.TracksService.getAllTracks().subscribe({
      next: (response) => {
        this.loading = false;
        this.tracks = response.map((track: iTrack) => ({
          ...track,
          percentage:
            track.numberOfStudent > 0
              ? (track.numberOfAchievers / track.numberOfStudent) * 100
              : 0,
        }));
      },
      error: (error) => {
        console.error('Error fetching all tracks:', error);
      },
    });
  }

  goToTrack(trackId: any, trackName: any): void {
    console.log(trackId);
    this.router.navigate([`/track/${trackId}/${trackName}`]);
  }
}
