/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY = "friendListBoards_v1";

let boards = [];
let activeBoardId = null;


/* =========================================
   DOM REFERENCES
========================================= */

const boardSelect =
    document.getElementById("boardSelect");

const newBoardButton =
    document.getElementById("newBoardButton");

const renameBoardButton =
    document.getElementById("renameBoardButton");

const deleteBoardButton =
    document.getElementById("deleteBoardButton");


const leftPersonName =
    document.getElementById("leftPersonName");

const rightPersonName =
    document.getElementById("rightPersonName");


const leftFriendInput =
    document.getElementById("leftFriendInput");

const rightFriendInput =
    document.getElementById("rightFriendInput");


const leftAddButton =
    document.getElementById("leftAddButton");

const rightAddButton =
    document.getElementById("rightAddButton");


const leftFriendList =
    document.getElementById("leftFriendList");

const rightFriendList =
    document.getElementById("rightFriendList");


const leftFriendCount =
    document.getElementById("leftFriendCount");

const rightFriendCount =
    document.getElementById("rightFriendCount");


/* =========================================
   ID GENERATOR
========================================= */

function generateId() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 9)
    );
}


/* =========================================
   DEFAULT BOARD
========================================= */

function createDefaultBoard() {

    return {
        id: generateId(),

        name: "MAIN LIST",

        left: {
            name: "PERSON A",

            friends: [
                {
                    id: generateId(),
                    name: "Friend #1",
                    status: "neutral"
                },

                {
                    id: generateId(),
                    name: "Friend #2",
                    status: "neutral"
                },

                {
                    id: generateId(),
                    name: "Friend #3",
                    status: "neutral"
                }
            ]
        },

        right: {
            name: "PERSON B",

            friends: [
                {
                    id: generateId(),
                    name: "Friend A",
                    status: "neutral"
                },

                {
                    id: generateId(),
                    name: "Friend C",
                    status: "neutral"
                },

                {
                    id: generateId(),
                    name: "Friend D",
                    status: "neutral"
                }
            ]
        }
    };
}


/* =========================================
   LOAD DATA
========================================= */

function loadData() {

    try {

        const stored =
            localStorage.getItem(STORAGE_KEY);

        if (stored) {

            const parsed =
                JSON.parse(stored);

            if (
                parsed &&
                Array.isArray(parsed.boards) &&
                parsed.boards.length > 0
            ) {

                boards = parsed.boards;

                activeBoardId =
                    parsed.activeBoardId;

            }

        }

    } catch (error) {

        console.error(
            "Could not load saved lists:",
            error
        );

    }


    if (boards.length === 0) {

        const board =
            createDefaultBoard();

        boards = [board];

        activeBoardId =
            board.id;

        saveData();

    }


    if (
        !boards.some(
            board =>
                board.id === activeBoardId
        )
    ) {

        activeBoardId =
            boards[0].id;

    }

}


/* =========================================
   SAVE DATA
========================================= */

function saveData() {

    const data = {
        boards,
        activeBoardId
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* =========================================
   ACTIVE BOARD
========================================= */

function getActiveBoard() {

    return boards.find(
        board =>
            board.id === activeBoardId
    );

}


/* =========================================
   RENDER EVERYTHING
========================================= */

function render() {

    renderBoardSelector();

    const board =
        getActiveBoard();

    if (!board) {
        return;
    }


    leftPersonName.value =
        board.left.name;

    rightPersonName.value =
        board.right.name;


    renderFriendList(
        "left",
        board.left.friends,
        leftFriendList
    );

    renderFriendList(
        "right",
        board.right.friends,
        rightFriendList
    );


    leftFriendCount.textContent =
        board.left.friends.length;

    rightFriendCount.textContent =
        board.right.friends.length;

}


/* =========================================
   BOARD SELECTOR
========================================= */

function renderBoardSelector() {

    boardSelect.innerHTML = "";

    boards.forEach(board => {

        const option =
            document.createElement("option");

        option.value =
            board.id;

        option.textContent =
            board.name;

        if (
            board.id ===
            activeBoardId
        ) {

            option.selected =
                true;

        }

        boardSelect.appendChild(
            option
        );

    });

}


/* =========================================
   FRIEND LIST
========================================= */

function renderFriendList(
    side,
    friends,
    container
) {

    container.innerHTML = "";


    if (friends.length === 0) {

        const empty =
            document.createElement("div");

        empty.className =
            "empty-list";

        empty.textContent =
            "NO CONNECTIONS FOUND";

        container.appendChild(
            empty
        );

        return;
    }


    friends.forEach(
        (friend, index) => {

            const item =
                document.createElement("div");

            item.className =
                `friend-item ${friend.status}`;

            item.dataset.id =
                friend.id;


            /* NUMBER */

            const number =
                document.createElement("div");

            number.className =
                "friend-index";

            number.textContent =
                String(index + 1)
                    .padStart(2, "0");


            /* NAME */

            const name =
                document.createElement("div");

            name.className =
                "friend-name";

            name.textContent =
                friend.name;


            /* DELETE */

            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "friend-delete";

            deleteButton.type =
                "button";

            deleteButton.textContent =
                "×";

            deleteButton.title =
                "Delete friend";


            deleteButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    deleteFriend(
                        side,
                        friend.id
                    );

                }
            );


            /* STATUS DOT */

            const status =
                document.createElement("div");

            status.className =
                "friend-status";


            item.appendChild(
                number
            );

            item.appendChild(
                name
            );

            item.appendChild(
                deleteButton
            );

            item.appendChild(
                status
            );


            /* CLICK NAME / ROW */

            item.addEventListener(
                "click",
                () => {

                    toggleFriendStatus(
                        side,
                        friend.id
                    );

                }
            );


            /* DOUBLE CLICK TO RENAME */

            item.addEventListener(
                "dblclick",
                event => {

                    event.stopPropagation();

                    renameFriend(
                        side,
                        friend.id
                    );

                }
            );


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================
   STATUS TOGGLE
========================================= */

function toggleFriendStatus(
    side,
    friendId
) {

    const board =
        getActiveBoard();

    if (!board) {
        return;
    }


    const friend =
        board[side].friends.find(
            friend =>
                friend.id === friendId
        );

    if (!friend) {
        return;
    }


    /*
        Cycle:

        neutral
            ↓
        green
            ↓
        red
            ↓
        neutral
    */

    if (
        friend.status === "neutral"
    ) {

        friend.status =
            "green";

    }

    else if (
        friend.status === "green"
    ) {

        friend.status =
            "red";

    }

    else {

        friend.status =
            "neutral";

    }


    saveData();

    render();

}


/* =========================================
   ADD FRIEND
========================================= */

function addFriend(
    side,
    input
) {

    const name =
        input.value.trim();

    if (!name) {
        return;
    }


    const board =
        getActiveBoard();

    if (!board) {
        return;
    }


    board[side].friends.push({
        id: generateId(),
        name,
        status: "neutral"
    });


    input.value = "";

    saveData();

    render();

    input.focus();

}


/* =========================================
   DELETE FRIEND
========================================= */

function deleteFriend(
    side,
    friendId
) {

    const board =
        getActiveBoard();

    if (!board) {
        return;
    }


    board[side].friends =
        board[side].friends.filter(
            friend =>
                friend.id !== friendId
        );


    saveData();

    render();

}


/* =========================================
   RENAME FRIEND
========================================= */

function renameFriend(
    side,
    friendId
) {

    const board =
        getActiveBoard();

    if (!board) {
        return;
    }


    const friend =
        board[side].friends.find(
            friend =>
                friend.id === friendId
        );

    if (!friend) {
        return;
    }


    const newName =
        prompt(
            "Rename friend:",
            friend.name
        );

    if (newName === null) {
        return;
    }


    const cleanName =
        newName.trim();

    if (!cleanName) {
        return;
    }


    friend.name =
        cleanName;

    saveData();

    render();

}


/* =========================================
   CHANGE PERSON NAME
========================================= */

function updatePersonName(
    side,
    value
) {

    const board =
        getActiveBoard();

    if (!board) {
        return;
    }


    board[side].name =
        value;

    saveData();

}


/* =========================================
   NEW BOARD
========================================= */

function createBoard() {

    const name =
        prompt(
            "Name this list:",
            `LIST ${boards.length + 1}`
        );

    if (name === null) {
        return;
    }


    const cleanName =
        name.trim();

    if (!cleanName) {
        return;
    }


    const newBoard = {

        id: generateId(),

        name: cleanName,

        left: {
            name: "PERSON A",
            friends: []
        },

        right: {
            name: "PERSON B",
            friends: []
        }

    };


    boards.push(
        newBoard
    );

    activeBoardId =
        newBoard.id;


    saveData();

    render();

}


/* =========================================
   RENAME BOARD
========================================= */

function renameBoard() {

    const board =
        getActiveBoard();

    if (!board) {
        return;
    }


    const name =
        prompt(
            "Rename this list:",
            board.name
        );

    if (name === null) {
        return;
    }


    const cleanName =
        name.trim();

    if (!cleanName) {
        return;
    }


    board.name =
        cleanName;

    saveData();

    render();

}


/* =========================================
   DELETE BOARD
========================================= */

function deleteBoard() {

    if (boards.length <= 1) {

        alert(
            "You must keep at least one list."
        );

        return;

    }


    const board =
        getActiveBoard();

    if (!board) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${board.name}"?`
        );

    if (!confirmed) {
        return;
    }


    boards =
        boards.filter(
            item =>
                item.id !== board.id
        );


    activeBoardId =
        boards[0].id;


    saveData();

    render();

}


/* =========================================
   EVENTS
========================================= */


/* Add friend buttons */

leftAddButton.addEventListener(
    "click",
    () => {

        addFriend(
            "left",
            leftFriendInput
        );

    }
);


rightAddButton.addEventListener(
    "click",
    () => {

        addFriend(
            "right",
            rightFriendInput
        );

    }
);


/* Enter to add friend */

leftFriendInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addFriend(
                "left",
                leftFriendInput
            );

        }

    }
);


rightFriendInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addFriend(
                "right",
                rightFriendInput
            );

        }

    }
);


/* Person names */

leftPersonName.addEventListener(
    "input",
    () => {

        updatePersonName(
            "left",
            leftPersonName.value
        );

    }
);


rightPersonName.addEventListener(
    "input",
    () => {

        updatePersonName(
            "right",
            rightPersonName.value
        );

    }
);


/* Board selector */

boardSelect.addEventListener(
    "change",
    () => {

        activeBoardId =
            boardSelect.value;

        saveData();

        render();

    }
);


/* Board management */

newBoardButton.addEventListener(
    "click",
    createBoard
);

renameBoardButton.addEventListener(
    "click",
    renameBoard
);

deleteBoardButton.addEventListener(
    "click",
    deleteBoard
);


/* =========================================
   START APPLICATION
========================================= */

loadData();

render();
