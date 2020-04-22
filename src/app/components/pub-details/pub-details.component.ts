import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ReviewService} from '../../services/review.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {stringify} from 'querystring';


@Component({
  selector: 'app-pub-details',
  templateUrl: './pub-details.component.html',
  styleUrls: ['./pub-details.component.css']
})

export class PubDetailsComponent implements OnInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  currentPub = null;
  reviews: any;
  message = '';
  NoReviews = '';
  review = {
    pub_id: 0,
    review_title: '',
    review_text: '',
    rating: 0,
    user: '',

  };
  submitted = false;
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  private roles: string[];
  isSuccessful = false;


  constructor(
    private pubService: PubService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.getPub(this.route.snapshot.paramMap.get('id'));

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.mapInitializer();
    setTimeout(() => {
        this.MakePubMarker();
      },
      1000);
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
      user: this.username,
    };
    if (data.rating >= 0 && data.rating <= 5) {
      document.getElementById('rating_error').style.display = 'none';
      this.reviewService.create(data)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.isSuccessful = true;
          },
          error => {
            console.log(error);
          });
    } else {
      this.message = 'Rating Must be a number between 0 and 5';
      document.getElementById('rating_error').style.display = 'block';
    }
  }

  updatePublished(status) {
    const data = {};

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
         // document.getElementById('cornerimage').style.width = reviewdata.rating
          if (stringify(reviewdata).length === 0) {
            this.NoReviews = 'There Are Currently No Reviews of the Guinness at This Pub';
          }
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
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }

  Reload() {
    window.location.reload();
  }

  mapInitializer() {

    const lat = 53.3473;
    const lng = -6.2591;
    const coordinates = new google.maps.LatLng(lat, lng);

    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 12,
    };

    this.map = new google.maps.Map(this.gmap.nativeElement,
      mapOptions);
  }


  MakePubMarker() {
    const newmap = this.map;
    console.log('PLACING MARKER');

    const pint = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 0.15,
      strokeColor: 'black',
      strokeWeight: 2
    };


    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.currentPub.lat, this.currentPub.lon),
      icon: pint,
      map: newmap
    });

  }
}
