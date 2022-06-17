import { Component, OnInit } from '@angular/core';
import { serviceContents } from 'src/app/entity/serviceContents';
import { detailList } from 'src/app/entity/detailList';
import { Location } from '@angular/common';

import { ServiceContents } from 'src/app/mock-test';

@Component({
  selector: 'app-browsing-history',
  templateUrl: './browsing-history.component.html',
  styleUrls: ['./browsing-history.component.scss']
})
export class BrowsingHistoryComponent implements OnInit {

  HEAD = {
    check: false,
    title: 'タイトル',
    contents: '内容',
    price: '価格',
    whet: '期間',
    endDate: '終了日'
  };

  detailList:any = [];

  constructor(
    private location :Location,
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

    // let count = 0;
    contents.forEach((content) => {
      // 先頭にヘッドを設定
      this.detailList.push(this.settingDetail(content));
    });

    console.log(this.detailList);
  }

  /**
   * 取得したサービスを表示用に加工する
   * @param content
   * @returns detailList
   */
  private settingDetail(content: serviceContents):any {
    const returnList :detailList = {
        id : content.id,
        // check
        check : false,
        // タイトル
        title : content.title,
        // 内容
        contents : '',
        // 価格
        price : content.price,
        // 期間
        whet : content.registeredDate,
        // 終了日
        endDate : content.completiondate
    }
    return returnList;
  }

  /**
   *
   * @param title
   */
  deleteSelection(title :String) {
    console.log(title);
  }



  goBack() {
    this.location.back();
  }

}
