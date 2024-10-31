// fnc bg
function gradientBg() {
    const bg = document.querySelector('body');
    const main = document.querySelector('#main');
    const bgArr = [
        './images/motionbg-0.png',
        './images/motionbg-1.png',
        './images/motionbg-2.png',
        './images/motionbg-3.png',
        './images/motionbg-4.png',
        './images/motionbg-5.png',
        './images/motionbg-6.png',
        './images/motionbg-7.png',
    ];
    let i = 0;
    bg.style.backgroundImage = `url(${bgArr[0]})`;
    const updateBackground = () => {
        main.style.transition = 'background-image 3s ease-in-out';
        main.style.backgroundImage = `url(${bgArr[i]})`;
        main.style.backgroundAttachment = 'fixed';
        main.style.backgroundSize = 'cover';
        i = (i + 1) % bgArr.length;
    };

    updateBackground();
    setInterval(updateBackground, 2500);
}
gradientBg();

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('myAudio');
    const playIcon = document.getElementById('onboard_play');
    const pauseIcon = document.getElementById('onboard_pause');
    const sectionOnboard = document.querySelector('#onboard');

    console.log('autoplay');


    audio.autoplay = true;
    audio.load();
    pauseIcon.style.display = 'none';

    const playAudio = () => {
        audio.play().then(() => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }).catch(error => {
            console.log('Autoplay was prevented:', error);
        });
    };

    const pauseAudio = () => {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    };

    playIcon.addEventListener('click', playAudio);
    pauseIcon.addEventListener('click', pauseAudio);
    const handleOnboardClick = () => {
        playAudio();
        console.log('click');

        sectionOnboard.removeEventListener('click', handleOnboardClick);
    };

    sectionOnboard.addEventListener('click', handleOnboardClick);

    setTimeout(playAudio, 1000);
});

function addSliderAndAutoSlide(containerID, imgList, nextID, prevID, autoScroll) {
    const container = document.querySelector(`#${containerID}`);
    const imgContainer = container.querySelector('div');
    const nextBtn = document.getElementById(nextID);
    const prevBtn = document.getElementById(prevID);
    let scrollWidth = container.scrollWidth;
    let textPlaceHolder = document.querySelector(`#${containerID}_imgTitlePlaceHolder`);

    let vidSub0 = `An annual event reserved for competing dance crews to experience and practice tactics on 1vs1, 3vs3, and 5vs5 battles.`
    let vidSub1 = `During the 1-on-1 battles, I took on the role of a leader, organizing the order of battle based on the types of music being played, ensuring a dynamic and engaging experience for both the dancers and the audience.`
    let vidSub2 = `In the 3-on-3 and 5-on-5 battles, I collaborated closely with other members to perform both choreographed routines and solo freestyle segments, highlighting our versatility and originality as a collective.`

    container.parentElement.style.position = 'relative';
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '0';
    nextBtn.style.top = '50%';
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '0';
    prevBtn.style.top = '50%';
    nextBtn.style.cursor = 'pointer';
    prevBtn.style.cursor = 'pointer';
    nextBtn.style.zIndex = '100';
    prevBtn.style.zIndex = '100';
    nextBtn.style.borderRadius = '50%';
    prevBtn.style.borderRadius = '50%';
    nextBtn.style.backgroundColor = 'rgba(255,255,255, 0.5)';
    prevBtn.style.backgroundColor = 'rgba(255,255,255, 0.5)';

    let currentIndex = 0;
    const updateCurrentImage = (increment) => {
        currentIndex = (currentIndex + increment + imgList.length) % imgList.length;
        imgContainer.style.transition = 'transform 1s ease-in-out';
        imgContainer.style.transform = `translateX(-${currentIndex * scrollWidth}px)`;
        imgContainer.classList.add('slider-transition');
        if (textPlaceHolder) {
            if (currentIndex === imgList.length - 2) {
                textPlaceHolder.innerHTML = vidSub1;
            } else if (currentIndex === imgList.length - 1) {
                textPlaceHolder.innerHTML = vidSub2;
            } else {
                textPlaceHolder.innerHTML = vidSub0;
            }
        }
    };

    nextBtn.addEventListener('click', () => updateCurrentImage(1));
    prevBtn.addEventListener('click', () => updateCurrentImage(-1));

    updateCurrentImage(0);

    if (autoScroll) {
        setInterval(() => updateCurrentImage(1), 8000);
    }
}

const addImagesToContainer = (containerID, mediaList) => {
    const container = document.querySelector(`#${containerID} div`);
    mediaList.forEach(src => {
        const element = document.createElement(src.endsWith('.jpeg') ? 'img' : 'div');
        if (src.endsWith('.jpeg')) {
            element.src = src;
            container.appendChild(element);
        } else {
            element.innerHTML = `<iframe src="${src}" style="" frameborder="0" allowfullscreen></iframe>`;
            container.appendChild(element);
        }
    });
};

const initializeSlider = (containerID, imgList, nextID, prevID, autoScroll = true) => {
    addImagesToContainer(containerID, imgList);
    addSliderAndAutoSlide(containerID, imgList, nextID, prevID, autoScroll);
};

const holaImgList = [
    './images/_MG_8214.jpeg',
    './images/_MG_8244.jpeg',
    './images/DA__9332.jpeg',
    './images/DSC_5325.jpeg',
    './images/DSC_5326.jpeg',
    './images/DSC_5338.jpeg',
    './images/DSC_5352.jpeg',
    './images/DSC_6219.jpeg',
    './images/DSC_6511.jpeg',
    './images/DSC_6514.jpeg',
    './images/DSC03291.jpeg',
    './images/DSC03320.jpeg',
    './images/DSCF4207.jpeg',
    './images/hola1.jpeg',
    './images/hola2.jpeg',
    './images/hola3.jpeg',
    './images/hola4.jpeg',
    './images/hola5.jpeg',
    './images/hola6.jpeg',
    './images/hola7.jpeg',
    './images/hola8.jpeg',
    './images/WAACKING HBDC.jpeg',
];

const waackingImgList = [
    './images/DSC_5338.jpeg',
    './images/DSCF4207.jpeg',
    './images/DSC_5352.jpeg',
];

function smoothScrollToItem() {
    let main = document.querySelector('#main');
    let smoothScrollToTargets = document.querySelectorAll('.smoothScrollTo');
    let smoothScrollToTargetsYaxis = [];
    smoothScrollToTargets.forEach(target => {
        let targetYaxis = target.getBoundingClientRect().top + window.scrollY;
        smoothScrollToTargetsYaxis.push(targetYaxis);
    });

    let isScrolling;
    let preY = 0;
    const handleScroll = () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            let currentY = main.scrollTop;
            console.log(smoothScrollToTargetsYaxis);

            let targetIndex = 0;
            for (let i = 0; i < smoothScrollToTargetsYaxis.length; i++) {
                if (currentY >= smoothScrollToTargetsYaxis[i] - window.innerHeight / 2) {
                    targetIndex = i;
                }
            }

            if (preY < currentY && currentY > smoothScrollToTargetsYaxis[targetIndex] / 3 * 2) {
                preY = currentY;
                if (targetIndex < smoothScrollToTargets.length) {
                    if (currentY >= smoothScrollToTargetsYaxis[targetIndex] - 200 &&
                        currentY < smoothScrollToTargetsYaxis[targetIndex] + 200) {
                        main.scrollTo({
                            top: smoothScrollToTargetsYaxis[targetIndex],
                            behavior: 'smooth'
                        });
                        console.log('scroll to', targetIndex);
                    }
                }
            }
        }, 100);
    };

    main.addEventListener('scroll', handleScroll);
}
smoothScrollToItem();

const konnectSlideList = [
    './images/DSC_5325.jpeg',
    './images/_MG_8214.jpeg',
    './images/DSC_5326.jpeg',
    './images/WAACKING HBDC.jpeg',
    './images/DSC03320.jpeg',
    './images/DSC03291.jpeg',
    './images/DSC_6219.jpeg',
    './images/DSC_6514.jpeg',
    'https://drive.google.com/file/d/1G_yJ8ReEZfxwfoHu23gOwBmKh1mXR4oK/preview',
    "https://drive.google.com/file/d/13gbUYcl3gUuRhJLqdXOR5RrfJ8zHu8lY/preview",
]

initializeSlider('battle_itemIframeLand', konnectSlideList, 'battle_next', 'battle_prev', false);
function battle_itemIframeLand_Iframe_sizeChange() {
    let imgs = document.querySelectorAll('#battle_itemIframeLand img:not([src$=".svg"])');
    let iframe = document.querySelectorAll('#battle_itemIframeLand iframe');
    let containner = document.querySelector('#battle_itemIframeLand');
    let containnerWidth = containner.getBoundingClientRect().width;
    let containnerHeight = containner.getBoundingClientRect().height;
    let offsetWidthContainer = containner.offsetWidth;
    console.log(containnerWidth, containnerHeight);
    imgs.forEach(item => {
        item.style.width = `${containnerWidth}px`;
        item.style.height = `${containnerHeight}px`;
    })
    iframe.forEach(item => {
        // item.style.width = ${containnerWidth}px;
        item.style.height = `${containnerHeight}px`;
        item.style.margin = `0 ${offsetWidthContainer / 2 - item.getBoundingClientRect().width / 2}px`;
    })

}
battle_itemIframeLand_Iframe_sizeChange();


function createImageSlider(containerID, prevID, nextID, autoScroll = true, interval = 8000) {
    const container = document.querySelector(`#${containerID}`);
    const imgs = container.querySelectorAll('img');
    const prevBtn = document.querySelector(`#${prevID}`);
    const nextBtn = document.querySelector(`#${nextID}`);
    let imgTitlePlaceHolder = document.querySelector(`#${containerID}_imgTitlePlaceHolder`);
    let titleList = [];

    nextBtn.style.cursor = 'pointer';
    prevBtn.style.cursor = 'pointer';
    nextBtn.style.zIndex = '100';
    prevBtn.style.zIndex = '100';
    nextBtn.style.borderRadius = '50%';
    prevBtn.style.borderRadius = '50%';
    nextBtn.style.backgroundColor = 'rgba(255,255,255, 0.5)';
    prevBtn.style.backgroundColor = 'rgba(255,255,255, 0.5)';

    let currentIndex = 0;

    imgs.forEach((img, index) => {
        img.style.transition = 'all 0.5s ease-in-out';
        img.style.opacity = 0;
        img.style.display = 'none';
        if (img.getAttribute('title')) {
            titleList.push(img.getAttribute('title'));
        }
    });
    imgs[currentIndex].style.display = 'block';
    imgs[currentIndex].style.opacity = 1;

    const updateCurrentImage = (increment) => {
        imgs[currentIndex].style.transition = 'all 0.5s ease-in-out';
        imgs[currentIndex].style.opacity = 0;
        setTimeout(() => {
            imgs[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + increment + imgs.length) % imgs.length;
            imgs[currentIndex].style.display = 'block';
            imgs[currentIndex].style.opacity = 0;
            if (imgTitlePlaceHolder) {
                imgTitlePlaceHolder.innerHTML = titleList[currentIndex];
            }
            setTimeout(() => {
                imgs[currentIndex].style.opacity = 1;
            }, 100);
        }, 500);
    };

    nextBtn.addEventListener('click', () => updateCurrentImage(1));
    prevBtn.addEventListener('click', () => updateCurrentImage(-1));

    if (autoScroll) {
        setInterval(() => updateCurrentImage(1), interval);
    }
}

createImageSlider('waacking_slider_contain', 'waacking_prev', 'waacking_next');
createImageSlider('hola_slider_contain', 'hola_prev', 'hola_next');