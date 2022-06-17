import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceSerchConditionsService } from './service-serch-conditions.service';

@Component({
  selector: 'app-service-serch-conditions',
  templateUrl: './service-serch-conditions.component.html',
  styleUrls: ['./service-serch-conditions.component.scss']
})
export class ServiceSerchConditionsComponent implements OnInit {

  pageX = ''
  pageY = ''
  offsetX = ''
  offsetY = ''

  constructor(
    private location: Location,
    private serviceSerchConditionsService: ServiceSerchConditionsService

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

  hoge(e:any) {
    // this.pageX = e.pageX
    // this.pageY = e.pageY
    this.offsetX = e.offsetX
    this.offsetY = e.offsetY
  }

  /**
   * 都道府県名エリアがクリックされた際に検索条件に組み込み
   * サービス一覧画面に遷移する。
   */
  areaSelect(i:number) {
    // 後日実装enumとして変換して検索条件とする
    console.log(i);
  }

  /**
   * 都道府県名エリアがクリックされた際に検索条件に組み込み
   * サービス一覧画面に遷移する。
   */
   contentsSelect(i:number) {
    // 後日実装enumとして変換して検索条件とする
    console.log(i);
  }

  /**
   * 地図画像クリック時、座標から県情報を取得し
   * サービス一覧画面に遷移する。
   * @param e
   */
  mapAreaSelect(e:any){

  }

}
