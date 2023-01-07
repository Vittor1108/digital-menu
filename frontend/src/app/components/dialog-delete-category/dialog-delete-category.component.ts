import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.scss'],
})
export class DialogDeleteCategoryComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogDeleteCategoryComponent>) {}

  ngOnInit(): void {}
}
