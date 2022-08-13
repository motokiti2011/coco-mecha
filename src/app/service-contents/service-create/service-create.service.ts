import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ModalData, nextActionButtonType, nextActionButtonTypeMap } from '../../entity/nextActionButtonType';
import { serviceContents } from '../../entity/serviceContents';
import { slipDetail } from '../../entity/slipDetail';

@Injectable({
  providedIn: 'root'
})
export class ServiceCreateService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiEndPoint: string = 'http://localhost:8080/v1/slipdetail/slippost';

  // 伝票情報を更新する
  public servicePost(contents: slipDetail): Observable<number> {
    return this.http.post(this.apiEndPoint, contents, { observe: 'response' }).pipe(
      // HTTPステータスコードを戻す
      map((res: HttpResponse<any>) => res.status),
      // エラー時もHTTPステータスコードを戻す
      catchError((err: HttpErrorResponse) => of(err.status))
    );
  }

  
  public converSlipDetail(content: serviceContents): slipDetail {
    const result: slipDetail = {
      slipNo: '0',
      userId: content.useId,
      title: content.title,
      category: String(content.category),
      area: String(content.area),
      price: String(content.price),
      bidMethod: String(content.bidMethod),
      bidderId: '0',
      bidEndDate: String(content.preferredTime),
      explanation: content.explanation,
      displayDiv: '0',
      preferredDate: String(content.preferredDate),
      preferredTime: String(content.preferredTime),
      completionDate: String(content.preferredDate),
      deleteDiv: '0',
      imageUrl: ''      
    }
    return result;
  }

  /**
   * 遷移ルートを返却する
   * @param next 
   * @returns 
   */
  public nextNav(next:string):string {
    let nextLinc = '';
    if(next == nextActionButtonType.TOP) {
      nextLinc = 'main_menu';
    } else if(next == nextActionButtonType.MYMENU) {
      nextLinc = 'transaction_menu';
    } else if(next == nextActionButtonType.SERVICECREATE) {
      nextLinc = '99';
    } else if(next == nextActionButtonType.SERVICEDETAEL) {
      nextLinc = 'main_menu';
    }
    return nextLinc;
  }




}
