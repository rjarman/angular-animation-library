import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AnimationTriggers } from '../animation.lib';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [AnimationTriggers],
})
export class IndexComponent implements OnInit, AfterViewInit {
  isOver = false;
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const analysisCard = document.getElementById('analysis');
    analysisCard.addEventListener('mouseover', () => {
      this.isOver = true;
    });
    // analysisCard.addEventListener('mouseleave', () => {
    //   this.isOver = false;
    // });
  }
}
