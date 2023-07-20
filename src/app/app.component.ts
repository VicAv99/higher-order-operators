import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'higher-order-operators-root',
  templateUrl: './app.component.html',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    RouterModule,
  ],
})
export class AppComponent {
  snackBar = inject(MatSnackBar);

  openSnackBar() {
    this.snackBar.open('Made with 💖 by @victoravila__', 'Dismiss', {
      duration: 3000,
    });
  }
}
