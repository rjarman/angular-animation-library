import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AnimationTriggers } from 'src/app/animation.lib';
import { DATABASE } from './config';

interface Table {
  id: string;
  title: string;
  date: string;
}

interface Pager {
  slice: number[] | null;
  inc: number;
  slicePerPage: number;
  lowerRange: number;
  upperRange: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [AnimationTriggers],
})
export class TableComponent implements OnInit, AfterViewInit {
  private tabC2H: HTMLElement;
  private pageNo: HTMLCollectionOf<HTMLDataListElement>;
  private pagerBtn: HTMLCollectionOf<HTMLDataListElement>;
  data: Table[];
  slicedData: Table[];
  pager: Pager;

  constructor(private titleService: Title) {
    this.titleService.setTitle('ACP | Form');
    this.pager = {
      inc: 0,
      slice: [0],
      slicePerPage: 10,
      lowerRange: 0,
      upperRange: 10,
    };
  }

  ngOnInit(): void {
    this.data = DATABASE.sort(this.sortBy('date'));
    this.updateSlicedData();
    this.pager.slice = this.getSlice();
  }

  ngAfterViewInit(): void {
    this.tabC2H = document.getElementsByClassName(
      'tab-c-2-h'
    )[0] as HTMLElement;
    this.pageNo = document.getElementsByClassName(
      'page-no'
    ) as HTMLCollectionOf<HTMLDataListElement>;
    this.pagerBtn = document.getElementsByClassName(
      'pager-btn'
    ) as HTMLCollectionOf<HTMLDataListElement>;
    this.pageNo[0].classList.remove('disabled');
    if (this.data.length <= this.pager.slicePerPage) {
      this.pagerBtn[2].classList.add('disabled');
      this.pagerBtn[3].classList.add('disabled');
    }
    this.pagerBtn[0].classList.add('disabled');
    this.pagerBtn[1].classList.add('disabled');
  }

  private sortBy(
    key: string,
    isReverse = false
  ): (table1: Table, table2: Table) => number {
    if (isReverse) {
      return (table1, table2) => {
        if (table1[key] < table2[key]) {
          return -1;
        } else if (table1[key] > table2[key]) {
          return 1;
        }
        return 0;
      };
    }
    return (table1, table2) => {
      if (table1[key] > table2[key]) {
        return -1;
      } else if (table1[key] < table2[key]) {
        return 1;
      }
      return 0;
    };
  }

  private getSlice(): number[] {
    const rem = this.data.length % this.pager.slicePerPage;
    if (this.data.length <= this.pager.slicePerPage) {
      return [...Array(1).keys()];
    }
    if (rem === 0) {
      return [...Array(this.data.length / this.pager.slicePerPage).keys()];
    }
    return [
      ...Array((this.data.length - rem) / this.pager.slicePerPage + 1).keys(),
    ];
  }

  private updateSlicedData(): void {
    this.slicedData = this.data.slice(
      this.pager.lowerRange,
      this.pager.upperRange
    );
  }

  private togglePagerBtn(): void {
    const slices = this.getSlice();
    if (this.pager.inc === slices[0]) {
      this.pagerBtn[0].classList.add('disabled');
      this.pagerBtn[1].classList.add('disabled');
      this.pagerBtn[2].classList.remove('disabled');
      this.pagerBtn[3].classList.remove('disabled');
      return;
    }
    if (this.pager.inc === slices.slice(-1)[0]) {
      this.pagerBtn[0].classList.remove('disabled');
      this.pagerBtn[1].classList.remove('disabled');
      this.pagerBtn[2].classList.add('disabled');
      this.pagerBtn[3].classList.add('disabled');
      return;
    }
    this.pagerBtn[0].classList.remove('disabled');
    this.pagerBtn[1].classList.remove('disabled');
    this.pagerBtn[2].classList.remove('disabled');
    this.pagerBtn[3].classList.remove('disabled');
  }

  private togglePageNo(param: {
    isForward?: boolean;
    isBackward?: boolean;
    pagePointer?: number;
  }): void {
    let pageNoLength = this.pageNo.length;
    if (param.isForward) {
      while (pageNoLength) {
        pageNoLength -= 1;
        if (pageNoLength === this.getSlice().slice(-1)[0]) {
          this.pageNo[pageNoLength].classList.remove('disabled');
        } else {
          this.pageNo[pageNoLength].classList.add('disabled');
        }
      }
      return;
    }
    if (param.isBackward) {
      while (pageNoLength) {
        pageNoLength -= 1;
        if (pageNoLength === this.getSlice()[0]) {
          this.pageNo[pageNoLength].classList.remove('disabled');
        } else {
          this.pageNo[pageNoLength].classList.add('disabled');
        }
      }
      return;
    }
    while (pageNoLength) {
      pageNoLength -= 1;
      if (pageNoLength === param.pagePointer) {
        this.pageNo[pageNoLength].classList.remove('disabled');
      } else {
        this.pageNo[pageNoLength].classList.add('disabled');
      }
    }
  }

  sort(): void {
    if (this.tabC2H.classList.contains('asc')) {
      this.tabC2H.classList.remove('asc');
      this.data.sort(this.sortBy('date', true));
      this.updateSlicedData();
    } else {
      this.tabC2H.classList.add('asc');
      this.data.sort(this.sortBy('date'));
      this.updateSlicedData();
    }
  }

  backward(): void {
    this.pager.lowerRange = 0;
    this.pager.upperRange = this.pager.slicePerPage;
    this.updateSlicedData();
    this.togglePageNo({ isBackward: true });
    this.pager.inc = this.getSlice()[0];
    this.togglePagerBtn();
  }

  left(): void {
    if (this.pager.lowerRange <= this.pager.slicePerPage) {
      this.pager.lowerRange = 0;
      this.pager.upperRange = this.pager.slicePerPage;
      this.pager.inc -= 1;
      this.togglePageNo({ pagePointer: this.pager.inc });
      this.togglePagerBtn();
    } else {
      this.pager.lowerRange = this.pager.lowerRange - this.pager.slicePerPage;
      if (this.pager.upperRange === this.data.length) {
        this.pager.upperRange =
          this.pager.upperRange -
          (this.pager.upperRange % this.pager.slicePerPage);
      } else {
        this.pager.upperRange = this.pager.upperRange - this.pager.slicePerPage;
      }
      this.pager.inc -= 1;
      this.togglePageNo({ pagePointer: this.pager.inc });
      this.togglePagerBtn();
    }
    this.updateSlicedData();
  }

  right(): void {
    this.pager.inc += 1;
    const limit =
      this.data.length - (this.data.length % this.pager.slicePerPage);
    if (this.pager.upperRange >= limit) {
      this.pager.lowerRange = limit;
      this.pager.upperRange = this.data.length;
      this.togglePageNo({ pagePointer: this.pager.inc });
      this.togglePagerBtn();
    } else {
      this.pager.lowerRange = this.pager.slicePerPage * this.pager.inc;
      this.pager.upperRange = this.pager.lowerRange + this.pager.slicePerPage;
      this.togglePageNo({ pagePointer: this.pager.inc });
      this.togglePagerBtn();
    }
    this.updateSlicedData();
  }

  forward(): void {
    this.pager.lowerRange =
      this.data.length - (this.data.length % this.pager.slicePerPage);
    this.pager.upperRange = this.data.length;
    this.updateSlicedData();
    this.togglePageNo({ isForward: true });
    this.pager.inc = this.getSlice().slice(-1)[0];
    this.togglePagerBtn();
  }

  jumpPage(event): void {
    this.pager.inc = Number(event.target.innerHTML) - 1;
    this.pager.lowerRange = this.pager.inc * this.pager.slicePerPage;
    this.pager.upperRange = this.pager.lowerRange + this.pager.slicePerPage;
    if (this.pager.upperRange > this.data.length) {
      this.pager.upperRange = this.data.length;
    }
    this.togglePageNo({ pagePointer: this.pager.inc });
    this.togglePagerBtn();
    this.updateSlicedData();
  }
}
