import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// @ts-ignore
import { } from '@types/googlemaps';
import {PubService} from '../../services/pub.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  pubs: any;

  constructor(private pubService: PubService) {
  }

  ngOnInit(): void {
    this.retrievePubs();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.mapInitializer();
    setTimeout(() => {
        this.MakePubMarkers();
      },
      1000);
    // this.MakePubMarkers();
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

  MakePubMarkers() {
    const newmap = this.map;
    const iconBase = 'src/app/assets/';

    const pint = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 0.15,
      strokeColor: 'black',
      strokeWeight: 2
    };


    // tslint:disable-next-line:only-arrow-functions
    this.pubs.forEach(function(pub) {
       const marker = new google.maps.Marker({
        position: new google.maps.LatLng(pub.lat, pub.lon),
         icon: pint,
        map: newmap
      });

       const contentString = '<div class="cafe-info-window">' +
        '<div class="cafe-name">' + pub.name + '</div>' +
        '<a href="/pubs/' + pub.id + '">Click here to see Reviews</a>' +
        '</div>' +
        '</div>';



      // tslint:disable-next-line:only-arrow-functions
       const infowindow = new google.maps.InfoWindow({
         content: contentString
      });
      // tslint:disable-next-line:only-arrow-functions
       marker.addListener('click', function() {
         // tslint:disable-next-line:prefer-const
         let map;
         infowindow.open(map, marker);
      });
    });

  }

  retrievePubs() {
    this.pubService.getAll()
      .subscribe(
        data => {
          this.pubs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
