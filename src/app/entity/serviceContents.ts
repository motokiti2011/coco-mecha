// サービス内容
export interface serviceContents {
  // ID
  id:	number;
  // ユーザーID
  useId: number;
  // タイトル
  title: string;
  // 価格
  price: number;
  // 入札方式
  bidMethod: number;
  // 説明
  explanation: string;
  // 入札者ID
  bidderId: number;
  // 登録日
  registeredDate: number
  // 終了日
  completiondate:number;
  // 論理削除フラグ
  logicalDeleteFlag: number;
}
