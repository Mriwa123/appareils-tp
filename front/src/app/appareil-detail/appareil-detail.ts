import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Appareil } from '../models/appareil.model';
import { AppareilService } from '../services/appareil';

@Component({
  selector: 'app-appareil-detail',
  imports: [RouterLink],
  templateUrl: './appareil-detail.html',
  styleUrl: './appareil-detail.css',
})
export class AppareilDetail {
  private route = inject(ActivatedRoute);
  private appareilService = inject(AppareilService);

  appareil = signal<Appareil | null>(null);
  error = signal('');

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.appareil.set(null);
      this.error.set('');
      this.appareilService.getAppareil(params.get('id') ?? '').subscribe({
        next: (a) => this.appareil.set(a),
        error: () => this.error.set('Appareil introuvable'),
      });
    });
  }
}