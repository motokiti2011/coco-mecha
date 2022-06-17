import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss']
})
export class ServiceCreateComponent implements OnInit {

  selected = 'selected';

  data = [
    { label: '自分で設定' , value: 'yourself' , disabled: false },
    { label: 'オークション方式' , value: 'auction' , disabled: false },
    { label: '見積り希望' , value: 'estimate' , disabled: false }
  ]

  invalid = false;

  constructor(
    private location:Location
  ) { }

  ngOnInit(): void {
  }

  /**
   * 入札方式選択イベント
   */
  show() {
    console.log('洗濯中'+ this.selected);
  }

    /**
   * 戻るボタン押下イベント
   * @return void
   */
     goBack():void {
      this.location.back();
    }


}
