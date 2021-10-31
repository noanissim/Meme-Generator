'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    selectedStickerIdx: 0,
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

function handleMove(ev) {
    if (gMeme.stickers.length) {
        if (gMeme.stickers[gMeme.selectedStickerIdx].isDrag) {
            const pos = getEvPos(ev)
            const dx = pos.x - gStartPos.x
            const dy = pos.y - gStartPos.y
            gMeme.stickers[gMeme.selectedStickerIdx].posX += dx
            gMeme.stickers[gMeme.selectedStickerIdx].posY += dy
            gStartPos = pos
            moveSticker(dx, dy)
            renderCanvas()
        }
    }

    if (gMeme.lines[gMeme.selectedLineIdx].isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gMeme.lines[gMeme.selectedLineIdx].posX += dx
        gMeme.lines[gMeme.selectedLineIdx].posY += dy
        gStartPos = pos
        moveRect(dx, dy)
        renderCanvas()
    }
}

function handleUp() {
    if (gMeme.lines[gMeme.selectedLineIdx].isDrag) setRectisDrag(false)
    if (gMeme.stickers.length && gMeme.stickers[gMeme.selectedStickerIdx].isDrag) setStickerisDrag(false)
}

function changeColorStroke(color) {
    if (color !== '#000000') gColorStroke = color
}

function changeColorFill(color) {
    if (color !== '#ffffff') gColorFill = color

}

function setFont(font) {
    (gMeme.lines).forEach(function (obj) {
        obj.font = font
    })
}

function changeAlign(value) {
    gMeme.lines[gMeme.selectedLineIdx].align = value
}

function deleteLine() {
    //splice to the lines array and render
    // (gMeme.lines).splice(gMeme.selectedLineIdx, 1)
    gMeme.lines[gMeme.selectedLineIdx].posX = 600
    gMeme.lines[gMeme.selectedLineIdx].posY = 600
}

function addNewLine(newText) {
    var elNewLine = {
        txt: newText,
        size: 50,
        align: 'center',
        font: 'impact',
        isMarked: true,
        posX: 100,
        posY: 180,
        isClicked: false,
        isDrag: false
    }
    gMeme.lines.push(elNewLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    // onChangeLineText(newText)
}

function addStickerToCanvas(sticker) {
    var elNewLine = {
        txt: sticker,
        size: gCtx.measureText(sticker).width * 4,
        align: 'center',
        font: 'impact',
        isMarked: true,
        posX: 80,
        posY: 150,
        isClicked: false,
        isDrag: false
    }
    console.log(elNewLine);
    gMeme.lines.push(elNewLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getTextTopPosition() {
    return {
        x: gMeme.lines[0].posX + 150,
        y: gMeme.lines[0].posY + 40
    }
}

function getTextBottomPosition() {
    return {
        x: gMeme.lines[1].posX + 150,
        y: gMeme.lines[1].posY + 40
    }
}

function getTextMiddlePosition() {
    return {
        x: gMeme.lines[gCurrAddedLine].posX + 150 + gMeme.lines.length,
        y: gMeme.lines[gCurrAddedLine].posY + 40 + gMeme.lines.length
    }
}

function getRectTopPosition() {
    return {
        x: gMeme.lines[0].posX,
        y: gMeme.lines[0].posY
    }
}

function getRectMiddlePosition() {
    return {
        x: gMeme.lines[gCurrAddedLine].posX + gMeme.lines.length,
        y: gMeme.lines[gCurrAddedLine].posY + gMeme.lines.length
    }
}

function getRectBottomPosition() {
    return {
        x: gMeme.lines[1].posX,
        y: gMeme.lines[1].posY
    }
}

function setRectisDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function setStickerisDrag(isDrag) {
    gMeme.stickers[gMeme.selectedStickerIdx].isDrag = isDrag
}

function moveRect(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].posX += dx
    gMeme.lines[gMeme.selectedLineIdx].posY += dy
}

function moveSticker(dx, dy) {
    gMeme.stickers[gMeme.selectedStickerIdx].posX += dx
    gMeme.stickers[gMeme.selectedStickerIdx].posY += dy
}

function addSticker(stickerImg) {
    var sticker = {
        id: gMeme.stickers.length + 1,
        src: stickerImg.src,
        posX: 100,
        posY: 100,
        isClicked: false,
        isDrag: false
    }

    gMeme.stickers.push(sticker)
    gMeme.selectedStickerIdx = gMeme.stickers.length - 1
}

function changeLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    MarkCurrRect(gMeme.selectedLineIdx)
}

function changeLineText(newText) {
    var idx = gMeme.selectedLineIdx
    gMeme.lines[idx].txt = newText
    // drawImgOnCanvas(gMeme.src, gMeme.width, gMeme.height)

}

function doMarlCurrRect(lineIdx) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].isMarked = (lineIdx === i)
    }
}

function checkIsRectClicked(clickedPos) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        var posX = gMeme.lines[i].posX
        var posY = gMeme.lines[i].posY
        const ratio = (gElCanvas.offsetWidth >= 500) ? 1 : 0.6
        if (clickedPos.x >= posX * ratio && clickedPos.x <= posX * ratio + 300 * ratio && clickedPos.y >= posY * ratio && clickedPos.y <= posY * ratio + 50 * ratio) {
            gMeme.selectedLineIdx = i
            gMeme.lines[i].isClicked = true
            gMeme.lines[i].isMarked = true
            return true
            // break
        } else {
            gMeme.lines[i].isClicked = false
            gMeme.lines[i].isMarked = false
        }

    }
}

function checkIsStickerClicked(clickedPos) {
    for (var i = 0; i < gMeme.stickers.length; i++) {
        var posX = gMeme.stickers[i].posX
        var posY = gMeme.stickers[i].posY
        const ratio = (gElCanvas.offsetWidth >= 500) ? 1 : 0.6
        if (clickedPos.x >= posX * ratio && clickedPos.x <= posX * ratio + 100 && clickedPos.y >= posY * ratio && clickedPos.y <= posY * ratio + 100) {
            gMeme.stickers[i].isClicked = true
            gMeme.stickers[i].isDrag = true
            gMeme.selectedStickerIdx = i
            return true
        } else {
            gMeme.stickers[i].isClicked = false
            gMeme.stickers[i].isDrag = false
        }

    }
}

function selectImage(image) {
    gCurrImg = image
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    var src = image.src
    var width = image.offsetWidth
    var height = image.offsetHeight
    gMeme.selectedImgId = image.id

    gMeme.src = src
    gMeme.width = width
    gMeme.height = height
    drawImgOnCanvas(src, width, height)
}

function changeFontSize(value) {
    gMeme.lines[gMeme.selectedLineIdx].size += value
}

function changePosition(value, valueX = 0) {
    gMeme.lines[gMeme.selectedLineIdx].posY += value
    gMeme.lines[gMeme.selectedLineIdx].posX += valueX

}