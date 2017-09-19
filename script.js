﻿//============================================//
//script.js - portfolio 2.0
//============================================//
// This holds global variables//

var previousScroll = 0; //This updates after every scroll to afix the header only if distance is less than is used to be, or "scroll up

var clickEvent = false; //This will determine if the menu should be opened or closed

//============================================//
//These are all the event listeners

window.addEventListener('scroll', stickyHeader);
window.addEventListener('scroll', mobileBrowserHide);
window.addEventListener('load', mobileBrowserHide);
document.getElementById('hamburger').addEventListener('click', menuFunctions);
document.getElementById('changeout-image').addEventListener('load', detectAspectRatio);
window.addEventListener('resize', detectAspectRatio);
window.addEventListener('load', loadEmoticons);
window.addEventListener('load', loadEmoticons);
window.addEventListener('resize', resetClickEvent);
document.getElementById('cross').addEventListener('click', closeImageBox);
window.addEventListener('hashchange', handleBackButton);
document.getElementById('submit').addEventListener('click', formDataConfirm);

//============================================//
//This function helps the sticky header scroll foward and hide appropriately

function stickyHeader() {
	var header =document.getElementById('header');
	var distance = window.pageYOffset;
	
	if(distance <= previousScroll && distance >= 1) {
		header.className = 'sticky-header';
	}else{
		header.className = 'static-header';
	}
	
	previousScroll=window.pageYOffset; //This will be used to see if the user "scrolls up" by comparing it to the previous scroll number
}

//============================================//
//This hides the address bar when scrolling

function mobileBrowserHide() {
	var winDoc = window.document.documentELement;
	
	if(window.pageYOffset === 0 && previousScroll === 0){
		winDoc.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		winDoc.mozRequestFullScreen();
		winDoc.msRequestFullscreen();
		winDoc.requestFullscreen();
	}else if(window.pageYOffset === 0 && previousScroll !== 0){
		winDoc.webkitExitFullscreen();
		winDoc.mozCancelFullscreen();
		winDoc.msExitFullscreen();
		winDoc.exitFullscreen();
	}
}

//============================================//
//This function handles the opening and closing behaviors of the nav menu with the hamburger stylings

function menuFunctions(){
	var navMenu = document.getElementById('navMenu');
	var navUl = document.getElementById('navUl');
	var hamburger = document.getElementById('hamburger');
	var menuDivs = hamburger.getElementsByTagName('div');
	var mainDiv = document.getElementById('main');
	var footerTag = document.getElementById('footer');
	var htmlTag = document.getElementById('html');
	
	if(clickEvent === false){
		navMenu.className = 'menuShow';
		navUl.className = 'ulShow fade-in';
		hamburger.className = 'clickEvent';
		mainDiv.style.pointerEvents = 'none';
		footerTag.style.pointerEvents = 'none';
		htmlTag.style.overflow = 'hidden';
		
		clickEvent = true;
	} else if (clickEvent === true){
		navMenu.className='';
		navUl.className = 'fade-out';
		hamburger.className = '';
		mainDiv.style.pointerEvents = '';
		footerTag.style.pointerEvents = '';
		htmlTag.style.overflow = '';
		
		clickEvent = false;
	}
	
}

//============================================//
//will reset the clickEvent variable and all classes that were handled so it loads properly on resizing

function resetClickEvent() {
	var navMenu = document.getElementById('navMenu');
	var navUl = document.getElementById('navUl');
	var hamburger = document.getElementById('hamburger');

	if (window.outerWidth > 610){
		navMenu.className = '';
		navUl.className = '';
		hamburger.className = '';
		
		clickEvent = false;	
	}
}

//============================================//
//This function formats the #image-box depending on img natural aspect ratio compared to the window aspect ratio

function detectAspectRatio() {
	var docWidth = window.innerWidth;
	var docHeight = window.innerHeight;
	
	var imgWidth = document.getElementById('changeout-image').naturalWidth;
	var imgHeight = document.getElementById('changeout-image').naturalHeight;
	var descriptionSide = document.getElementById('description-side');
	var imageSide = document.getElementById('image-side');
	var changeoutText = document.getElementById('changeout-text');
	var changeoutImage = document.getElementById('changeout-image');
	var para = changeoutText.querySelector('p');
	
	var windowRatio = docWidth/docHeight;
	var windowRatioModified = windowRatio - .35;
	var imageRatio = imgWidth/imgHeight;
	
	if(windowRatioModified >= imageRatio) {
		imageSide.style.height = '90%';
		imageSide.style.width = '60%';
		changeoutText.style.textAlign = 'right';
		changeoutText.style.paddingLeft = '70%';
		changeoutText.style.paddingTop = '';
		para.style.textAlign = 'right';
	}else {
		imageSide.style.height = '67%';
		imageSide.style.width = '86%';
		changeoutText.style.textAlign = 'left';
		changeoutText.style.paddingLeft = '';
		changeoutText.style.paddingTop = document.getElementById('image-side').clientHeight + 5 + 'px';
		para.style.textAlign = 'left';
	}
	console.log(windowRatioModified + ' ' + imageRatio);
}

//============================================//
//This function will close the #image-box

function closeImageBox() {
	var imgBox = document.getElementById('dark-box');
	imgBox.className = 'fade-out';
	var footerTag = document.getElementById('footer');
	var htmlTag = document.getElementById('html');
	var footerTag = document.getElementById('footer');
	var htmlTag = document.getElementById('html');
	var mainDiv = document.getElementById('main');
	var changeoutText = document.getElementById('changeout-text');
	var changeoutImage = document.getElementById('changeout-image');
	
	changeoutText.innerHTML = '';
	changeoutImage.src = '';
	mainDiv.style.pointerEvents = '';
	footerTag.style.pointerEvents = '';
	htmlTag.style.overflow = '';
}

//============================================//
//This function opens the #image-box with the pulled data 

function openImageBox(el) {
	var imgBox =document.getElementById('dark-box');
	var elName = this.id;
	var footerTag = document.getElementById('footer');
	var htmlTag = document.getElementById('html');
	var mainDiv = document.getElementById('main');
	
	location.hash = "#image-open";
	
	for (var i=0; i<images.length; ++i){
		var imageName = images[i].name;
		
		var changeoutText = document.getElementById('changeout-text');
		var changeoutImage = document.getElementById('changeout-image');
		
		if (imageName.match(elName)){
			if (elName === imageName){
				if (window.outerWidth > 610){
					changeoutImage.src = images[i].sourceSmall;
				}else{
					changeoutImage.src = images[i].source;
				}
				changeoutText.innerHTML = images[i].title + images[i].description;
			}else {
				changeoutImage.src = brokenLink.source;
				changeoutText.innerHTML = brokenLink.description;
			}
		}
	}
	
	mainDiv.style.pointerEvents = 'none';
	footerTag.style.pointerEvents = 'none';
	htmlTag.style.overflow = 'hidden';
	imgBox.style.display = 'flex';
	imgBox.className = 'fade-in';
}

//============================================//
//This function prevents back button behaviors when the image box is open

function handleBackButton(event){
	var imgBox =document.getElementById('dark-box');
	
	if(location.hash){
		console.log('hash is open!');
	}else{
		closeImageBox();
	}
}

//============================================//
//This function loads a random emoticon into the emoticon box

function loadEmoticons() {
		var emoticonSwap = document.getElementById('emoticon-swap');
		var i = Math.floor(Math.random()*emoticons.length);
	
		emoticonSwap.innerHTML = '<p>' + emoticons[i] +'</p>';
}

//============================================//
//All arrays that hold generated content are here

function formDataConfirm() {
	var contactMe = document.getElementById('contactMe');
	var confirmWin = document.getElementById('confirmation-window');
	
	confirmWin.className= '';
	
	setTimeout(function(){
		confirmWin.className = 'hide';
	}, 7000);
	
	event.preventDefault();
}

//============================================//
//All arrays that hold generated content are here

//emoticons to be generated by name in Header

var emoticons = ['¯\_(ツ)_/¯', 'O_O', '◉_◉', 'ಠ_ಠ', '^_^', '=^.^=', '•ﺑ•', '◕ω◕', '｡◕ ‿ ◕｡', '(¬‿¬)', '(°ℇ °)', '^ㅂ^', '(;¬_¬)', 'ޏ(ὸ.ό)ރ'];
