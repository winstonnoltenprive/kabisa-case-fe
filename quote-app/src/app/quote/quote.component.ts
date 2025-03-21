import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  private quoteUrl = 'http://localhost:8080/api/quote';
  quote: string | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  // Login properties
  username: string = '';
  password: string = '';
  userEmail: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote(): void {
    // Reset state before fetching new quote
    this.loading = true;
    this.errorMessage = null;
    this.quote = null;

    this.http.post<any>(this.quoteUrl, {}).subscribe({
      next: (quoteData) => {
        this.quote = typeof quoteData === 'string' ? quoteData : quoteData?.text;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching quote', err);
        this.errorMessage = 'Error fetching quote';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  login(): void {

    if (this.username && this.password) {
      this.userEmail = this.username;

      this.username = '';
      this.password = '';
    }
  }

  logout(): void {
    this.userEmail = null;
  }
}
