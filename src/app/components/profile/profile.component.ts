import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ReviewService} from '../../services/review.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  currentReview = null;
  message = '';
  NoReviews = '';
  reviews: any;
  review = {
    id : 0,
    pub_id: 0,
    review_title: '',
    review_text: '',
    rating: 0,
    user: '',
  };
  rating = '';


  isLoggedIn = false;
  username: string;


  constructor(
    private pubService: PubService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.message = '';
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
    }
    this.GetReviews(this.username);
    }

  deleteReview(id: any) {
    this.reviewService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }

  GetReviews(username: any) {
    this.reviewService.findByName(username)
      .subscribe(
        reviewdata => {
          this.reviews = reviewdata;
          // console.log(reviewdata);
          if (stringify(reviewdata).length === 0) {
            this.NoReviews = 'You Have Not Made Any Reviews Yet ';
          }
        },
        error => {
          console.log(error);
        });
  }
  GetWidth(rating: any) {
    rating = rating * 20;
    this.rating = (rating += '%');
    // console.log('rating is ' + this.rating);
    return this.rating;
  }
}
