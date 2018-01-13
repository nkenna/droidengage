import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { WpApiPosts } from 'wp-api-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  posts: Array<{excerpt: any, link: string, title: string}>;
  postBody: any;

  constructor(private iab: InAppBrowser, public http: Http, private wpApiPosts: WpApiPosts, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.allPosts();
  }


  allPosts(): any{
    this.posts = [];
  

    this.wpApiPosts.getList()
      .toPromise()
      .then((response) => {
        console.log(response.json());
        this.postBody = response.json();
        console.log(this.postBody[0].excerpt.rendered);

        for(let i = 0; i <= this.postBody.length; i++){
         let items = this.postBody[i];

        

          this.posts.push({
             excerpt: this.trimExcerpt(this.postBody[i].excerpt.rendered),
            link: this.postBody[i].link,
            title: this.postBody[i].title.rendered 
          });
          console.log(this.posts);
          //console.log(PostItem);

          
        }

       
      }
        )
      .then(body => {
        console.log(this.posts);
      })
      .catch(error => {});

      
  }

  //trim the excerpt to 20 characters so as to look nice
  trimExcerpt(word: string) {
    var len = 20;

    var firstTrim = word.substring(3, word.length);
    var secondTrim = word.length > len ? firstTrim.substring(0, 30) +  "...": word;

    return secondTrim;
  }

  openPost(url: string){
    this.iab.create(url);
  }

}
