import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal<boolean>(false);
  errorMessage = signal<string>('');

  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  places = this.placesService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    /*
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places', {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          this.places.set(response.body?.places);
        },
        error: (error: Error) => {
          this.errorMessage.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
    */

    const subscription = this.placesService.loadUserPlaces().subscribe({
      error: (error) => {
        this.errorMessage.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onRemovePlace(place: Place) {
    const subscription = this.placesService.removeUserPlace(place).subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}