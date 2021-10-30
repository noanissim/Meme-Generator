'use strict'

function init() {


    renderGallery()
    initEditor()

    document.querySelector('.meme-editor-container').hidden = true
    document.querySelector('.meme-editor-container').style.display = 'none'
    document.querySelector('.image-gallery-container').hidden = false
    document.querySelector('.meme-editor-container').hidden = true
    document.querySelector('.meme-editor-container').style.display = 'none'
    autocomplete(document.getElementById("myInput"), gFilters);
}


function initSaved() {
    onOpenMemesTab()
    document.querySelector('.save-img-container').hidden = false
}