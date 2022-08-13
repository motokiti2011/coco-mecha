import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  serviceId: string = '';
  serviceTitle: string = '';
  constructor(
    private route: ActivatedRoute,
    private location:Location,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params['serviceId']);
      // サービスIDからサービス情報を取得し表示する
      this.serviceTitle =  params['serviceId'];
    });
  }

  /**
   * 取引するボタン押下時の処理
   */
  onTransaction() {

  }

  /**
   * マイリストに追加ボタン押下時の処理
   */
  onMyList() {

  }

  /**
   * 取引状況確認ボタン押下時の処理
   */
  onTransactionStatus() {

  }


    /**
   * 戻るボタン押下イベント
   * @return void
   */
     goBack():void {
      this.location.back();
    }

}

