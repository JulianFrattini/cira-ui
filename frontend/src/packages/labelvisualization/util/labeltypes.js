const labeltypes = [
    {
        "label": "Cause1",
        "short": "c1",
        "descr": "A cause is an event (durative or instantaneous) which is a necessary and sufficient trigger for another event (called the effect). Cause1 is the first cause if multiple occur.",
        "color": "#d46371",
        "level": "1"
    }, {
        "label": "Cause2",
        "short": "c2",
        "descr": "Cause2 is the second cause if multiple occur.",
        "color": "#d4637f",
        "level": "1"
    }, {
        "label": "Cause3",
        "short": "c3",
        "descr": "Cause3 is the second cause if multiple occur.",
        "color": "#cc668b",
        "level": "1"
    }, {
        "label": "Effect1",
        "short": "e1",
        "descr": "An effect is an event (durative or instantaneous) which is triggered by its cause. Effect1 is the first effect if multiple occur.",
        "color": "#7fa2ff",
        "level": "1"
    }, {
        "label": "Effect2",
        "short": "e2",
        "descr": "Effect2 is the second effect if multiple occur.",
        "color": "#7fb9ff",
        "level": "1"
    }, {
        "label": "Effect3",
        "short": "e3",
        "descr": "Effect3 is the second effect if multiple occur.",
        "color": "#7fc8ff",
        "level": "1"
    }, {
        "label": "Variable",
        "short": "v",
        "descr": "Every event (cause or effect) should contain one variable, which is the subject of that event.",
        "color": "#fcba03",
        "level": "0"
    }, {
        "label": "Condition",
        "short": "c",
        "descr": "Every event (cause or effect) should contain one condition, which is the condition under which the event happens.",
        "color": "#00b5c9",
        "level": "0"
    }, {
        "label": "Negation",
        "short": "n",
        "descr": "A negation is a keyword which indicates, that a condition is negated, i.e., must not be true.",
        "color": "#de1818",
        "level": "0"
    }, {
        "label": "Conjunction",
        "short": "&&",
        "descr": "A conjunction ('and') of two or more events means that all events must be true for the dependent event to be true.",
        "color": "#e8ff7f",
        "level": "0"
    }, {
        "label": "Disjunction",
        "short": "||",
        "descr": "A disjunction ('or') of two or more events means that at least one event must be true for the dependent event to be true.",
        "color": "#fffb7f",
        "level": "0"
    }
]

export default labeltypes