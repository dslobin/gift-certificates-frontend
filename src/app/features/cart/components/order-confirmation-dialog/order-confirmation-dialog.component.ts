import {Component, Inject, OnInit} from '@angular/core';
import {Order} from '../../../../core/models/order';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-confirmation-dialog.component.html',
  styleUrls: ['./order-confirmation-dialog.component.scss']
})
export class OrderConfirmationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
  }

  ngOnInit(): void {
    console.log('Order confirmation dialog was opened!');
  }
}
