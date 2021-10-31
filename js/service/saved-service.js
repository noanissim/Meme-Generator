'use strict'

function saveMeme(gCanvas) {
    var photo = 'img' + gMeme.selectedImgId
    localStorage.setItem(photo, gCanvas.toDataURL());
    loadFromStorageImg()
    gImgsStorage.push(photo)
    saveToStorage('gImgsStorage', gImgsStorage)
    onRenderSavedMemes()
}

function doLoadFromStorage() {
    if (!localStorage.getItem('gImgsStorage')) {
        gImgsStorage = []
        saveToStorage('gImgsStorage', gImgsStorage)
    }
    gImgsStorage = loadFromStorage('gImgsStorage')
}