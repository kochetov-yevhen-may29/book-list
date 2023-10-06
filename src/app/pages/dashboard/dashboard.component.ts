import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/Book.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SelectType } from 'src/app/types/SelectType';
import { BookDetails } from 'src/app/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selected: string = 'active';

  bookDetails$ = this.bookService.bookDetails$;

  activeBookDeteils$ = this.bookDetails$.pipe(
    map(bookDetails => bookDetails
      .filter(bookDetails => bookDetails.status))
  )
  deactivetedBookDeteils$ = this.bookDetails$.pipe(
    map(bookDetails => bookDetails
      .filter(bookDetails => !bookDetails.status))
  )

  allCount$ = this.bookDetails$.pipe(
    map(bookDetails => bookDetails.length)
  )
  activeCount$ = this.activeBookDeteils$.pipe(
    map(bookDetails => bookDetails.length)
  )
  deactivatedCount$ = this.deactivetedBookDeteils$.pipe(
    map(bookDetails => bookDetails.length)
  )

  visibleBookDeteils$ = this.route.params.pipe(
    switchMap(params => {
      switch (params['status'] as SelectType) {
        case 'active':
          this.selected = 'active';
          return this.activeBookDeteils$;

        case 'deactivated':
          this.selected = 'deactivated';
          return this.deactivetedBookDeteils$

        default:
          this.selected = 'all';
          return this.bookDetails$
      }
    })
  )

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
    })
    this.bookService.loadBookDetails().subscribe()
  }
}
