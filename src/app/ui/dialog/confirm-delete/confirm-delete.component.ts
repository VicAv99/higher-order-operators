import { CdkDrag } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'higher-order-operators-confirm-delete',
  standalone: true,
  imports: [CdkDrag, MatButtonModule, MatDialogModule, JsonPipe],
  templateUrl: './confirm-delete.component.html',
})
export class ConfirmDeleteComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDeleteComponent>);

  protected data = inject(MAT_DIALOG_DATA);

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
