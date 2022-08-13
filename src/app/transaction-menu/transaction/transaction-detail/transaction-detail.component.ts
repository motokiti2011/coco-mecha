import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { serviceContents } from '../../../entity/serviceContents';
import { 
  isNil as _isNil,
  find as _find,
} from 'lodash';

import { TransactionMenuService } from 'src/app/transaction-menu/transaction-menu.service'

import { ServiceContents } from '../../../mock-test';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  /** コンテンツリスト */
  contentsList: serviceContents[] = [];
  /** コンテンツリスト */
  displayContentsList: serviceContents[] = [];
  /** 現在のページ */
  currentPage: number = 1;
  /** 総ページ数 */
  totalPage: number = 1;
  /** 表示ページ */
  displayPage: number[] = [];
  /** インデックス */
  pageIndex: number[] = [];

  selected = '';

  orderMenu = [
    {id:1 ,value:'残り期間が短い順'  },
    {id:2 ,value:'残り期間が長い順'  },
    {id:3 ,value:'価格が安い順'  },
    {id:4 ,value:'価格が高い順'  },
  ]


  constructor(
    private location :Location,
    private service: TransactionMenuService,
  ) { }

  ngOnInit(): void {
    this.setServiceContents();
  }

  /**
   * 初回表示するサービスを取得し設定する
   * @return void
   */
   private setServiceContents() :void {
    const contents = ServiceContents;
    // コンテンツ全体から総ページ数を算出する
    this.totalPage = Math.round(contents.length/6);
    // 現在のページを設定する
    this.currentPage = 1;
    // ページごとに表示するサービスを設定する
    let count = 0;
    // 6個表示のためページ数計算含め行う
    contents.forEach((content) => {
      // 6コンテンツ分抽出する
      if(count < 6) {
        if(!(_isNil(content))) {
          this.displayContentsList.push(content);
        }
      } else {
        return;
      }
      count++
    });
    // ページ設定を行う
    this.pageSetting();

  }

  /**
   * ページ設定を行う
   * @return void
   */
  private pageSetting():void {
    // ページ数設定を行う
    const pageIndex = [];
    const startIndex = 0;
    const endIndex = 0;
    if(this.currentPage == 1 ) {
      // 初期処理の場合１ページ目から表示する
      this.initPageSetting();
    } else if(this.currentPage === this.totalPage) {
      // 最終ページ選択時

    }

  }


  /**
   * 初回ページ設定を行う
   * @return void
   */
  private initPageSetting() {
    let count = 1;
    let maxIndex = 0;
    // index後の三点リーダ表示フラグ
    let flg = false;

    if(this.totalPage < 6) {
      maxIndex = this.totalPage;
    }

    for(var i = 0; i < maxIndex; i++) {
      this.pageIndex.push(count);
      count++;
    }

  }


  /**
   * 前へボタン押下イベント
   * @return void
   */
  onContentsForward():void {

  }

  /**
   * 次へボタン押下イベント
   * @return void
   */
  onContentsNext():void {

  }

  /**
   * Indexボタン押下イベント
   * @return void
   */
  onContentsIndex(index :number):void {
    console.log(index);
  }

  /**
   * サービス選択時イベント
   * @return void
   */
  onContentsSelect(e :any):void {
    console.log(e);
  }
  
  /**
   *  並び順変更イベント
   * 
   */
   changeOrder() {
    console.log(this.selected)
    const order = _find(this.orderMenu, order => order.value === this.selected)

    if(!_isNil(order)) {
      this.displayContentsList = this.service.sortOrder(this.displayContentsList, order.id);
    }
  }


  /**
   * 戻るボタン押下イベント
   * @return void
   */
  goBack() {
    this.location.back();
  }

}
