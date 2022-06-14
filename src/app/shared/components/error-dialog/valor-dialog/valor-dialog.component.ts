import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-valor-dialog',
  templateUrl: './valor-dialog.component.html',
  styleUrls: ['./valor-dialog.component.scss']
})
export class ValorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private location: Location
    ) {}

  ngOnInit() {
  }

  onCancel() {
    this.location.back();
  }

}
