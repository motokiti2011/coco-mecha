import { Component, OnInit } from '@angular/core';
import { serviceContents } from 'src/app/entity/serviceContents';
import { Location } from '@angular/common';
import { isNil} from 'lodash';

import { ServiceContents } from 'src/app/mock-test';

@Component({
  selector: 'app-browsing-history-detail',
  templateUrl: './browsing-history-detail.component.html',
  styleUrls: ['./browsing-history-detail.component.scss']
})
export class BrowsingHistoryDetailComponent implements OnInit {

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

  constructor(
    private location :Location,
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
        if(!(isNil(content))) {
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
   * 戻るボタン押下イベント
   * @return void
   */
  goBack() {
    this.location.back();
  }

}
