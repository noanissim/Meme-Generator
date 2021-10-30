'use strict'

console.log('hereeee');

var gImgsStorage

function onSaveMeme() {
    var gCanvas = document.querySelector('canvas');
    var photo = 'img' + gMeme.selectedImgId
    localStorage.setItem(photo, gCanvas.toDataURL());
    loadFromStorageImg()
    gImgsStorage.push(photo)
    saveToStorage('gImgsStorage', gImgsStorage)
    onLoadImgFromStorage()
}

function loadFromStorageImg() {
    if (!localStorage.getItem('gImgsStorage')) {
        gImgsStorage = []
        saveToStorage('gImgsStorage', gImgsStorage)
    }
    gImgsStorage = loadFromStorage('gImgsStorage')
}

function onLoadImgFromStorage() {
    for (var i = 0; i < gImgsStorage.length; i++) {
        var dataURL = localStorage.getItem(gImgsStorage[i]);
        console.log(dataURL);
        var img = new Image;
        img.src = dataURL;

        document.querySelector('.saved-images').innerHTML += `<img src="${dataURL}" class="save-img">`;
    }

}