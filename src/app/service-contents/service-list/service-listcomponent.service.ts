import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpClientJsonpModule, HttpErrorResponse, } from '@angular/common/http';
import { catchError, Observable, of, } from 'rxjs';
import { filter as RXfilter, map } from 'rxjs/operators';
import {
  find as _find,
  findIndex as _findIndex,
  isNil as _isNil,
  filter as _filter,
} from 'lodash';
import { slipDetail } from '../../entity/slipDetail';
import { serviceContents } from '../../entity/serviceContents';
import { prefecturesCoordinateData } from '../../entity/prefectures';
import { serchCategoryData } from '../../entity/serchCategory';
import { favorite } from 'src/app/entity/favorite';
import { browsingHistory } from 'src/app/entity/browsingHistory';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { serchSidAmount } from 'src/app/entity/serchSid';

@Injectable({
  providedIn: 'root'
})
export class ServiceListcomponentService {


  targetUrl = 'slipdetail'

  constructor(
    private http: HttpClient,
    private jsonp: HttpClientJsonpModule,
  ) { }

  // private apiEndPoint: string = 'https://localhost:8080/v1/';
  private apiEndPoint: string = 'http://localhost:8080/v1/';


  /**
   * 取得した伝票情報を元に表示用に編集する
   */
  convertServiceContents(detail: slipDetail): serviceContents {
    const result: serviceContents = {
      id: detail.slipNo,
      useId: detail.userId,
      title: detail.title,
      price: Number(detail.price),
      area: Number(detail.area),
      category: Number(detail.category),
      bidMethod: Number(detail.bidMethod),
      explanation: detail.explanation,
      bidderId: Number(detail.bidderId),
      favoriteFlg: false,
      registeredDate: 0,
      preferredDate: Number(detail.preferredDate),
      preferredTime: Number(detail.preferredTime),
      logicalDeleteFlag: 0,
      imageUrl: ''
    }
    return result;
  }

  /**
   * 画面表示するページ数を算出する。
   * @param totalPage 総ページ数
   * @param currentPage 現在のページ
   */
  setPage(totalPage: number, currentPage: number): number[] {
    let resultIndex: number[] = [];
    let count = 1;
    // 総ページ数が7ページ以下の場合
    if (totalPage < 7) {
      // 総ページ分のページ表示数を返却
      for (var i = 0; i < totalPage + 1; i++) {
        resultIndex.push(count);
        count++;
      }
    } else if (totalPage == currentPage) {
      // 最終ページの場合 現在のページ含めた前7ページを表示
      count = currentPage - 7;
      // 総ページ分のページ表示数を返却
      for (var i = 0; i < 6; i++) {
        resultIndex.push(count);
        count++;
      }
    } else if (currentPage == 1) {
      // 1ページ目の場合
      count = 1;
      // 総ページ分のページ表示数を返却
      for (var i = 0; i < 6; i++) {
        resultIndex.push(count);
        count++;
      }
    } else {
      // それ以外の場合
      if (totalPage <= currentPage + 3) {
        // 現在のページから最終ページまでが+3以内の場合

        // 合計ページ　- 現在のページ　=　後端のページ数
        const rearIndex = totalPage - currentPage;
        // 7 - 後端のページ数 = 
        const centerIndex = 7 - rearIndex;
        // 現在のページ - 現在のページから前方の表示数 = 開始ページ数
        const frontIndex = currentPage - centerIndex;
        // 最終ページの場合 現在のページ含めた前7ページを表示
        count = frontIndex;
        // 7ページ表示数を返却
        for (var i = 0; i < 6; i++) {
          resultIndex.push(count);
          count++;
        }
      } else if (1 >= currentPage - 3) {
        // 現在のページから1ページまでが-3以内の場合
        count = 1;
        // 7ページ表示数を返却
        for (var i = 0; i < 6; i++) {
          resultIndex.push(count);
          count++;
        }
      } else {
        // 現在のページ - 3 = 開始ページ数
        const frontIndex = currentPage - 3;
        // 最終ページの場合 現在のページ含めた前7ページを表示
        count = frontIndex;
        // 7ページ表示数を返却
        for (var i = 0; i < 6; i++) {
          resultIndex.push(count);
          count++;
        }
      }
    }
    return resultIndex;
  }

  /**
   * エリアIDから地域名を取得
   * @param areaId 
   * @returns 地域名
   */
  areaSelect(areaId: number): string {
    const areaData = _find(prefecturesCoordinateData, data => data.id == areaId);
    if (areaData == undefined) {
      return '';
    }
    return areaData.prefectures;
  }

  /**
   * カテゴリーIDから作業内容を取得
   * @param cotegoryId
   * @returns カテゴリー名 
   */
  categorySelect(cotegoryId: number): string {
    const categoryData = _find(serchCategoryData, data => data.id == cotegoryId);
    if (categoryData == undefined) {
      return '';
    }
    return categoryData.category;
  }

  /**
   * お気に入りされたフラグを操作する。
   * @param id 
   * @param contentsList 
   */
  favoriteSetting(id: string, contentsList: serviceContents[]): serviceContents[] {
    const index = _findIndex(contentsList, content => content.id == id);
    // 対象のサービスのお気に入りフラグを切り替える
    if (contentsList[index].favoriteFlg) {
      contentsList[index].favoriteFlg = false;
    } else {
      contentsList[index].favoriteFlg = true;
    }
    return contentsList;
  }

  /**
   * 金額情報と一致するコンテンツを取得
   * @param standardSlip 
   * @param amount 
   */
  public serchAmtContent(standardSlip: slipDetail[], amount: serchSidAmount[]):slipDetail[] {
    let result:slipDetail[] = [];
    // 絞り込み条件分絞り込みを行う
    amount.forEach(data => {
      let sbList = this.amtBetween(data,standardSlip);
      if(sbList.length > 0 ) {
        sbList.forEach(data => {
          result.push(data);
        });
      }
    });
    return this.slipUniq(result);
  }

  /**
   * 金額絞り込み範囲の伝票情報を取得
   * @param amt 
   * @param slip 
   */
  private amtBetween(amt:serchSidAmount ,slipDetail: slipDetail[]):slipDetail[] {
    let list:slipDetail[] = [];
    slipDetail.forEach(slip => {
      let price = Number(slip.price)
      if(price >= amt.value1 
      && price <= amt.value2 ) {
        list.push(slip);
      }
    });
    return list;
  }

  /**
   * 伝票情報の重複を排除する
   * @param slipDetail 
   */
  private slipUniq(slipDetail: slipDetail[]): slipDetail[] {
    let list: slipDetail[] = [];
    slipDetail.forEach(slip => {
      if(!_find(list, l => l.slipNo === slip.slipNo)) {
        list.push(slip);
      }
    });
    return list;
  }




  /***************************API関係*******************************************/

  /**
   * 伝票情報すべてを取得（テスト用）
   * @returns 
   */
  getSlipDetail(): Observable<any> {
    // let serchParams = [areaNum, category];
    // let httpParams = new HttpParams().set('serchParamas', serchParams.join('/'));
    // return this.http.get(`${this.apiEndPoint}?${httpParams.toString()}`, "callback");
    return this.http.jsonp<any>(`${this.apiEndPoint + this.targetUrl + '/slipget'}`, "callback");

  }

  /**
   * 条件に一致する伝票情報を取得
   * @param url 
   * @returns 
   */
  serchSlip(url: string): Observable<slipDetail[]> {
    return this.http.get<slipDetail[]>(`${this.apiEndPoint + this.targetUrl + url}`);
    // return this.http.jsonp<slipDetail[]>(`${this.apiEndPoint + this.targetUrl + url}`, "callback");
  }

  /**
   * サイドメニュー変更時の伝票取得処理
   * @param area 
   * @param category 
   */
  getSidSerchSlip(area :string ,category :string ): Observable<slipDetail[]> {
    return this.http.get<slipDetail[]>(`${this.apiEndPoint + this.targetUrl+'/serchcategory/'+ area +'/' +category}`);
  }

  /**
   * お気に入り情報を取得
   * @param userId 
   * @returns 
   */
  getFavorite(userId: string): Observable<favorite[]> {
    return this.http.get<favorite[]>(`${this.apiEndPoint + "favorite/getuserbyfavorite/" + userId}`);
  }

  /**
   * 重複削除：お気に入り
   */
  public favoriteUnuq(list: favorite[]): favorite[] {
    let result: favorite[] = [];
    list.forEach(l => {
      if (result.length == 0) {
        result.push(l);
      }
      if (!(_find(result, data => data.slipNo === l.slipNo))) {
        result.push(l);
      }
    })
    return result;
  }

  /**
   * 重複削除：閲覧履歴
   */
  public browsingHistoryUnuq(list: browsingHistory[]): browsingHistory[] {
    let result: browsingHistory[] = [];
    list.forEach(l => {
      if (result.length == 0) {
        result.push(l);
      }
      if (!(_find(result, data => data.slipNo === l.slipNo))) {
        result.push(l);
      }
    });
    return result;
  }


  /**
   * お気に入り情報を更新する
   * @param serviceContents 
   */
  public postFavorite(favoriteList: favorite[], contents: serviceContents, userid: string) {
    const data = this.createFavorite(contents, userid);
    // お気に入り情報がない場合
    if (favoriteList.length == 0) {
      this.postFav(data).subscribe(st => {
        console.log(st);
      });
    } else {
      // 既存のお気に入りに存在するかをチェック
      if (_find(favoriteList, data => data.slipNo == contents.id)) {
        const id = _find(favoriteList, data => data.slipNo == contents.id)?.id
        // 存在する場合解除が必用なため削除する。
        if (_isNil(id)) {
          this.http.delete(this.apiEndPoint + 'favorite/deletefavorite/' + id, { observe: 'response' }).pipe(
            // HTTPステータスコードを戻す
            map((res: HttpResponse<any>) => res.status),
            // エラー時もHTTPステータスコードを戻す
            catchError((err: HttpErrorResponse) => of(err.status))
          );
        }
      } else {
        this.postFav(data).subscribe(st => {
          console.log(st);
        });
      }
    }
  }

  /**
   * 更新用にお気に入り情報を作成する
   * @param slipNo 
   * @param userid 
   * @returns 
   */
  private createFavorite(contents: serviceContents, userid: string): favorite {
    return {
      id: 0,
      userId: userid,
      slipNo: contents.id,
      title: contents.title,
      imageUrl: contents.imageUrl
    }
  }

  /**
   * 表示リスト内容にお気に入り情報を設定する。
   * @param slip 
   * @param favorite 
   */
  public setFavorite(serviceSlip: serviceContents[], favorite: favorite[]): serviceContents[] {
    serviceSlip.forEach(slip => {
      if (_find(favorite, f => f.slipNo == slip.id)) {
        slip.favoriteFlg = true;
      }
    })
    return serviceSlip;
  }

  /**
   * お気に入り情報更新
   * @param data 
   * @returns 
   */
  private postFav(data: favorite): Observable<number> {
    console.log(this.apiEndPoint + 'postfavorite');
    return this.http.post(this.apiEndPoint + 'favorite/postfavorite', data, { observe: 'response' }).pipe(
      // HTTPステータスコードを戻す
      map((res: HttpResponse<any>) => res.status),
      // エラー時もHTTPステータスコードを戻す
      catchError((err: HttpErrorResponse) => of(err.status))
    );
  }

  /**
   * 閲覧履歴情報を取得
   * @param userId 
   * @returns 
   */
  public getBrowsingHistory(userId: string): Observable<browsingHistory[]> {
    return this.http.get<browsingHistory[]>(`${this.apiEndPoint + "userbrowsinghistory/getuserbybrowsinghistory/" + userId}`);
  }


  /**
   * 更新用に閲覧履歴情報を作成する
   * @param contents 
   * @param userid 
   * @returns 
   */
  private createBrowsingHistory(contents: serviceContents, userid: string): browsingHistory {
    return {
      id: 0,
      userId: userid,
      slipNo: contents.id,
      title: contents.title,
      imageUrl: contents.imageUrl
    }
  }
  /**
   * 閲覧履歴情報更新
   * @param contents 
   * @returns 
   */
  public postBrowsingHistory(contents: serviceContents, userId: string) {
    const data = this.createBrowsingHistory(contents, userId)
    this.brPost(data).subscribe(result => {
      console.log(result);
    });
  }

  private brPost(data: browsingHistory): Observable<number> {
    return this.http.post(this.apiEndPoint + 'userbrowsinghistory/postuserbrowsinghistory', data, { observe: 'response' })
      .pipe(
        // HTTPステータスコードを戻す
        map((res: HttpResponse<any>) => res.status),
        // エラー時もHTTPステータスコードを戻す
        catchError((err: HttpErrorResponse) => of(err.status))
      );
  }



}
