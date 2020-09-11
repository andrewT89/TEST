export class Article {
  public _id: string;
  public title: string;
  public description: string;
  public createdAt: string;

  constructor(dataArticle?: any) {
      this._id = dataArticle ? dataArticle._id : null;
      this.title = dataArticle ? dataArticle.title : null;
      this.description = dataArticle ? dataArticle.description : null;
      this.createdAt = dataArticle ? dataArticle.createdAt : null;
  }
}
