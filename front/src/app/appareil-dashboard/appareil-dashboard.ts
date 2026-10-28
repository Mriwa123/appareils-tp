import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Appareil } from '../models/appareil.model';
import { AppareilService } from '../services/appareil';

@Component({
  selector: 'app-appareil-dashboard',
  imports: [FormsModule, RouterLink],
  templateUrl: './appareil-dashboard.html',
  styleUrl: './appareil-dashboard.css',
})
export class AppareilDashboard implements OnInit {
  private appareilService = inject(AppareilService);

  appareils = signal<Appareil[]>([]);
  error = signal('');

  newName = '';
  newStatus: 'On' | 'Off' = 'Off';

  ngOnInit() {
    this.load();
  }

  load() {
    this.appareilService.getAppareils().subscribe({
      next: (list) => this.appareils.set(list),
      error: () => this.error.set('Unable to load the appliances'),
    });
  }

  onSwitch(a: Appareil) {
    const status = a.status === 'On' ? 'Off' : 'On';
    this.appareilService.updateAppareil(a._id, { name: a.name, status }).subscribe(() => this.load());
  }

  onSwitchAll(status: 'On' | 'Off') {
    const list = this.appareils();
    if (list.length === 0) return;
    forkJoin(list.map((a) => this.appareilService.updateAppareil(a._id, { name: a.name, status }))).subscribe(() =>
      this.load(),
    );
  }

  onSwitchOffAll() {
    if (confirm('Are you sure you want to switch off all your appliances?')) {
      this.onSwitchAll('Off');
    }
  }

  onDelete(a: Appareil) {
    if (confirm(`Delete ${a.name}?`)) {
      this.appareilService.deleteAppareil(a._id).subscribe(() => this.load());
    }
  }

  onAdd() {
    if (!this.newName.trim()) return;
    this.appareilService.addAppareil({ name: this.newName.trim(), status: this.newStatus }).subscribe(() => {
      this.newName = '';
      this.load();
    });
  }
}