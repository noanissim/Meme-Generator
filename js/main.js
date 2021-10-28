'use strict'

function init() {
    renderGallery()
    initEditor()
    document.querySelector('.meme-editor-container').classList.add('hidden');
    document.querySelector('.image-gallery-container').classList.remove('hidden');
    // document.querySelector('footer').classList.remove('hidden');

}