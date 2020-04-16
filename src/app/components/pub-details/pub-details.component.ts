import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ReviewService} from '../../services/review.service';

@Component({
  selector: 'app-pub-details',
  templateUrl: './pub-details.component.html',
  styleUrls: ['./pub-details.component.css']
})

export class PubDetailsComponent implements OnInit {
  currentPub = null;
  reviews: any;
  message = '';
  review = {
    pub_id: 0,
    review_title: '',
    review_text: '',
    rating: 0,
    user: '',

  };
  submitted = false;

  constructor(
    private pubService: PubService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getPub(this.route.snapshot.paramMap.get('id'));
  }

  getPub(id) {
    this.pubService.get(id)
      .subscribe(
        data => {
          this.currentPub = data;
          this.GetReviews(this.currentPub.id);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveReview(id: any) {
    const data = {
      pub_id: id,
      review_title: this.review.review_title,
      review_text: this.review.review_text,
      rating: this.review.rating,
      user: 'tom',
    };
    console.log('this is the pub id before review ' + data.pub_id);
    this.reviewService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status) {
    const data = {

    };

    this.pubService.update(this.currentPub.id, data)
      .subscribe(
        response => {
          this.currentPub.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updatePub() {
    this.pubService.update(this.currentPub.id, this.currentPub)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The Pub was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deletePub() {
    this.pubService.delete(this.currentPub.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/pubs']);
        },
        error => {
          console.log(error);
        });
  }

  GetReviews(pubid: any) {
    console.log('This is pub_id in function ' + pubid);
    this.reviewService.findByID(pubid)
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
