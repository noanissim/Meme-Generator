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
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function initEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners() //adds the mouse,touch,resize listeners
    resizeCanvas() //resizes the canvas on init
    renderCanvas() //render the canvas-empty!
}


//***************************RENDER************************************ */
function renderCanvas() {
    gCtx.save()
    // gCtx.fillStyle = "#fff"
    // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.restore()
}

function renderGallery() {
    var strHtml = ''
    strHtml += gImgs.map(function (img) {
        return `<img src="${img.url}" id="${img.id}" class="image-gallery" onclick="convertImage(this)">`
    }).join('')
    document.querySelector('.images-grid').innerHTML = strHtml;
}

function renderEditor() {
    var strHtml = ''
    strHtml += ``
}


//**************************TOUCH EVENTS***************************************** */
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        console.log('resize!');
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('mouseout', onOut) //out off canvas
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
    // elContainer = document.querySelector('.canvas-container')
    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
}

function onDown(ev) {
    const pos = getEvPos(ev)
    createShape(pos)
    renderShape(pos)
    setMouseDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const pos = getEvPos(ev)
    if (gIsMouseDown) {
        gStartPos = pos
        renderShape(pos)
    }
}

function onUp() {
    gIsMouseDown = false
    document.body.style.cursor = 'grab'
}

function onOut() {
    gIsMouseDown = false
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
    if (color !== '#000000') gColorStroke = color
}

function onChangeColorFill(color) {
    if (color !== '#ffffff') gColorFill = color

}




//**************************RENDER-TEXT********************************************* */
function renderTextTop() {
    var posTop = {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 8,
    }

    drawText(posTop.x, posTop.y, 0)
}

function renderTextBottom() {
    var posBottom = {
        x: (gElCanvas.width / 2),
        y: (gElCanvas.height / 8) * 7,
    }
    drawText(posBottom.x, posBottom.y, 1)

}

function drawText(x, y, idx) {
    var text = gMeme.lines[idx].txt
    gCtx.beginPath();
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = gColorStroke;
    gCtx.fillStyle = gColorFill;
    gCtx.font = gMeme.lines[idx].size + 'px Impact';
    gCtx.textAlign = gMeme.lines[idx].align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function drawRect(x, y, idx) {
    gCtx.beginPath();
    gCtx.rect(x, y - 10, x + 200 + gMeme.lines[idx].txt.length, 70);
    gCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
    gCtx.fillRect(x, y - 10, x + 200 + gMeme.lines[idx].txt.length, 70);
    gCtx.strokeStyle = (gMeme.lines[idx].isMarked) ? 'red' : 'black';
    gCtx.stroke();
}


function renderRectTop() {
    posTopRect = {
        x: gElCanvas.width * 0.2,
        y: gElCanvas.height * 0.05
    }

    drawRect(posTopRect.x, posTopRect.y, 0)
    gRects.push({
        posX: posTopRect.x,
        posY: posTopRect.y,
        idx: 0
    })
    gMeme.lines[0].posX = posTopRect.y
    gMeme.lines[0].posY = posTopRect.x

}

function renderRectBottom() {
    posBottomRect = {
        x: gElCanvas.width * 0.2,
        y: gElCanvas.height * 0.8
    }
    drawRect(posBottomRect.x, posBottomRect.y, 1)
    gRects.push({
        posX: posBottomRect.x,
        posY: posBottomRect.y,
        idx: 1
    })
    gMeme.lines[1].posX = posBottomRect.x
    gMeme.lines[1].posY = posBottomRect.y
}

function onChangeLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > 1) gMeme.selectedLineIdx = 0
    console.log(gMeme.selectedLineIdx);
    MarkCurrRect(gMeme.selectedLineIdx)
}

function MarkCurrRect(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
    if (lineIdx === 0) {
        gMeme.lines[0].isMarked = true
        gMeme.lines[1].isMarked = false
        drawImgOnCanvas(gMeme.src, gMeme.width, gMeme.height)
        renderRectTop()
        renderTextTop()
    } else if (lineIdx === 1) {
        gMeme.lines[1].isMarked = true
        gMeme.lines[0].isMarked = false
        drawImgOnCanvas(gMeme.src, gMeme.width, gMeme.height)
        renderRectBottom()
        renderTextBottom()
    }
}

function clearCurrRectText(idx) {
    // if (idx === 0) gCtx.clearRect(posTopRect.x, posTopRect.y - 10, posTopRect.x + 200, 60)
    // gRects.splice(idx, 1)
}

function onChangeLineText(newText) {
    var idx = gMeme.selectedLineIdx
    console.log(newText);
    gMeme.lines[idx].txt = newText
    drawImgOnCanvas(gMeme.src, gMeme.width, gMeme.height)
    // document.querySelector('#textLine').value = '';
}

//DRAW IMAGE ON CANVAS
function drawImgOnCanvas(src, width, height) {

    document.querySelector('.meme-editor-container').classList.remove('hidden');
    var img = new Image()
    img.src = src
    var heightCanvas = (height * gElCanvas.width) / width
    img.onload = () => {

        gCtx.drawImage(img, 0, 0, gElCanvas.width, heightCanvas) //img,x,y,xend,yend
        renderRectTop()
        renderRectBottom()
        renderTextTop()
        renderTextBottom()
        MarkCurrRect(gMeme.selectedLineIdx)
    }
    document.querySelector('.image-gallery-container').classList.add('hidden');
}

function convertImage(image) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    console.log(image);
    var src = image.src
    var width = image.offsetWidth
    var height = image.offsetHeight
    gMeme.selectedImgId = image.id
    gMeme.src = src
    gMeme.width = width
    gMeme.height = height
    drawImgOnCanvas(src, width, height)

}

//DRAW IMAGE ON CANVAS FROM GMEME
function drawImgOnCanvas2(gMeme) {
    document.querySelector('.meme-editor-container').classList.remove('hidden');

    var image = getImg(gMeme.selectedImgId)
    var img = new Image()
    img.src = image.url
    var heightCanvas = (image.url.offsetHeight * gElCanvas.width) / image.url.offsetWidth
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, heightCanvas) //img,x,y,xend,yend
    }
    document.querySelector('.image-gallery-container').classList.add('hidden');

}



//*****************************Arrows-buttons********************************************** */
function onChangeFontSize(value) {
    // changeFontSize(value, gMeme.selectedLineIdx)
    gMeme.lines[gMeme.selectedLineIdx].size += value
}

function onChangePosition(value) {
    var idx = gMeme.selectedLineIdx
    gMeme.lines[gMeme.selectedLineIdx].posY += value
    gMeme.lines[gMeme.selectedLineIdx].posX += value
    console.log(gMeme.lines[gMeme.selectedLineIdx].posY);
    drawRect(gMeme.lines[gMeme.selectedLineIdx].posX, gMeme.lines[gMeme.selectedLineIdx].posY + value, idx)


    MarkCurrRect(idx)
}




//IMAGE DOWNLOAD
function downloadCanvas(elLink) {
    console.log(elLink);
    var gCanvas = document.querySelector('canvas');
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}


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
    }
    reader.readAsDataURL(ev.target.files[0]) //translate the url
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function uploadImg() { //shows the url link and button share
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg"); //url translated
    // A function to be called if request succeeds: creates the link in douploadimage
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here:`
        document.querySelector('.user-msg-link').innerHTML = `<a href="${uploadedImgUrl}" target="_blank">click here!</a>`;

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
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