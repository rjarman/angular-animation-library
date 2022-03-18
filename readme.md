# animation.lib.ts

This is an animation library which has the following characteristics:
- It uses css class as animation triggers
- Simple and flexible implementation
- It has only one `animation-triggers` which consists of unlimited(no limitations) css class animations
- Class names follows **BEM** and **OOCSS** methods
- For developers it offers very simple process to add new animations
- *It has currently limited classes only for demonstration of the design pattern.*

> Users Guide

- `BrowserAnimationsModule` should be added on the root module of a project only once
- `animation-triggers` should be added on every components where it will be used as follows:
    ```ts
    import { AnimationTriggers } from "../../../root/animation.lib";
    @Component({
        ...
        animations: [AnimationTriggers]
    })
    ```

- `@animation-triggers` should be added on the parent component of the child component where animation will be run as follows:

    ```html
    <div @animation-triggers>
        <h2 class="anim-slide--right">This is a sample animation</h2>
        <p class="anim-fade">Hello</p>
    </div>
    ```

- **stagger** animation should use with **loop** as follows:

    ```html
    <div style="overflow: hidden" @animation-triggers>
        <div *ngFor="let datum of slicedData" class="anim-slide-stagger--down">
            <a class="tab-r" routerLink="{{ datum.id }}/details">
            <div class="tab-c-1">{{ datum.title }}</div>
            <div class="tab-c-2">{{ datum.date }}</div>
            <div class="tab-c-2">{{ datum.updateDate }}</div>
            </a>
        </div>
    </div>
    ```

> Classes List

`anim-fade`, `anim-expand--wrap`, `anim-blink-bg-color--gold`, `anim-fade-blink-bg-color--gold`, `anim-blink-text-color--gold`, `anim-slide--right`, `anim-slide--left`, `anim-slide--up`, `anim-slide--down`, `anim-slide-stagger--left`, `anim-slide-stagger--right`, `anim-slide-stagger--up`, `anim-slide-stagger--down`
  
> Developers Guide

- New state can be stacked like this:
    *Initial:*
    ```ts
    export const AnimationTriggers = trigger("animation-triggers", [
        transition("* => *",group([AnimFadeQuery])),
    ]);
    ```
    *Updated:*
    ```ts
    export const AnimationTriggers = trigger("animation-triggers", [
        transition("* => true", group([AnimFadeQuery])),
        transition("* => *",group([AnimFadeQuery])),
    ]);
    ```
    *Note: New states must include before `* => *` because its a global case.*

- New `query` can be added like this:
    *Initial:*
    ```ts
    const AnimBlinkTextColorQuery = [
        query(
            ".anim-blink-text-color--gold",
            [
                style({ color: "inherit" }),
                animate(1500, style({ color: "#969300" })),
                animate(1500),
            ],
            { optional: true }
        ),
    ];
    ```
    *Updated:*
    ```ts
    const AnimBlinkTextColorQuery = [
        query(
            ".anim-blink-text-color--gold",
            [
                style({ color: "inherit" }),
                animate(1500, style({ color: "#969300" })),
                animate(1500),
            ],
            { optional: true }
        ),
        query(
            ".anim-blink-text-color--black",
            [
                style({ color: "inherit" }),
                animate(1500, style({ color: "#000000" })),
                animate(1500),
            ],
            { optional: true }
        ),
    ];
    ```
    *Note: Must follow the **BEM** method for naming.*

- Two ways of creating query:
  - As Variables:
    ```ts
    const AnimFadeQuery = query(
        ".anim-fade",
        [style({ opacity: 0 }), animate(1500, style({ opacity: 1 }))],
        { optional: true }
    );
    ```
    for this you can add this to final `AnimationTriggers` variable as follows:
    ```ts
    export const AnimationTriggers = trigger("animation-triggers", [
        transition("* => *", group([AnimFadeQuery])),
    ]);
    ```
    
  - As Array:
    ```ts
    const AnimFadeQuery = [
        query(
            ".anim-fade",
            [style({ opacity: 0 }), animate(1500, style({ opacity: 1 }))],
            { optional: true }
        )
    ];
    ```
    for this you can add this to final `AnimationTriggers` variable as follows:
    ```ts
    export const AnimationTriggers = trigger("animation-triggers", [
        transition("* => *", group([...AnimFadeQuery])),
    ]);

> Warnings(for developers)

**@animation-triggers** should not be used in the self mode as follows:*
```html
<h2 class="anim-slide--right" @animation-triggers>This is a sample animation</h2>
```
it can be developed by using `transition` as `state` but it will broke the whole library. For example:

on `example.component.html`
```ts
<h2 class="anim-slide--right" [@animation-triggers]="'self'">This is a sample animation</h2>
```
on `animation.lib.ts` added this state by using `query(':self')` but unfortunately it will break everything. So that it won't be necessary to add this type of coding, instead use the parent child rule as previously described.
