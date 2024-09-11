import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface TodoDialogData {
  title: string;
}

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css']
})

export class AddTodoDialogComponent {
  title: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoDialogData
  ) {}

  onAdd(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

