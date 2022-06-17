import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../modal/login/login.component';
import { user } from '../entity/user';
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  user :string = 'ユーザー';

  login = {
    userName:'',
    passwd:'',
    selected:false,
    reissuePasswd:false,
    newResister:false
  }

  constructor(
    private router:Router,
    public loginModal: MatDialog
  ) { }

  ngOnInit(): void {
  }

  cocomecha() {
    console.log('cocomecha')
    this.router.navigate(["/main_menu"])
  }
  
  /**
   * ユーザー認証を行う
   */
   onUserLogin() {
    console.log('user-login');
    this.router.navigate(["userRegster_component"])
  }

  /**
   * ログインをおこなう
   */
  onLogin() {
    console.log('user-login');

    const dialogRef = this.loginModal.open(LoginComponent, {
      width:'50vh',
      height:'50vh',
      data:this.login
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('dialog was closed:', result);
        if (result !== undefined) {
          this.login = result;
          // 画面遷移の結果でモーダルを閉じた場合、各画面に遷移する。
          if(this.login.reissuePasswd) {
            // パスワード画面に遷移
            this.router.navigate(["reissue_passwd_component"])
          } 
          if (this.login.newResister) {
            // 新規登録画面に遷移
            console.log("newResister");
          }
        }
      }
    );
  }


  /**
   * ヘルプを展開する
   */
   onClickHelp() {
    console.log('help');
  }




}
