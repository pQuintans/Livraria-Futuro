import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from './landing-page.service';
import { BookInterface } from 'src/app/models/book';
import { BaseService } from 'src/app/base.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public books: BookInterface[]
  public filteredBooks: BookInterface[]
  public filter: string = ''

  get user() {
    return this.baseService.user;
  }

  constructor(private landingPageService: LandingPageService, private baseService: BaseService, private router: Router) {
    this.books = []
    this.filteredBooks = []
  }

  ngOnInit() {
    this.getAllBooks();
  }

  createBook() {
    this.router.navigateByUrl(`/manage`);
  }

  deleteBook(book: BookInterface) {
    if(!book.isActive) return

    if(confirm((`Tem certeza que quer apagar o livro ${book.name} escrito por ${book.author}`))) {
      this.landingPageService.deleteBook(book.id).subscribe({
        next: (data) => {
          this.books = data.retorno;
          this.filteredBooks = data.retorno;
        },
        error: (error: any) => {
          alert('Erro ao apagar livro')
        }
      });
    }
  }

  editBook(book: BookInterface) {
    this.router.navigateByUrl(`/manage`, { state: {book} });
  }

  getAllBooks() {
    this.landingPageService.getAllBooks().subscribe({
      next: (data: any) => {
        this.books = data.retorno;
        this.filteredBooks = data.retorno;
      },
      error: (error: any) => {
        alert('Erro ao carregar a lista de livros')
      }
    });
  }

  filterBooks() {
    this.filteredBooks = this.books.filter(book =>
      book.name.toLowerCase().includes(this.filter.toLowerCase())
      || book.author.toLowerCase().includes(this.filter.toLowerCase())
      || book.category.toLowerCase().includes(this.filter.toLowerCase())
    )
  }
}
