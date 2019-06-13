//
// Initialising image container array
//

const imgMainArr = [];
let imgSrc = document.getElementsByTagName('img');
for(let image in imgSrc) {
  if(imgSrc.hasOwnProperty(image)) {
    imgMainArr.push(imgSrc[image].src)
   }
}

//
//Gallery Option 1 start
//

function expandOpt1() {
  
    let mainContainer = document.getElementById('option1').children[0];
    let imgContainer = document.getElementById('option1').children[0].children;
    let closeEl = document.getElementById('close');
    
    if(this.getBoundingClientRect().width == 198) {
      for(let i = 0; i < imgContainer.length; i++) {
        if(imgContainer[i] != this) {
          imgContainer[i].style.display = 'none';
        }
      }
      this.style.width = '398px';
      this.classList.add('hide-expand');
      closeEl.style.display = 'block';
      closeEl.style.width = '50px';
    } else if(this.getBoundingClientRect().width == 398) {
      this.style.width = '198px';
      this.classList.remove('hide-expand');
      for(let i = 0; i < imgContainer.length; i++) {
        imgContainer[i].style.display = 'block';
      }
      closeEl.style.display = 'none';
      closeEl.style.width = '50px';
    }
    return false;
  }
  
  function closeDisp() {
    
    let imgContainer = document.getElementById('option1').children[0].children;
    let closeEl = document.getElementById('close');

    for(let i = 0; i < imgContainer.length; i++) {
      if(imgContainer[i].children[0] && imgContainer[i].children[0].nodeName === 'IMG') {
        imgContainer[i].style.width = '198px';
        imgContainer[i].classList.remove('hide-expand');
        imgContainer[i].style.display = 'block';
      }
    }
    
    closeEl.style.display = 'none';
    
    return false;
  }
  
//
//Gallery Option 2 start
//
  
  function startGalleryTwo() {
    
    // let imgSrc = document.getElementsByTagName('img');
    let navEl = document.getElementById('nav').children;
    let imgContainer = document.getElementById('option2').children[0].children;
    
    for(let i = 0; i < imgMainArr.length; i++) {
      navEl[i].style.background = 'url("' +  imgMainArr[i] + '") no-repeat';
      navEl[i].style.backgroundPosition = 'center';
      navEl[i].style.backgroundSize = '75px';
    }
    
    for(let i = 0; i < imgContainer.length; i++) {
      imgContainer[i].removeAttribute('style');
    }
    return false;
  }

function galleryNav(e) {
  let child = e.target;
  let parent = child.parentNode;
  let indexEl = Array.prototype.indexOf.call(parent.children, child);
  let imgContainer = document.getElementById('option2').children[0].children;
  let backEl = document.getElementById('option2');
  
  for(let i = 0; i < imgContainer.length; i++) {
    imgContainer[i].style.transform = 'translate(' + (indexEl * -400) + 'px)';
  }

  backEl.style.background = 'url(' + imgContainer[indexEl].children[0].src + ') no-repeat';
  backEl.style.backgroundSize = 'cover';
  backEl.style.backgroundPosition = 'center';
  
  return false;
}

//
//Gallery Option 3 start
//
  
function galleryThree(e) {
    let imgContainer = document.getElementById('option3').children[0].children;
    let imgContainerLng = imgContainer.length - 1;
    let targetEl = e.target;
    let targetIndex = Array.prototype.indexOf.call(imgMainArr, targetEl.src);
    let clickedEl = targetEl.src;
    // let currentEl = imgContainer[0].children[0].src;

    imgContainer[0].children[0].src = targetEl.src;

    let newArr = imgMainArr.slice(0, targetIndex).concat(imgMainArr.slice(targetIndex + 1, imgContainerLng));

    for( let i = 0; i < newArr.length; i++) {
    imgContainer[i + 1].children[0].src = newArr[i]
    }

    // imgContainer[0].children[0].src = currentEl;
    imgContainer[0].children[0].src = clickedEl;

    // tried to implement smooth fade with javascript but looked ugly
    //   setTimeout(fadeOut, 150);
    //   function fadeOut() {
    //     imgContainer[0].children[0].style.opacity = '0';
    //   }
    //   setTimeout(fadeIn, 250);
    //   function fadeIn() {
    //     imgContainer[0].children[0].style.opacity = '1';
    //     imgContainer[0].children[0].src = clickedEl;
    //   }

    e.preventDefault();
    return false;
}
  
//
//Gallery selection
//
  
  let OptContain = document.getElementById('option-container');
  
  function chooseOpt(e) {
    
    let option = document.getElementsByClassName('option-set')[0];
    let idEl = e.target.id;
    option.id = idEl.replace('-set', '');
    
    if(e.target.id === 'option1-set') {
      let container = document.getElementById('option1');
      container.removeAttribute('style');
      let imgContainer = document.getElementById('option1').children[0].children;
      let closeEl = document.getElementById('close');
      for(let i = 0; i < imgContainer.length; i++) {
        imgContainer[i].removeEventListener('click', galleryThree);
        imgContainer[i].addEventListener('click', expandOpt1, false);
        imgContainer[i].removeAttribute('style');
        if(imgContainer[i].children[0]) imgContainer[i].children[0].src = imgMainArr[i];
      }
      closeEl.addEventListener('click', closeDisp, false);
    }
    
    if(e.target.id === 'option2-set') {
      let container = document.getElementById('option2');
      container.removeAttribute('style');
      let imgContainer = document.getElementById('option2').children[0].children;
      let closeEl = document.getElementById('close');
      
      startGalleryTwo();
      
      for(let i = 0; i < imgContainer.length; i++) {
        imgContainer[i].removeEventListener('click', expandOpt1);
        if(imgContainer[i].children[0]) imgContainer[i].children[0].src = imgMainArr[i];
      }
      
      closeEl.removeEventListener('click', closeDisp);
      
      document.getElementById('nav').addEventListener('click', galleryNav);
    }

    if(e.target.id === 'option3-set') {
      let container = document.getElementById('option3');
      container.removeAttribute('style');
      let imgContainer = document.getElementById('option3').children[0].children;
      let imgContainerLng = imgContainer.length - 1;
      
      for(let i = 0; i < imgContainerLng; i++) {
        imgContainer[i].removeAttribute('style');
        imgContainer[i].removeEventListener('click', expandOpt1);
        imgContainer[i + 1].addEventListener('click', galleryThree);
      }  
    }
    return false;
  }
  
  OptContain.addEventListener('click', chooseOpt);
  

//
// start gallery option 1 by default
//
  
let container = document.getElementById('option1');
container.removeAttribute('style');
let imgContainer = document.getElementById('option1').children[0].children;
let closeEl = document.getElementById('close');
for(let i = 0; i < imgContainer.length; i++) {
    imgContainer[i].removeEventListener('click', galleryThree);
    imgContainer[i].addEventListener('click', expandOpt1, false);
    imgContainer[i].removeAttribute('style');
    if(imgContainer[i].children[0]) imgContainer[i].children[0].src = imgMainArr[i];
}
closeEl.addEventListener('click', closeDisp, false);
