import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ServiceTransactionService } from './service-transaction.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-service-transaction',
  templateUrl: './service-transaction.component.html',
  styleUrls: ['./service-transaction.component.scss']
})
export class ServiceTransactionComponent implements OnInit {

  /** 表示伝票番号 */
  dispSlipId:string = '';
  /** 伝票タイトル */
  dispTitle = '';
  /** 伝票日付 */
  dispYmd = '';
  /** 伝票価格 */
  dispPrice = '';
  /** 伝票地域 */
  dispArea = '';
  /** 伝票説明 */
  dispExplanation = '';
  /** 管理者フラグ */
  authUserDiv: boolean = false;
  /** 一部公開フラグ */
  openDiv: boolean = false;
  /**  非公開フラグ　*/
  privateDiv: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: ServiceTransactionService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    // 伝票表示情報取得反映
    this.route.queryParams.subscribe(params => {
      this.dispSlipId = params['slipNo'];
      console.log(params['slipNo']);
      console.log(params['status']);
      this.service.getService(this.dispSlipId).subscribe(data => {
        this.dispTitle = data[0].title;
        this.dispYmd = data[0].completionDate;
        this.dispPrice = data[0].price;
        this.dispArea = this.service.areaNameSetting(data[0].area);
        this.dispExplanation = data[0].explanation;
        this.initChatArea();
      });
    });
  }

  /**
   * チャットエリアの表示設定を行う
   */
  private initChatArea() {
    // 認証ユーザー情報取得
    this.auth.user$.subscribe(userOrNull => {
      if(userOrNull == null ||userOrNull == undefined) {
        // ダイアログ表示（ログインしてください）し前画面へ戻る
      } else {
        // 管理者判定
        this.service.slipAuthCheck(this.dispSlipId, userOrNull.userId).subscribe(result => {
          // 取得できない場合
          if(result.length === 0 ) {

          }
        });
      }
    });
  }

  onReturn() {
    this.location.back();
  }

}
