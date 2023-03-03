import { Component } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';
import { HttpcommunicationService } from 'src/app/shared/services/httpcommunication.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {

  user1:string;
  user2:string;
  mode:string;
  isLoading:boolean = false;
  finalMatches: Post[] = [];
  user1Posts: Post[] = [];
  user2Posts: Post[] = [];


  constructor(private httpCommunicationService: HttpcommunicationService, private utils: UtilsService) { }

  async measure() {
    this.finalMatches = [];
    this.user1Posts = [];
    this.user2Posts = [];
    this.isLoading = true;
    let user1Response;
    let user2Response;
    let pageCounter = 1;
    let user1Flag: boolean = true;
    let user2Flag: boolean = true;

    do {
      if(user1Flag) {
        user1Response = await this.getResponse(this.user1,pageCounter)
      }
      if(user2Flag) {
        user2Response = await this.getResponse(this.user2,pageCounter)
      }

      if(user1Response['posts'].length == 0) {
        user1Flag = false;
      } else {
        this.user1Posts =  this.user1Posts.concat(this.utils.getPosts(user1Response));
      }

      if(user2Response['posts'].length == 0) {
        user2Flag = false;
      } else {
        this.user2Posts = this.user2Posts.concat(this.utils.getPosts(user2Response));
      }

      pageCounter++;
    } while (user1Flag || user2Flag);

    this.finalMatches = this.countMatches(this.user1Posts,this.user2Posts);
    this.isLoading = false;
  }

  countMatches (user1Posts: Post[],user2Posts: Post[]) {
    let matchingPosts: Post[] = [];

    user1Posts.forEach( post => {
      if(user2Posts.map((p) => p.id).indexOf(post.id) != -1) {
        matchingPosts.push(post);
      }
    })

    return matchingPosts;
  }

  async getResponse(user:string,page:number) {
    let jsonData;
    await this.httpCommunicationService.getResponseFromUrl(this.utils.generateURL(this.mode,user,page)).then( data => {
      jsonData = data;
      }
    )
    return jsonData;
  }
}
