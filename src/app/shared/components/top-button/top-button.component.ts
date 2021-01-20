import {Component, HostListener, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-top-button',
  templateUrl: './top-button.component.html',
  styleUrls: ['./top-button.component.scss']
})
export class TopButtonComponent implements OnInit {
  pageYOffset = 0;

  @HostListener('window:scroll', ['$event']) onScroll(event): void {
    this.pageYOffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller) {
  }

  ngOnInit(): void {

  }

  scrollToTop(): void {
    this.scroll.scrollToPosition([0, 0]);
  }
}
