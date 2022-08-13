export interface slipDetail {
  // 伝票番号
  slipNo: string;
  // ユーザーID
  userId: string;
  // タイトル
  title: string;
  // カテゴリー
  category: string;
  // 地域
  area: string;
  // 価格
  price: string;
  // 入札方式
  bidMethod: string;
  //  入札者ID
  bidderId: string;
  // 入札完了日
  bidEndDate: string;
  // 説明
  explanation: string;
  // 表示区分
  displayDiv: string;
  // 希望日
  preferredDate: string;
  // 希望時間
  preferredTime: string;
  // 完了日
  completionDate: string;
  // 削除区分
  deleteDiv: string;
  // 画像url
  imageUrl: string;
}
