'use strict'

var gElCanvas
var gCtx
var gStartPos
var gColorFill = '#ffffff'
var gColorStroke = '#000000'
var elContainer
var gRects = []
var posTopRect
var posBottomRect
var posMiddleRect
var gCurrImg
var gIsDownload = false
var gCurrAddedLine
var gImgsStorage


const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function initEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    resizeCanvas()
    renderCanvas()
}


//***************************RENDER************************************ */
function renderCanvas() {
    gCtx.save()
    drawImgOnCanvas(gMeme.src, gMeme.width, gMeme.height)
    if (!gIsDownload) {
        renderRectTop()
        renderRectBottom()
        if (gMeme.lines.length > 2) {
            for (var i = 2; i < gMeme.lines.length; i++) {
                gCurrAddedLine = i
                renderRectMiddle()
                renderTextMiddle()
            }
        }

    }
    renderTextTop()
    renderTextBottom()
    if (gMeme.lines.length > 2) {
        for (var i = 2; i < gMeme.lines.length; i++) {
            gCurrAddedLine = i
            renderTextMiddle()
        }
    }
    renderStickers()
    gCtx.restore()
}

function renderStickers() {
    gMeme.stickers.forEach(function (sticker) {
        var img = new Image()
        img.src = sticker.src
        img.onload = gCtx.drawImage(img, sticker.posX, sticker.posY, 100, 100)
    })
}

function onStickerClick(stickerImg) {
    addSticker(stickerImg)
    renderStickers()
}

function toggleRects(btn) {
    if (btn.innerText === 'REMOVE RECTS') {
        gIsDownload = true
        btn.innerText = 'ADD RECTS'
        renderCanvas()
        return
    } else {
        gIsDownload = false
        btn.innerText = 'REMOVE RECTS'
        renderCanvas()
        return
    }
}

function renderGallery() {
    var strHtml = ''
    var images = getImgsToRender()
    // console.log(images);
    strHtml += images.map(function (img) {
        return `<img src="${img.url}" id="${img.id}" class="image-gallery" onclick="onSelectImage(this)">`
    }).join('')
    document.querySelector('.images-grid').innerHTML = strHtml;
    renderFilterWords()
    onOpenGallery()
}

function renderFilterWords() {
    var strHtml = ''
    strHtml += gFiltersPopularity.map(function (wordObj) {
        return `<li class="word-item" onclick="onSetWord(this)" style="font-size:${wordObj.size}rem;">${wordObj.word}</li>`
    }).join('')
    document.querySelector('.words-filter').innerHTML = strHtml;
}

function openModal() {
    document.querySelector('.modal-about-content').hidden = false;
}

function closeModal() {
    document.querySelector('.modal-about-content').hidden = true;
}


//****************************FILTER****************************************** */
function onSetSearch(word) {
    setFilter(word.value)
    setSizeWordFilter()
    renderGallery()
}

function onSetWord(word) {
    setFilter(word.innerText.toLowerCase())
    setSizeWordFilter()
    renderGallery()
}


//**************************TOUCH EVENTS***************************************** */
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


//***the resize caused me a lot of bugs, so I didnt used it, i did manually resize canvas in css by media queries */
function resizeCanvas() {
    // elContainer = document.querySelector('.canvas-container')
    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isRectClicked(pos) && !isStickerClicked(pos)) {
        document.querySelector('.input-text').classList.remove('focus');
        document.querySelector('.input-text').value = ''
        return
    }
    if (isStickerClicked(pos) && !isRectClicked(pos)) {
        setStickerisDrag(true)
        gStartPos = pos
        document.body.style.cursor = 'grabbing'
    }
    setRectisDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    document.querySelector('.input-text').classList.add('focus');

}

function onMove(ev) {
    handleMove(ev)

}

function onUp() {
    handleUp()
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault() //to avoid scrolling in touchscreen
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}


//****************************EDITOR-BUTTONS************************************* */
function onChangeColorStroke(color) {
    changeColorStroke(color)
}

function onChangeColorFill(color) {
    changeColorFill(color)
}

function onSetFont(font) {
    setFont(font)
}

function onChangeAlign(value) {
    changeAlign(value)
}


//***deleting lines caused bugs(the render tries to render something that doesnt exist so setting the deleted items offset was my solution to this bug) */
function onDeleteLine() {
    deleteLine()
}


//*******************************ADDING LINES******************************************* */
function onAddLine() {
    // var newLine = prompt('Enter the new line')
    document.querySelector('.input-text').classList.add('focus');
    var newText = document.querySelector('.input-text').value;
    addNewLine(newText)
    renderCanvas()
}

function drawStickerOnCanvas(sticker) {
    addStickerToCanvas(sticker)
}


//**************************RENDER-TEXT AND RECT********************************************* */
function renderTextTop() {
    var posTop = getTextTopPosition()
    drawText(posTop.x, posTop.y, 0)
}

function renderTextBottom() {
    var posBottom = getTextBottomPosition()
    drawText(posBottom.x, posBottom.y, 1)
}

function renderTextMiddle() {
    var posMiddle = getTextMiddlePosition()
    drawText(posMiddle.x, posMiddle.y, gCurrAddedLine)
}

function renderRectTop() {
    posTopRect = getRectTopPosition()
    drawRect(posTopRect.x, posTopRect.y, 0)
}

function renderRectMiddle() {
    posMiddleRect = getRectMiddlePosition()
    drawRect(posMiddleRect.x, posMiddleRect.y, gCurrAddedLine)
}

function renderRectBottom() {
    posBottomRect = getRectBottomPosition()
    drawRect(posBottomRect.x, posBottomRect.y, 1)
}

function drawText(x, y, idx) {
    var text = gMeme.lines[idx].txt
    gCtx.beginPath();
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = gColorStroke;
    gCtx.fillStyle = gColorFill;
    gCtx.font = gMeme.lines[idx].size + 'px ' + gMeme.lines[idx].font;
    gCtx.textAlign = gMeme.lines[idx].align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function drawRect(x, y, idx) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    // gCtx.rect(x, y - 10, x + 200 + gMeme.lines[idx].txt.length, 60);
    gCtx.rect(x, y - 10, 300, 60);
    gCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
    gCtx.fillRect(x, y - 10, 300, 60);
    gCtx.strokeStyle = (gMeme.lines[idx].isMarked) ? 'red' : 'black';
    gCtx.stroke();
}


//*************************MORE FUNCTIONS CANVAS RELATED******************************************** */
function onChangeLineIdx() {
    document.querySelector('.input-text').value = ''
    changeLineIdx()
}

function onChangeLineText(newText) {
    changeLineText(newText)
    renderCanvas()
}

function MarkCurrRect(lineIdx) {
    doMarlCurrRect(lineIdx)
    renderCanvas()
}

function isRectClicked(clickedPos) {
    return checkIsRectClicked(clickedPos)
}

function isStickerClicked(clickedPos) {
    return checkIsStickerClicked(clickedPos)
}


//*********************************DRAW IMAGE ON CANVAS*******************************
function drawImgOnCanvas(src, width, height) {
    var img = new Image()
    img.src = src
    var heightCanvas = (height * gElCanvas.width) / width
    img.onload = () => {

        gCtx.drawImage(img, 0, 0, gElCanvas.width, heightCanvas) //img,x,y,xend,yend
        renderCanvas()
        document.querySelector('.image-gallery-container').hidden = true
        // document.querySelector('.image-gallery-container').style.display = 'none'
    }
}

function onSelectImage(image) {
    selectImage(image)
    onOpenEditor()
}


//*****************************Arrows-buttons********************************************** */
function onChangeFontSize(value) {
    changeFontSize(value)
}

function onChangePosition(value, valueX = 0) {
    changePosition(value, valueX = 0)
    renderCanvas()

}


//******************************IMAGE DOWNLOAD******************************

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}


//*************************UPLOAD***************************************** */
//IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()
    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result //event.target.result=the url

        var newImg = {
            id: gImgs.length + 1,
            url: img.src,
            keywords: ['funny', 'happy']
        }
        gImgs.push(newImg)
        gMeme.src = img.src
        console.log(gImgs);
    }
    reader.readAsDataURL(ev.target.files[0]) //translate the url
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onSaveMeme() {
    var gCanvas = document.querySelector('canvas');
    saveMeme(gCanvas)
}

function loadFromStorageImg() {
    doLoadFromStorage()
}

function onRenderSavedMemes() {
    var strHtml = ''
    for (var i = 0; i < gImgsStorage.length; i++) {
        var dataURL = localStorage.getItem(gImgsStorage[i]);
        var img = new Image;
        img.src = dataURL;
        strHtml += `<img src="${dataURL}" class="save-img">`;
    }
    document.querySelector('.saved-images').innerHTML = strHtml
}

function onOpenMemesTab() {
    loadFromStorageImg()
    onRenderSavedMemes()
    document.querySelector('.save-img-container').classList.remove('hidden')
    document.querySelector('.image-gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.add('hidden')
}

function onOpenGallery() {
    document.querySelector('.save-img-container').classList.add('hidden')
    document.querySelector('.image-gallery-container').classList.remove('hidden')
    document.querySelector('.meme-editor-container').classList.add('hidden')
}

function onOpenEditor() {
    document.querySelector('.save-img-container').classList.add('hidden')
    document.querySelector('.image-gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor-container').classList.remove('hidden')
}

function shareOnFacebook() {
    uploadImg()
}

function uploadImg() { //shows the url link and button share
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg"); //url translated
    // A function to be called if request succeeds: creates the link in douploadimage
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        document.querySelector('.share-facebook').innerHTML = `
        <a class="share" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        SHARE ON FACEBOOK
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
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