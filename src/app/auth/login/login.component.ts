import { Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/Services/alert.service';
import { AuthService } from 'src/app/core/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('bgVideo') videoElement!: ElementRef<HTMLVideoElement>;

  loginForm!: FormGroup;
  loading: boolean = false;
  location: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }
  Login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.Login({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }).subscribe({
        next: (res) => {
          if (res.isSuccessed) {
            this.alertService.default('Successfully login to the System');
            console.log('Waiting for 10 seconds before navigating...');
            const userRole = localStorage.getItem('userRole');


            setTimeout(() => {
              this.loading = false;
              if (userRole === 'ADMIN') {
                console.log('Navigating to /busaccdashboard');
                this.router.navigate(['/busaccdashboard']);
              } else if (userRole === 'USER') {
                console.log('Navigating to /home');
                this.router.navigate(['/home']).then(() => {
                  location.reload();
                });  
              }
            }, 10000);
          } else {
            this.loading = false;
            alert(res.message);
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Login failed:', err);
          this.alertService.default('Login failed. Please try again later.');
        }
      });
    }
  }

  onBlurEmail(controlName: string): void {
    const control = this.loginForm.get(controlName);
    if (control) {
      control.markAsDirty();
    }
  }
  onBlurPassword(controlName: string): void {
    const control = this.loginForm.get(controlName);
    if (control) {
      control.markAsDirty();
    }

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // Video Controls
  toggleMute() {
    const video = this.videoElement.nativeElement;
    video.muted = !video.muted;
  }
  
  togglePlayPause() {
    const video = this.videoElement.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  

}
