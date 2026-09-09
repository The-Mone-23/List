* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


:root {

    --background: #050607;
    --panel: #090b0d;
    --panel-hover: #0e1114;

    --border: #1c2227;
    --border-light: #30373d;

    --text: #f2f4f5;
    --muted: #777f85;
    --dim: #444b50;

    --red: #ff2538;
    --green: #20e783;
    --yellow: #ffd43b;

    --red-glow: rgba(255, 37, 56, 0.22);
    --green-glow: rgba(32, 231, 131, 0.18);
    --yellow-glow: rgba(255, 212, 59, 0.18);
}


html,
body {
    width: 100%;
    min-height: 100%;
}


body {

    min-height: 100vh;

    background:
        radial-gradient(
            circle at 50% 0%,
            rgba(255, 37, 56, 0.035),
            transparent 35%
        ),
        var(--background);

    color: var(--text);

    font-family:
        "SFMono-Regular",
        "SF Mono",
        "Roboto Mono",
        "Cascadia Code",
        monospace;
}


/* GRID BACKGROUND */

body::before {

    content: "";

    position: fixed;

    inset: 0;

    pointer-events: none;

    background-image:
        linear-gradient(
            rgba(255,255,255,0.012) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,0.012) 1px,
            transparent 1px
        );

    background-size: 50px 50px;
}


/* APP */

.app {

    min-height: 100vh;

    position: relative;

}


/* =========================================
   FLOATING LIST MANAGER
========================================= */

.board-menu-toggle {

    position: fixed;

    top: 18px;
    right: 20px;

    z-index: 100;

    height: 34px;

    padding: 0 14px;

    border: 1px solid var(--border);

    background: rgba(7, 9, 10, 0.95);

    color: var(--muted);

    font-family: inherit;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 2px;

    cursor: pointer;

    transition: 150ms ease;
}


.board-menu-toggle:hover {

    color: white;

    border-color: var(--red);

}


.board-menu {

    position: fixed;

    top: 60px;
    right: 20px;

    width: 250px;

    z-index: 99;

    padding: 10px;

    background: rgba(8, 10, 12, 0.98);

    border: 1px solid var(--border);

    box-shadow:
        0 20px 60px rgba(0,0,0,0.55);

    opacity: 0;

    pointer-events: none;

    transform: translateY(-5px);

    transition: 150ms ease;
}


.board-menu.open {

    opacity: 1;

    pointer-events: auto;

    transform: translateY(0);
}


.board-menu select {

    width: 100%;

    height: 38px;

    background: #0c0f11;

    color: white;

    border: 1px solid var(--border);

    outline: none;

    padding: 0 10px;

    font-family: inherit;

    font-size: 10px;
}


.board-actions {

    display: grid;

    grid-template-columns:
        1fr
        1fr
        1fr;

    gap: 5px;

    margin-top: 7px;
}


.board-actions button {

    height: 34px;

    background: transparent;

    border: 1px solid var(--border);

    color: var(--muted);

    font-family: inherit;

    font-size: 8px;
    font-weight: 700;

    cursor: pointer;

    transition: 150ms ease;
}


.board-actions button:hover {

    color: white;

    border-color: var(--border-light);
}


.board-actions .danger {

    color: var(--red);
}


.board-actions .danger:hover {

    border-color: var(--red);

    background: rgba(255,37,56,0.06);
}


/* =========================================
   WORKSPACE
========================================= */

.workspace {

    min-height: 100vh;

    display: grid;

    grid-template-rows:
        minmax(500px, 1fr)
        auto;
}


/* =========================================
   TOP LISTS
========================================= */

.top-lists {

    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        1px
        minmax(0, 1fr);

}


/* RED CENTER LINE */

.vertical-divider {

    width: 1px;

    background: var(--red);

    box-shadow:
        0 0 10px var(--red-glow),
        0 0 28px rgba(255,37,56,0.10);
}


/* =========================================
   PANEL
========================================= */

.panel {

    min-width: 0;

    padding:
        65px
        clamp(30px, 5vw, 90px)
        50px;
}


/* TITLE */

.title-input {

    width: 100%;

    border: none;

    outline: none;

    background: transparent;

    color: var(--text);

    font-family: inherit;

    font-size:
        clamp(30px, 4vw, 55px);

    font-weight: 700;

    letter-spacing: -2px;

    text-transform: uppercase;

    margin-bottom: 32px;
}


/* =========================================
   ADD ENTRY
========================================= */

.add-entry,
.shared-add {

    width: 100%;

    height: 48px;

    display: flex;

    border: 1px solid var(--border);

    background: var(--panel);

    margin-bottom: 18px;

    transition: 150ms ease;
}


.add-entry:focus-within,
.shared-add:focus-within {

    border-color: var(--red);
}


.add-entry input,
.shared-add input {

    flex: 1;

    min-width: 0;

    padding: 0 15px;

    border: none;

    outline: none;

    background: transparent;

    color: white;

    font-family: inherit;

    font-size: 11px;
}


.add-entry input::placeholder,
.shared-add input::placeholder {

    color: var(--dim);
}


.add-entry button,
.shared-add button {

    width: 48px;

    border: none;

    border-left: 1px solid var(--border);

    background: transparent;

    color: var(--red);

    font-family: inherit;

    font-size: 20px;

    cursor: pointer;

    transition: 150ms ease;
}


.add-entry button:hover,
.shared-add button:hover {

    background: var(--red);

    color: white;
}


/* =========================================
   ENTRY LIST
========================================= */

.entry-list {

    display: flex;

    flex-direction: column;

    gap: 6px;

}


/* ENTRY */

.entry-item {

    min-height: 55px;

    display: grid;

    grid-template-columns:
        40px
        9px
        minmax(0, 1fr)
        auto;

    align-items: center;

    gap: 10px;

    padding-right: 14px;

    background: var(--panel);

    border: 1px solid var(--border);

    cursor: pointer;

    transition: 140ms ease;

    position: relative;
}


.entry-item:hover {

    background: var(--panel-hover);

    border-color: var(--border-light);

    transform: translateX(2px);
}


/* NUMBER */

.entry-index {

    font-size: 8px;

    color: var(--dim);

    text-align: center;

    user-select: none;
}


/* STATUS DOT */

.entry-status {

    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: #454c51;
}


/* NAME */

.entry-name {

    min-width: 0;

    overflow: hidden;

    white-space: nowrap;

    text-overflow: ellipsis;

    color: var(--muted);

    font-size: 12px;

    transition: 140ms ease;
}


/* ACTIONS */

.entry-actions {

    display: flex;

    gap: 3px;

    opacity: 0;

    transition: 140ms ease;
}


.entry-item:hover .entry-actions {

    opacity: 1;
}


.entry-actions button {

    width: 27px;
    height: 27px;

    border: none;

    background: transparent;

    color: var(--dim);

    font-family: inherit;

    cursor: pointer;

    font-size: 12px;
}


.entry-actions button:hover {

    color: white;
}


.entry-actions .delete-entry:hover {

    color: var(--red);
}


/* =========================================
   GREEN
========================================= */

.entry-item.green {

    border-color:
        rgba(32, 231, 131, 0.28);

    background:
        linear-gradient(
            90deg,
            rgba(32,231,131,0.07),
            var(--panel) 30%
        );
}


.entry-item.green .entry-name {

    color: var(--green);
}


.entry-item.green .entry-status {

    background: var(--green);

    box-shadow:
        0 0 9px var(--green-glow);
}


/* =========================================
   YELLOW
========================================= */

.entry-item.yellow {

    border-color:
        rgba(255,212,59,0.3);

    background:
        linear-gradient(
            90deg,
            rgba(255,212,59,0.07),
            var(--panel) 30%
        );
}


.entry-item.yellow .entry-name {

    color: var(--yellow);
}


.entry-item.yellow .entry-status {

    background: var(--yellow);

    box-shadow:
        0 0 9px var(--yellow-glow);
}


/* =========================================
   RED
========================================= */

.entry-item.red {

    border-color:
        rgba(255,37,56,0.32);

    background:
        linear-gradient(
            90deg,
            rgba(255,37,56,0.07),
            var(--panel) 30%
        );
}


.entry-item.red .entry-name {

    color: var(--red);
}


.entry-item.red .entry-status {

    background: var(--red);

    box-shadow:
        0 0 9px var(--red-glow);
}


/* =========================================
   SHARED SECTION
========================================= */

.shared-section {

    min-height: 260px;

    padding:
        35px
        clamp(30px, 8vw, 130px)
        50px;

    border-top: 1px solid var(--red);

    box-shadow:
        inset 0 8px 25px
        rgba(255,37,56,0.025);

}


.shared-header {

    display: flex;

    justify-content: space-between;

    align-items: flex-end;

    margin-bottom: 20px;
}


.shared-header h2 {

    font-size: 19px;

    letter-spacing: 5px;

    font-weight: 700;
}


.shared-header span {

    font-size: 8px;

    color: var(--dim);

    letter-spacing: 2px;
}


.shared-add {

    max-width: 600px;
}


/* SHARED LIST */

.shared-list {

    display: grid;

    grid-template-columns:
        repeat(
            auto-fill,
            minmax(230px, 1fr)
        );

    gap: 6px;
}


.shared-list .entry-item {

    width: 100%;
}


/* EMPTY */

.empty-state {

    width: 100%;

    padding: 30px;

    border: 1px dashed var(--border);

    text-align: center;

    color: var(--dim);

    font-size: 9px;

    letter-spacing: 2px;

    grid-column: 1 / -1;
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 750px) {

    .top-lists {

        grid-template-columns: 1fr;

        grid-template-rows:
            auto
            1px
            auto;
    }


    .vertical-divider {

        width: 100%;

        height: 1px;
    }


    .panel {

        padding:
            65px
            20px
            35px;
    }


    .shared-section {

        padding:
            30px
            20px
            40px;
    }


    .shared-header {

        align-items: flex-start;

        flex-direction: column;

        gap: 8px;
    }


    .board-menu-toggle {

        top: 12px;
        right: 12px;
    }


    .board-menu {

        right: 12px;
    }

}
