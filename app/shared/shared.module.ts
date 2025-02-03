import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './components/rating/rating.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { RenderimgPipe } from './pipes/renderimg.pipe';



@NgModule({
  declarations: [
    RatingComponent,
    NotfoundComponent,
    RenderimgPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatCardModule,
    MatTooltipModule
  ],
  exports:[
    RenderimgPipe,
    RatingComponent,
    RouterModule,
    NotfoundComponent,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatCardModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
