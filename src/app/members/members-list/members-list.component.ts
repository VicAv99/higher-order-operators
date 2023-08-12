import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MembersListDataSource } from 'src/app/members/members-list/members-list.datasource';

import { CallState, LoadingState, Member } from '../member.model';

@Component({
  standalone: true,
  selector: 'higher-order-operators-members-list',
  templateUrl: './members-list.component.html',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class MembersListComponent implements OnChanges {
  protected dataSource?: MembersListDataSource;

  protected readonly displayedColumns = ['name', 'actions'];
  protected readonly loadingState = LoadingState;
  protected readonly searchControl = new FormControl();

  @Input() callState?: CallState = LoadingState.INIT;
  @Input() members?: Member[] | null = [];

  @Output() deleted = new EventEmitter<Member>();
  @Output() selected = new EventEmitter<Member>();
  @Output() searched = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(): void {
    if (!this.sort || !this.paginator) return;
    this.dataSource = new MembersListDataSource(
      this.members || [],
      this.sort,
      this.paginator
    );
  }

  selectedClicked(member: Member) {
    this.selected.emit(member);
  }

  deleteClicked(member: Member) {
    this.deleted.emit(member);
  }
}
