import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceDetailService } from './service-detail.service';
import { slipDetail } from 'src/app/entity/slipDetail';
import { messageDialogData } from 'src/app/entity/messageDialogData';
import { MessageDialogComponent } from 'src/app/modal/message-dialog/message-dialog.component';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  /** サービスID */
  serviceId: string = '';
  /** タイトル */
  serviceTitle: string = '';
  /** 日付 */
  dispYMD:string = '';
  /** 価格 */
  dispPrice:string = '';
  /** 場所 */
  dispArea:string = '';
  /** 説明 */
  dispExplanation:string = ''
  /** 表示伝票情報 */
  dispContents :slipDetail = {  // 伝票番号
    slipNo: '',userId: '',title: '',category: '',area: '',price: '',bidMethod: '',bidderId: '',bidEndDate: '',
    explanation: '',displayDiv: '',preferredDate: '',preferredTime: '',completionDate: '',deleteDiv: '',imageUrl: ''};

  constructor(
    private route: ActivatedRoute,
    private location:Location,
    private service: ServiceDetailService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params['serviceId']);
      const serviceId:string = params['serviceId'];
      // サービスIDからサービス情報を取得し表示する
      this.service.getService(serviceId).subscribe(data => {
        this.dispContents = data[0];
        // 表示内容に取得した伝票情報を設定
        this.dispYMD = this.dispContents.bidEndDate;
        this.dispPrice = this.dispContents.price;
        this.dispArea = this.dispContents.area;
        this.dispExplanation = this.dispContents.explanation;
        console.log('ディティール1：'+this.dispContents);
        console.log('ディティール2：'+this.dispContents.area);
      })
      this.serviceTitle =  params['serviceId'];
    });
  }

  /**
   * 取引するボタン押下時の処理
   */
  onTransaction() {
    this.router.navigate(["service-transaction-component"],
    {queryParams:{slipNo :this.dispContents.slipNo, status:false}});
  }

  /**
   * マイリストに追加ボタン押下時の処理
   */
  onMyList() {
    this.service.addMyList(this.dispContents).subscribe(result => {
      let modalData:messageDialogData = {
        massage: '',
        closeFlg:true,
        closeTime:400
      };
      if(result === 200) {
        modalData.massage = 'マイリストに追加しました'
      } else {
        modalData.massage = '追加に失敗しました。'
      }
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        width: '300px',
        height: '100px',
        data: modalData
      })
    });
  }

  /**
   * 取引状況確認ボタン押下時の処理
   */
  onTransactionStatus() {
    this.router.navigate(["service-transaction-component"],
    {queryParams:{slipNo :this.dispContents.slipNo, status:true}});
  }


    /**
   * 戻るボタン押下イベント
   * @return void
   */
     goBack():void {
      this.location.back();
    }

}

