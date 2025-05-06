import { Component, OnInit } from '@angular/core';
import { TracksService } from '../../../services/Tracks/alltracks.service';
import { CommonModule } from '@angular/common';
import { iTrack } from '../../../interfaces/iTrack';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  imports: [CommonModule],
  styleUrls: ['./tracks.component.css'],
})
export class TracksAllComponent implements OnInit {
  tracks: iTrack[] = [];
  percentage: number = 0;
  constructor(private TracksService: TracksService) {}

  ngOnInit(): void {
    this.TracksService.getAllTracks().subscribe({
      next: (response) => {
        this.tracks = response.map((track: iTrack) => ({
          ...track,
          percentage: track.numberOfStudent > 0
            ? (track.numberOfAchievers / track.numberOfStudent) * 100
            : 0,  
        }));
        
  
      },
      error: (error) => {
        console.error('Error fetching all tracks:', error);
      },
    });
  }
}
