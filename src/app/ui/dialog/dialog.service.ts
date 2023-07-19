import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Member } from 'src/app/members/member.model';

import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(@Inject(MatDialog) private dialog: MatDialog) {}

  open(
    component: ComponentType<ConfirmDeleteComponent>,
    config: MatDialogConfig = {}
  ) {
    const ref = this.dialog.open(component, config);
    return ref.afterClosed();
  }

  openConfirmDelete(data: Member) {
    return this.open(ConfirmDeleteComponent, {
      data,
      hasBackdrop: false,
      width: '400px',
    });
  }
}
