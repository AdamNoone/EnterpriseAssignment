// This components .html and .ts have functionality inspired by a tutorial by bezkoder
// This Components code contains some elements of this tutorial that have been heavily adapted for this project
// The tutorial can be accessed at https://bezkoder.com/angular-crud-app/#Add_new_Item_Component


import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import {UserService} from '../../services/user.service';
import axios from 'axios';
// @ts-ignore
import { } from '@types/googlemaps';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  pub = {
    name: '',
    address: '',
    lat: 0.0,
    lon: 0.0,
  };

  submitted = false;
  AddPubFailed = false;
  errorMessage = '';
  isSuccessful = false;
  private content: any;

  form: any = {};

  constructor(private pubService: PubService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.mapInitializer();
  }

  savePub() {
    const data = {
      name: this.pub.name,
      lat:  (document.getElementById('lat') as HTMLInputElement).innerText,
      lon: (document.getElementById('lon') as HTMLInputElement).innerText,
    };

    this.pubService.create(data)
      .subscribe(
        response => {
          this.submitted = true;
          this.isSuccessful = true;
          this.AddPubFailed = false;
          document.getElementById('map').style.display = 'none';
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.AddPubFailed = true;
          document.getElementById('map').style.display = 'block';
        });
  }




  newPub() {
    window.location.reload();
  }

  GetBusinessAddress() {

    const location = (document.getElementById('address') as HTMLInputElement).value;
    const x = this.map;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyAtQd15O88p-QTIGHwkP1hq554j8PwPJMc'
      }
    })
    // tslint:disable-next-line:only-arrow-functions
      .then(function(response) {
        // console.log(response);


        // Geometry
        const lat = response.data.results[0].geometry.location.lat;
        const lon = response.data.results[0].geometry.location.lng;
        // console.log('this is the lat ' + lat);
        // console.log('this is the lon ' + lon);

        document.getElementById('lat').innerHTML = lat;
        document.getElementById('lon').innerHTML = lon;
        // tslint:disable-next-line:no-unused-expression
        new MakePubMarker(lat, lon, x);
      })
      // tslint:disable-next-line:only-arrow-functions
      .catch(function(error) {
        console.log(error);
      });


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

}


function MakePubMarker(lat: any, lon: any, map: any) {
  const newmap = map;

  const pint = {
    url: '../../../assets/cartoon_guinness_small.png',
    strokeColor: 'black',
    strokeWeight: 2,
    scaledSize: new google.maps.Size(15, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };


  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lon),
    icon: pint,
    map: newmap
  });


}


//////////////////////

