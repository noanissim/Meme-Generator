'use strict'
var gIsMouseDown = false
var gFilters = ['all', 'happy', 'sad', 'funny', 'cute', 'animal', 'akward']
var gFiltersPopularity = [{
        word: 'all',
        count: 1,
        size: 1.5

    },
    {
        word: 'happy',
        count: 3,
        size: 1.5

    },

    {
        word: 'sad',
        count: 0,
        size: 1.5

    },
    {
        word: 'funny',
        count: 1,
        size: 1.5

    },
    {
        word: 'cute',
        count: 1,
        size: 1.5

    },
    {
        word: 'animal',
        count: 2,
        size: 1.5

    },
    {
        word: 'akward',
        count: 0,
        size: 1.5
    },
]
var gCurrFilter = 'all'

function setMouseDrag(isDown) {
    gIsMouseDown = isDown
}

var gKeyWords = {
    happy: 10,
    sad: 3,
    funny: 5
}

var gImgs = [{
        id: 1,
        url: 'img/meme-imgs (square)/1.jpg',
        keywords: ['akward', 'funny'],
    },
    {
        id: 2,
        url: 'img/meme-imgs (square)/2.jpg',
        keywords: ['happy', 'cute', 'animal']
    },
    {
        id: 3,
        url: 'img/meme-imgs (square)/3.jpg',
        keywords: ['happy', 'cute', 'animal', 'funny']
    },
    {
        id: 4,
        url: 'img/meme-imgs (square)/4.jpg',
        keywords: ['happy', 'cute', 'animal']
    },
    {
        id: 5,
        url: 'img/meme-imgs (square)/5.jpg',
        keywords: ['happy', 'cute', 'funny']
    },
    {
        id: 6,
        url: 'img/meme-imgs (square)/6.jpg',
        keywords: ['sad', 'funny']
    },
    {
        id: 7,
        url: 'img/meme-imgs (square)/7.jpg',
        keywords: ['happy', 'funny', 'cute']
    },
    {
        id: 8,
        url: 'img/meme-imgs (square)/8.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 9,
        url: 'img/meme-imgs (square)/9.jpg',
        keywords: ['happy', 'cute', 'funny']
    },
    {
        id: 10,
        url: 'img/meme-imgs (square)/10.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 11,
        url: 'img/meme-imgs (square)/11.jpg',
        keywords: ['akward', 'funny']
    },
    {
        id: 12,
        url: 'img/meme-imgs (square)/12.jpg',
        keywords: ['sad', 'funny']
    },
    {
        id: 13,
        url: 'img/meme-imgs (square)/13.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 14,
        url: 'img/meme-imgs (square)/14.jpg',
        keywords: ['akward', 'sad']
    },
    {
        id: 15,
        url: 'img/meme-imgs (square)/15.jpg',
        keywords: ['funny', 'sad']
    },
    {
        id: 16,
        url: 'img/meme-imgs (square)/16.jpg',
        keywords: ['happy', 'funny', 'akward']
    },
    {
        id: 17,
        url: 'img/meme-imgs (square)/17.jpg',
        keywords: ['funny', 'sad']
    },
    {
        id: 18,
        url: 'img/meme-imgs (square)/18.jpg',
        keywords: ['happy', 'cute']
    },
]


function sendImgsToRender() {
    if (gCurrFilter === 'all' || gCurrFilter === '') return gImgs
    var renders = []
    for (var i = 0; i < gImgs.length; i++) {
        var keys = gImgs[i].keywords
        var found = keys.find(function (key) {
            return key === gCurrFilter
        })
        if (found) renders.push(gImgs[i])
    }
    return renders
}

function setSizeWordFilter() {
    var idx = gFilters.findIndex(word => {
        return word === gCurrFilter
    })
    gFiltersPopularity[idx].count++
    gFiltersPopularity[idx].size += 0.5
    renderFilterWords()

}

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    src: '',
    width: 0,
    height: 0,
    stickers: [],
    lines: [{
            txt: 'Hello',
            size: 50,
            align: 'center',
            font: 'impact',
            isMarked: false,
            posX: 100,
            posY: 25,
            isClicked: false,
            isDrag: false
        },
        {
            txt: 'World!',
            size: 50,
            align: 'center',
            font: 'impact',
            isMarked: false,
            posX: 100,
            posY: 400,
            isClicked: false,
            isDrag: false
        }
    ],

}

function getImg(imgId) {
    return gImgs.find(function (img) {
        return imgId === img.id
    })
}



function setFont(font) {
    (gMeme.lines).forEach(function (obj) {
        obj.font = font
    })
}


function toggleMenu() {
    if (document.body.classList.contains('menu-open')) {
        document.querySelector('.btn-menu').innerText = '☰'
        document.body.classList.remove('menu-open')
    } else {
        document.body.classList.add('menu-open')
        document.querySelector('.btn-menu').innerText = 'X'
    }
}



function setRectisDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}


function moveRect(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].posX += dx
    gMeme.lines[gMeme.selectedLineIdx].posY += dy
}


function setFilter(word) {
    gCurrFilter = word
}



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


// let emoji = [];

// let emo,
//     size = 80,
//     rad = 20;

// let emojis = [
//     0x1F600, 0x1F601, 0x1F603, 0x1F603, 0x1F604, 0x1F605, 0x1F606,
//     0x1F607, 0x1F609, 0x1F60A, 0x1F642, 0x1F643, 0x1F355, 0x1F354,
// ];

// for (let i = 0; i < 2; i++) {
//     emoji.push({
//         x: size,
//         y: size,
//         src: getEmoji()
//     });
//     console.log(emoji);
//     drawImgOnCanvas(emoji.src, emoji.x, emoji.y)

// }


// window.onload = function () {
//     canvas1 = document.getElementById('canvas-01');
//     ctx1 = canvas1.getContext('2d');
//     loadEmoji(canvas1, ctx1, 0);



// }


// function loadEmoji(canvas, ctx, index) {
//     // Use the intrinsic size of image in CSS pixels for the canvas element
//     canvas.width = canvas.offsetWidth
//     canvas.height = canvas.offsetHeight

//     ctx.font = '40px Arial';
//     ctx.textBaseline = 'middle';
//     ctx.textAlign = 'center';

//     emo = emoji[index];
//     emo.x = canvas.offsetWidth / 2
//     emo.y = canvas.offsetHeight / 2

//     ctx.fillText(emo.src, emo.x, emo.y);
// }

// function getEmoji() {
//     let len = emojis.length;

//     let emos = Math.floor(Math.random() * len);
//     return String.fromCodePoint(emojis[emos]);
// }