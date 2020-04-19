import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ReviewService} from '../../services/review.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  currentReview = null;
  message = '';
  reviews: any;
  review = {
    id : 0,
    pub_id: 0,
    review_title: '',
    review_text: '',
    rating: 0,
    user: '',
  };


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

  getPub(id) {
    this.pubService.get(id)
      .subscribe(
        data => {
          this.currentReview = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status) {
    const data = {
      title: this.currentReview.title,
      description: this.currentReview.description,
      rating: this.currentReview.rating
    };

    this.pubService.update(this.currentReview.id, data)
      .subscribe(
        response => {
          this.currentReview.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateReview(id: any, review: any) {
    this.reviewService.update(id, review)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The Pub was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteReview(id: any) {
    this.reviewService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/pubs']);
        },
        error => {
          console.log(error);
        });
  }

  GetReviews(username: any) {
    console.log('This is username in function ' + username);
    this.reviewService.findByName(username)
      .subscribe(
        reviewdata => {
          this.reviews = reviewdata;
          console.log(reviewdata);
        },
        error => {
          console.log(error);
        });
  }
}
