import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  getCurrentPosition(): Observable<GeolocationPosition> {
    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject('Geolocation not supported');
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
      })
    );
  }
}