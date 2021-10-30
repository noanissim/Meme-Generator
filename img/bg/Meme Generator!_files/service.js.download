'use strict'
var gIsMouseDown = false

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
        keywords: ['happy', 'funny'],
    },
    {
        id: 2,
        url: 'img/meme-imgs (square)/2.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 3,
        url: 'img/meme-imgs (square)/3.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 4,
        url: 'img/meme-imgs (square)/4.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 5,
        url: 'img/meme-imgs (square)/5.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 6,
        url: 'img/meme-imgs (square)/6.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 7,
        url: 'img/meme-imgs (square)/7.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 8,
        url: 'img/meme-imgs (square)/8.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 9,
        url: 'img/meme-imgs (square)/9.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 10,
        url: 'img/meme-imgs (square)/10.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 11,
        url: 'img/meme-imgs (square)/11.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 12,
        url: 'img/meme-imgs (square)/12.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 13,
        url: 'img/meme-imgs (square)/13.jpg',
        keywords: ['happy', 'funny']
    },
    {
        id: 14,
        url: 'img/meme-imgs (square)/14.jpg',
        keywords: ['happy', 'sad']
    },
    {
        id: 15,
        url: 'img/meme-imgs (square)/15.jpg',
        keywords: ['happy', 'sad']
    },
    {
        id: 16,
        url: 'img/meme-imgs (square)/16.jpg',
        keywords: ['happy', 'sad']
    },
    {
        id: 17,
        url: 'img/meme-imgs (square)/17.jpg',
        keywords: ['happy', 'sad']
    },
    {
        id: 18,
        url: 'img/meme-imgs (square)/18.jpg',
        keywords: ['happy', 'sad']
    },
]


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    src: '',
    width: 0,
    height: 0,

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
    ]
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