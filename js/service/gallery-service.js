'use strict'

var gFilters = ['all', 'happy', 'sad', 'funny', 'cute', 'animal', 'akward']
var gFiltersPopularity = [{
        word: 'all',
        count: 1,
        size: 1.5

    },
    {
        word: 'happy',
        count: 3,
        size: 1.0

    },

    {
        word: 'sad',
        count: 0,
        size: 1.5

    },
    {
        word: 'funny',
        count: 1,
        size: 2.0

    },
    {
        word: 'cute',
        count: 1,
        size: 1.5

    },
    {
        word: 'animal',
        count: 2,
        size: 2.5

    },
    {
        word: 'akward',
        count: 0,
        size: 0.8
    },
]
var gCurrFilter = 'all'


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

function getImgsToRender() {
    // console.log(gImgs);
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
    console.log(gCurrFilter);
    var idx = gFilters.findIndex(word => {
        return word === gCurrFilter
    })
    console.log(idx);
    if (idx === -1) idx = 0
    gFiltersPopularity[idx].count++
    gFiltersPopularity[idx].size += 0.5
    renderFilterWords()

}

function getImg(imgId) {
    return gImgs.find(function (img) {
        return imgId === img.id
    })
}

function setFilter(word) {
    gCurrFilter = word
}