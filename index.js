import { quotesData } from "./data.js";

const logo = document.querySelector('.logo i');
const emotionRadios = document.getElementById('emotion-radios');
const getQuoteBtn = document.getElementById('get-quote-btn');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalInner = document.getElementById('modal-inner');
const modal = document.getElementById('modal');
const radios = document.getElementsByClassName('radio');

document.addEventListener('click', function (event) {
    if (modal.style.display === 'block' && !modal.contains(event.target) && event.target !== getQuoteBtn) {
        closeModal();
    }
});

emotionRadios.addEventListener('change', highlightCheckedOption);
getQuoteBtn.addEventListener('click', renderQuotes);
modalCloseBtn.addEventListener('click', closeModal)

function closeModal(){
    modal.style.display = 'none';
    clearRadios();
    
}
function clearRadios(){
    for (let radio of radios){
        radio.classList.remove('highlighted');
    }
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    for (let radioButton of radioButtons) {
        radioButton.checked = false;
    }
}

function highlightCheckedOption(e){
    for (let radio of radios){
        radio.classList.remove('highlighted');
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlighted');
}

function getMatchingQuotes(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
       const matchingQuotes = quotesData.filter(function(quote){
        return quote.emotionTags.includes(selectedEmotion)
       })
       return matchingQuotes;
    } 
}
function getSingleQuote(){
    const quotesArray = getMatchingQuotes();
    if(quotesArray.length === 1){
        return quotesArray[0];
    }
    else {
        const randomNumber = Math.floor(Math.random()* quotesArray.length);
        return quotesArray[randomNumber];
    }
}
function renderQuotes(){
    const quote= getSingleQuote();
    modalInner.innerHTML = `
    <blockquote>
    <p>${quote.text}</p>
    <p class="author">${quote.author}</p>
    <blockquote>`

    modal.style.display = 'block';
}
function getEmotionsArray(quotesData){
    const emotionsArray = [];
    for (let quote of quotesData){
        for(let emotion of quote.emotionTags){
            if(emotionsArray.includes(emotion)){
                continue;
            }
            else{
           emotionsArray.push(emotion);}
        }
    }
    return emotionsArray;
}
function renderEmotionsRadios(quotesData){
    const emotionsArray= getEmotionsArray(quotesData);
    let radioItems="";
    for (let emotion of emotionsArray){
        radioItems += `<div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" id="${emotion}" name="emotion" value="${emotion}">
        </div>`;
    }
    emotionRadios.innerHTML = radioItems;
    
}


renderEmotionsRadios(quotesData);

// logo animation
function toggleIcon() {
    logo.classList.toggle('fa-face-smile');
    logo.classList.toggle('fa-face-smile-wink');
}

setInterval(toggleIcon, 800);

