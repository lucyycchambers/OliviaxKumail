document.addEventListener('DOMContentLoaded', function() {
  var faqs = document.getElementsByClassName('faq-item');
  for (var i = 0; i < faqs.length; i++) {
    faqs[i].addEventListener('click', function() {
      var answer = this.querySelector('p');
      var arrow = this.querySelector('.arrow');
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        this.classList.remove('open');
      } else {
        answer.style.display = 'block';
        this.classList.add('open');
      }
    });
  }
});

  
