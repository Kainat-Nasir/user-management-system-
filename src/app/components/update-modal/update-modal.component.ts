import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/services/todo.service';
@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
 
  constructor(
    public dialogRef: MatDialogRef<UpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) { }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
