import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { AsyncPipe, JsonPipe } from '@angular/common';
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
    AsyncPipe,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    RouterModule,
    JsonPipe,
  ],
})
export class AppComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly isMediumScreen$ =
    this.breakpointObserver.observe('(max-width: 768px)');

  openSnackBar() {
    this.snackBar.open('Made with 💖 by @victoravila__', 'Dismiss', {
      duration: 3000,
    });
  }
}
