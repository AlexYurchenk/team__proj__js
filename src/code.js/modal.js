// // import * as basicLightbox from 'basiclightbox';
// // import 'basiclightbox/dist/basicLightbox.min.css';

// // import cardMovieTemplate from '../templates/modal-card.hbs';

// const modalRefs = {
//     lightbox: document.querySelector('.modal-movie-lightbox'),
//     closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
//     overlayModal: document.querySelector('.modal-movie-overlay'),
//   };

//   const refs = {
//     filmContainer: document.querySelector('.js-trend-list'),
//     modal: document.querySelector('.modal'),
//   };

// //   refs.filmContainer.addEventListener('click', showMovieCard);


// //   async function showMovieCard(event) {
  
// //     if (event.target.tagName !== 'IMG') {
// //       return
// //     }
  
// //     openCloseModal();
  
// //     modalRefs.overlayModal.insertAdjacentHTML(
// //       'beforeend',
// //       cardMovieTemplate(
// //         await fetchMovie(event.target.closest('.movie-items').getAttribute('id')),
// //       ),
// //     );

// //    }

// //    async function fetchMovie(id) {
// //     const response = await fetch(
  
// //       `https://api.themoviedb.org/3/movie/${id}?api_key=44d74a10460e9a32f8546bed31d47780`,
// //     );
// //     return await response.json();
// //   }

// //   async function openCloseModal() {
  

// //     modalRefs.lightbox.classList.toggle('modal-is-open');
  
// //     if (modalRefs.lightbox.classList.contains('modal-is-open')) {
// //       window.addEventListener('keydown', pressEsc);
// //       modalRefs.closeModalBtn.addEventListener('click', openCloseModal);
// //       modalRefs.overlayModal.addEventListener('click', onOverlayClick);
// //     } else {
// //       window.removeEventListener('keydown', pressEsc);
// //       modalRefs.closeModalBtn.removeEventListener('click', openCloseModal);
// //       modalRefs.overlayModal.removeEventListener('click', onOverlayClick);
// //        removeOldElement(document.querySelector('.modal-movie-wrapper'));
  
// //     }
// //   }

// //   function pressEsc(evt) {
// //     if (
// //       modalRefs.lightbox.classList.contains('modal-is-open') &&
// //       evt.code === 'Escape'
// //     ) {
// //       openCloseModal();
// //     }
// //   }
  
// //   function onOverlayClick(evt) {
// //     if (evt.target.closest('.modal-movie-wrapper')) {
// //       return;
// //     }
  
// //     openCloseModal();
// // }

// // function removeOldElement(element) {
// //     if (element) {
// //       element.remove();
// //     }
// //   }
