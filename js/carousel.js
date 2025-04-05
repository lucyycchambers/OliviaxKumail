document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('#nextButton');
    const prevButton = document.querySelector('#prevButton');
    const totalSlides = slides.length;
    let currentIndex = 0;

    let slidesToShow = window.innerWidth <= 800 ? 2 : 3;
    let width = window.innerWidth <= 800 ? 7 : 9.1;
    let slideWidth = (track.getBoundingClientRect().width - (10 * (slidesToShow - 1))) / slidesToShow;
    
    const initializeCarousel = () => {
        updateSlideWidth();
        updateButtonState();
        addEventListeners();
    };

    const updateSlidesToShow = () => {
        slidesToShow = window.innerWidth <= 800 ? 2 : 3;
        width = window.innerWidth <= 800 ? 7 : 9.1;
    };

    const updateSlideWidth = () => {
        updateSlidesToShow();
        slideWidth = (track.getBoundingClientRect().width - (10 * (slidesToShow - 1))) / slidesToShow;
        slides.forEach(slide => {
            slide.style.flex = `0 0 calc(${100 / slidesToShow}% - ${width}px)`;
        });
        updateSlidePosition();
    };

    const updateSlidePosition = () => {
        track.style.transform = `translateX(-${currentIndex * (slideWidth + 10)}px)`;
    };

    const updateButtonState = () => {
        if (currentIndex === 0) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }
    
        if (currentIndex >= totalSlides - slidesToShow) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }

    const handleNextClick = () => {
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex++;
            updateSlidePosition();
            updateButtonState();
        }
    };

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
            updateButtonState();
        }
    };

    const handleResize = () => {
        if (window.innerWidth >= 1200) {
            disableCarousel();
        } else {
            enableCarousel();
        }
    };

    const addEventListeners = () => {
        if (!nextButton.dataset.listenerAdded) {
            nextButton.addEventListener('click', handleNextClick);
            prevButton.addEventListener('click', handlePrevClick);
            nextButton.dataset.listenerAdded = 'true';
            prevButton.dataset.listenerAdded = 'true';
        }
    };

    const removeEventListeners = () => {
        if (nextButton.dataset.listenerAdded) {
            nextButton.removeEventListener('click', handleNextClick);
            prevButton.removeEventListener('click', handlePrevClick);
            delete nextButton.dataset.listenerAdded;
            delete prevButton.dataset.listenerAdded;
        }
    };

    const enableCarousel = () => {
        initializeCarousel();
        nextButton.style.display = 'block';
        prevButton.style.display = 'block';
    };

    const disableCarousel = () => {
        track.style.transform = 'none';
        slides.forEach(slide => {
            slide.style.flex = '1';
        });
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
        removeEventListeners();
    };

    if (window.innerWidth < 1200) {
        enableCarousel();
    } else {
        disableCarousel();
    }

    window.addEventListener('resize', handleResize);
});




