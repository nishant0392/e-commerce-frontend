

/**
 * Function to scroll to top of the page.
 */
function scrollToTop() {
  console.log('kkh')
  scrollToTopBtn.classList.remove('visible');

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, 250);

}

var scrollToTopBtn = document.getElementsByClassName('scroll-to-top')[0];

if (scrollToTopBtn) {
  window.addEventListener('scroll', function () {

    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add('visible');
    }

    else {
      scrollToTopBtn.classList.remove('visible');
    }
  })
}
