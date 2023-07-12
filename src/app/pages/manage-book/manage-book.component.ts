import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../base.service';
import { User } from '../../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { ManageBookService } from './manage-book.service';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit {
  get user() {
    return this.baseService.user;
  }

  public id: number | undefined;

  bookForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    author: ['', [Validators.required, Validators.maxLength(50)]],
    category: [''],
    pageTotal: ['', [Validators.required, Validators.min(0)]],
    isActive: [false, Validators.required]
  });

  constructor(private manageBookService: ManageBookService, private baseService: BaseService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit() {

    if(history.state.book) {
      this.id = history.state.book.id;
      this.bookForm.patchValue(history.state.book);
    }
  }

  goToHomePage() {
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    if(this.bookForm.invalid) {
      alert('Preencha todos os campos obrigatórios! Nenhum pode ter mais do que 50 caractéres e o número de páginas não pode ser negativo')
    }

    let book = {
      name: this.bookForm.value.name!,
      author: this.bookForm.value.author!,
      category: this.bookForm.value.category! == 'null' || this.bookForm.value.category! == '' ? null : this.bookForm.value.category!,
      pageTotal: Number(this.bookForm.value.pageTotal!),
      isActive: this.bookForm.value.isActive!
    }

    if(this.id) {
      this.manageBookService.updateBook(this.id, book).subscribe({
        next: (res: any) => {
          alert("Livro atualizado com sucesso!")
          this.router.navigateByUrl('/');
        },
        error: (error: any) => {
          alert('Erro ao atualizar livro')
        }
      });
    } else {
      this.manageBookService.createBook(book).subscribe({
        next: (res: any) => {
          alert("Livro criado com sucesso!")
          this.router.navigateByUrl('/');
        },
        error: (error: any) => {
          alert('Erro ao carregar ao criar livro')
        }
      });
    }
  }
}
