import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reissue-passwd',
  templateUrl: './reissue-passwd.component.html',
  styleUrls: ['./reissue-passwd.component.scss']
})
export class ReissuePasswdComponent implements OnInit {

  user = {
    loginId: 'login',
    passwd: 'passwd',
    mail: 'email@.com',
    confirmationMail: 'email@.com',
    name: 'yamada',
    area: ''
  }

  constructor(
    private location:Location
  ) { }

  ngOnInit(): void {
  }

  /**
   * 戻るボタン押下イベント
   * @return void
   */
   goBack():void {
    this.location.back();
  }

  show() {
    console.log(1);
  }
}
