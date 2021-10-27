'use strict'

function init() {
    renderGallery()
    initEditor()
    document.querySelector('.meme-editor-container').classList.add('hidden');

}

function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    console.log(mainMenu);
    mainMenu.classList.toggle('open');
}