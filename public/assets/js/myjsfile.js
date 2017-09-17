const $p = $('#quote')
const $i = $('#author')
const $inner = $('.inner')
const $sticky = $('#sticker')
const $next = $('#next')
const $previous = $('#prev')

$(document).ready(function() {
  $($sticky).hide().delay(2000).fadeIn(3000)
  $($sticky).sticky({
    topSpacing: 290,
    zIndex: 1000
  });

  $($next).hide().delay(1500).fadeIn('slow')
  $($previous).hide().delay(1500).fadeIn('slow')



  // plugging animsition
  $(".animsition").animsition({
    inClass: 'fade-in-left-sm',
    outClass: 'fade-out-left-sm',
    inDuration: 1000,
    outDuration: 100,
    linkElement: '.animsition-link',
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });

  // updating quotes in footer
  $.ajax({
    url: '/quotes'
  }).done(data => {
    let quotes = []

    for (let key in data) {
      quotes.push(data[key].author)
      quotes.push(data[key].quotesBody)
    }
    // console.log(quotes)
    changeIndex(quotes)
  })
  $('.carousel').carousel()
});

///////////////////////////////////
// three slides at the same time//
//////////////////////////////////
// (function(){
//   // setup your carousels as you normally would using JS
//   // or via data attributes according to the documentation
//   // https://getbootstrap.com/javascript/#carousel
//   $('#carousel123').carousel({ interval: 5000 });
// }());
//
// (function(){
//   $('.carousel-showmanymoveone .item').each(function(){
//     var itemToClone = $(this);
//
//     for (var i=1;i<3;i++) {
//       itemToClone = itemToClone.next();
//
//       // wrap around if at end of item collection
//       if (!itemToClone.length) {
//         itemToClone = $(this).siblings(':first');
//       }
//
//       // grab item, clone, add marker class, add to collection
//       itemToClone.children(':first-child').clone()
//       .addClass("cloneditem-"+(i))
//       .appendTo($(this));
//     }
//   });
// }());





// changeIndex quotes and author
function changeIndex(arr){
  let len = arr.length
  let i = 0

  setInterval(() => {

    if (isOdd(i) === 0)
    $($p).hide()
    $($p).fadeIn(1000).html(arr[i + 1]).delay(14000).fadeOut(500)

    $($i).hide()
    $($i).fadeIn(2000).html(arr[i]).delay(13000).fadeOut(500)

    i = i + 2

    if (i >= (len))
    i = 0

  }, 15000)
}


function isOdd(num) {
  return num % 2;
}
