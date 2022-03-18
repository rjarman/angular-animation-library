import { animate, style, trigger, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimState', [
      transition('* => tablePage', [
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'FigmaToAngular';

  getRouterState(routerOutlet: RouterOutlet) {
    const routeData = routerOutlet.activatedRouteData['animation'];
    return routeData
  }
}
