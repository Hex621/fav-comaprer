import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  generateURL(mode,user,page) {
    let modeURLsegment = mode === "favs"?"fav%3A":"votedup%3A";
    let fullURL = `https://e621.net/posts.json?page=${page}&tags=${modeURLsegment}${user}`
    return fullURL
  }

  getPosts(response) {
    let posts :Post[] = [];
    response.posts.forEach(post => {
      posts.push({id: post.id, tags:[...post.tags.general,...post.tags.species]})
    });
    return posts;
  }
}
