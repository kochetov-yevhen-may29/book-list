import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

const options = [
  { value: 'all', title: 'Show All' },
  { value: 'active', title: 'Show Active' },
  { value: 'deactivated', title: 'Show Deactiveted' },
];

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  constructor(private router: Router) {}
  options = options;

  @Input() selected!: string;

  selectOption(option: string) {
    this.selected = option;
  }

  updateRoute() {
    this.router.navigate([`/dashboard/${this.selected}`]);
  }
}
