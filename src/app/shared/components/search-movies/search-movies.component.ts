import { Component, EventEmitter, Output } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/service/types/interface';
import { Subject, debounceTime, switchMap, catchError } from 'rxjs';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent {
  @Output() searchResults = new EventEmitter<Movie[]>();
  movies: Movie[] = [];
  isLoading = false;
  searchQuery = '';
  searchQuerySubject = new Subject<string>();
  errorMessage: string = '';

  constructor(private moviesService: MoviesService) {

    this.searchQuerySubject.pipe(
      debounceTime(300),
      switchMap(query => {
        this.isLoading = true;
        this.movies = [];
        return this.moviesService.getMovies(query);
      }),
      catchError(error => {
        console.error('Search failed:', error);
        this.errorMessage = 'Failed to load data!';
        this.isLoading = false;
        throw error;
      })
    ).subscribe(movies => {
      this.movies = movies;
      this.isLoading = false;
      this.searchResults.emit(this.movies);
    });
  }

  searchMovies(): void {
    this.searchQuerySubject.next(this.searchQuery);
  }
}
