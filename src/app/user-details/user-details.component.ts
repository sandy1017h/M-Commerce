import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/Services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  user: any;
  userId!: number;
  activeTab: string = 'profile'; // Default active tab

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    // Get user ID from route parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id; // Convert string to number
        this.fetchUserById(this.userId);
      }
    });
  }

  fetchUserById(id: number): void {
    this.authService.getUserById(id).subscribe(
      (userData) => {
        this.user = userData;
        console.log(this.user.data);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

 }
