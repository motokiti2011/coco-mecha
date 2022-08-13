import { Component, OnInit } from '@angular/core';
import { serviceContents } from 'src/app/entity/serviceContents';
import { detailList } from 'src/app/entity/detailList';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionMenuService } from 'src/app/transaction-menu/transaction-menu.service'
import {
  find as _find,
  cloneDeep as _cloneDeep,
  pull as _pull,
  remove as _remove,
  difference as _difference,
  isNil as _isNil,
} from 'lodash';


import { ServiceContents } from 'src/app/mock-test';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';


@Component({
  selector: 'app-browsing-history',
  templateUrl: './browsing-history.component.html',
  styleUrls: ['./browsing-history.component.scss']
})
export class BrowsingHistoryComponent implements OnInit {

  HEAD = {
    check: '',
    title: 'タイトル',
    contents: '内容',
    area: '地域',
    category: 'カテゴリー',
    price: '価格',
    whet: '期間',
    endDate: '終了日'
  };

  /** 表示用リスト */
  detailList: any = [];

  /** チェックリスト */
  selectionList: any = [];

  /** 一括選択チェック */
  hedSelection: boolean = false;

  /** 削除ボタン活性フラグ */
  checkbutton: boolean = true;

  selected = '';

  orderMenu = [
    {id:1 ,value:'残り期間が短い順'  },
    {id:2 ,value:'残り期間が長い順'  },
    {id:3 ,value:'価格が安い順'  },
    {id:4 ,value:'価格が高い順'  },
  ]

  constructor(
    private location: Location,
    private router:Router,
    private service: TransactionMenuService
  ) { }

  ngOnInit(): void {
    this.setListSetting();
  }

  /**
   * 表示リストの初期設定を行います。
   */
  private setListSetting() {
    // データを取得
    const contents = ServiceContents;

    contents.forEach((content) => {
      this.detailList.push(this.settingDetail(content));
    });

  }

  /**
   * 取得したサービスを表示用に加工する
   * @param content
   * @returns detailList
   */
  private settingDetail(content: serviceContents): any {

    const returnList: detailList = {
      id: content.id,
      // check
      check: this.hedSelection,
      // タイトル
      title: content.title,
      // 内容
      contents: '',
      // 地域
      area: this.service.areaDisp(content.area),
      // カテゴリー
      category: this.service.priceDisp(content),
      // 価格
      price: this.service.priceDisp(content),
      // 期間
      whet: this.service.getWhet(content),
      // 終了日
      endDate: this.service.getDispDate(content.preferredDate)
    }
    return returnList;
  }

  /**
   * チェックボックス選択時イベント
   * @param title
   * @param check
   */
  deleteSelection(title: String, check: boolean) {

    // チェック状態の場合リストに追加
    if (check) {
      this.selectionList.push(title);
    } else {
      _pull(this.selectionList, title);
    }

    // 削除ボタンの制御
    if (this.selectionList.length > 0) {
      this.checkbutton = false;
    } else {
      this.checkbutton = true;
    }

  }


  /**
   * 一括選択チェックボックスイベント
   */
  bulkSelection() {
    console.log(this.hedSelection)
    const dispList: detailList[] = _cloneDeep(this.detailList);

    dispList.forEach((content) => {
      // check をすべてヘッダと同じ状態にする
      content.check = this.hedSelection;

      if (this.hedSelection) {
        this.selectionList.push(content.id)
      } else {
        _pull(this.selectionList, content.id)
      }
    });
    this.detailList = dispList;

    // 削除ボタンの制御
    if (this.selectionList.length > 0) {
      this.checkbutton = false;
    } else {
      this.checkbutton = true;
    }

  }

  /** 削除ボタン押下時のイベント */
  deleteCheck() {
    const List: [] = _cloneDeep(this.selectionList);
    const deleteList: detailList[] = []

    List.forEach((select) => {
      // 削除対象を取得する
      if (_find(this.detailList, disp => disp.id === select)) {
        deleteList.push(_find(this.detailList, disp => disp.id === select));
      }
    });

    // 差集合を抽出
    const dispList = _difference(this.detailList, deleteList);
    // 表示リストを書き換える。
    this.detailList = _cloneDeep(dispList);

    // 削除するデータをＡＰＩへ
    /**  */

  }

  /**
   * タイトルクリック時、詳細画面へ遷移する
   * @param content 
   */
  contentsDetail(content: serviceContents) {    
    this.router.navigate(["service-detail-component"], {queryParams:{serviceId:content.id}});  
  }


      /**
   *  並び順変更イベント
   * 
   */
       changeOrder() {
        console.log(this.selected)
        const order = _find(this.orderMenu, order => order.value === this.selected)
    
        if(!_isNil(order)) {
          this.detailList = this.service.sortOrderList(this.detailList, order.id);
          console.log(this.detailList);
        }
      }

}
