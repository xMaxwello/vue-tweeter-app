export default class Tweet{
    id: number;
    body: string;
    imageUrl: string;
    isLiked: boolean;
    likesCount: number;
    commentsCount: number;
    comments: any[];
    postDate: string;


    constructor(_id: number, _body: string, _imageUrl: string, _isLiked: boolean, _likesCount: number, _commentsCount: number,_comments: Comment[], _postDate: string) {
        this.id = _id;
        this.body = _body;
        this.imageUrl = _imageUrl;
        this.isLiked = _isLiked;
        this.likesCount = _likesCount;
        this.commentsCount = _commentsCount;
        this.comments = _comments;
        this.postDate = _postDate;
    }
}