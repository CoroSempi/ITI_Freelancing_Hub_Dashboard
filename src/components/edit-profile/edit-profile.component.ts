import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/Profile/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  loading: Boolean = false;
  avatar!: string;

  selectedFile: File | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const admin = localStorage.getItem('adminData');
    if (admin) {
      let data = JSON.parse(admin);
      this.avatar = data.Avatar;
    }
  }

  updatedPic(pic: string): void {
    const admin = localStorage.getItem('adminData');
    if (admin) {
      let data = JSON.parse(admin);
      data = { ...data, Avatar: pic };
      this.avatar = data.Avatar;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('avatar', this.selectedFile, this.selectedFile.name);

      this.loading = true;
      this.profileService.changeAvatar(formData).subscribe(
        (response) => {
          this.loading = false;
          this.updatedPic(response.Avatar);
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }

  isSubmitDisabled(): boolean {
    return !this.selectedFile;
  }
}
