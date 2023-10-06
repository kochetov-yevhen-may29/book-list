import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/Book.service';
import { BookDetails } from 'src/app/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() visibleBookDetails$!: Observable<BookDetails[]>

  constructor( private bookService: BookService) { }

  deleteBookDetail(bookDetail: BookDetails) {
    this.bookService.deleteBookDetail(bookDetail)
      .subscribe();
  }

  toggleBookDetail(bookDetail: BookDetails) {
    this.bookService.updateBookDetail({...bookDetail, status: !bookDetail.status})
      .subscribe()
  }
}
