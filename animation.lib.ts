import {
    animate,
    group,
    query,
    stagger,
    style,
    transition,
    trigger,
} from "@angular/animations";

const AnimFadeQuery = query(
    ".anim-fade",
    [style({ opacity: 0 }), animate(1500, style({ opacity: 1 }))],
    { optional: true }
);

const AnimExpandQuery = query(
    ".anim-expand--wrap",
    [style({ width: 0 }), animate("2000ms ease-out", style({ width: "*" }))],
    { optional: true }
);

const AnimBlinkBgColorQuery = [
    query(
        ".anim-blink-bg-color--gold",
        [
            style({ background: "white" }),
            animate(
                1500,
                style({
                    background: "rgba(150, 147, 0, 0.1)",
                })
            ),
            animate(1500),
        ],
        { optional: true }
    ),
];

// bug fix for using bg blink and fade in a same components
const AnimBlinkBgColorFadeQuery = [
    query(
        ".anim-fade-blink-bg-color--gold",
        [
            style({ background: "white", opacity: 0 }),
            animate(
                1500,
                style({
                    background: "rgba(150, 147, 0, 0.1)",
                    opacity: 1,
                })
            ),
            animate(1500),
        ],
        { optional: true }
    ),
];

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

const AnimSlideQuery = [
    query(
        ".anim-slide--right",
        [
            style({ transform: "translateX(100%)" }),
            animate(1500, style({ transform: "translateX(0)" })),
        ],
        { optional: true }
    ),
    query(
        ".anim-slide--left",
        [
            style({ transform: "translateX(-100%)" }),
            animate(1500, style({ transform: "translateX(0)" })),
        ],
        { optional: true }
    ),
    query(
        ".anim-slide--up",
        [
            style({ transform: "translateY(-100%)" }),
            animate(1500, style({ transform: "translateX(0)" })),
        ],
        { optional: true }
    ),
    query(
        ".anim-slide--down",
        [
            style({ transform: "translateY(100%)" }),
            animate(1500, style({ transform: "translateX(0)" })),
        ],
        { optional: true }
    ),
];

const AnimSlideStaggerQuery = [
    query(
        ".anim-slide-stagger--left",
        [
            style({ opacity: 0, transform: "translateX(-100%)" }),
            stagger(100, [
                animate(
                    1500,
                    style({ opacity: 1, transform: "translateX(0)" })
                ),
            ]),
        ],
        { optional: true }
    ),
    query(
        ".anim-slide-stagger--right",
        [
            style({ opacity: 0, transform: "translateX(100%)" }),
            stagger(100, [
                animate(
                    1500,
                    style({ opacity: 1, transform: "translateX(0)" })
                ),
            ]),
        ],
        { optional: true }
    ),
    query(
        ".anim-slide-stagger--up",
        [
            style({ opacity: 0, transform: "translateY(-100%)" }),
            stagger(100, [
                animate(
                    1500,
                    style({ opacity: 1, transform: "translateY(0)" })
                ),
            ]),
        ],
        { optional: true }
    ),
    query(
        ".anim-slide-stagger--down",
        [
            style({ opacity: 0, transform: "translateY(100%)" }),
            stagger(100, [
                animate(
                    1500,
                    style({ opacity: 1, transform: "translateY(0)" })
                ),
            ]),
        ],
        { optional: true }
    ),
];

export const AnimationTriggers = trigger("animation-triggers", [
    transition(
        "* => *",
        group([
            AnimFadeQuery,
            AnimExpandQuery,
            ...AnimBlinkBgColorQuery,
            ...AnimBlinkTextColorQuery,
            ...AnimSlideQuery,
            ...AnimSlideStaggerQuery,
            ...AnimBlinkBgColorFadeQuery,
        ])
    ),
]);
