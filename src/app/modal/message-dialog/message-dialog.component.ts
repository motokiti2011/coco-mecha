import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { messageDialogData } from 'src/app/entity/messageDialogData';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  dispMessage = '';

  constructor(
    public _dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: messageDialogData
    ) { }

  ngOnInit(): void {
    this.dispMessage = this.data.massage
    if(this.data.closeFlg) {
      // 設定値にて自動でモーダルを閉じる
      const delayTime = of('').pipe(delay(this.data.closeTime));
      delayTime.subscribe(s => {
        this._dialogRef.close();
      })
    }
  }

  // ダイアログを閉じる
  closeModal() {
    this._dialogRef.close();
  }
}
