import Vue from 'vue';

Vue.directive('parallax', {
  bind(el, binding) {
    const element = el;
    window.addEventListener('mousemove', (e) => {
      element.style.transform = `translate(${((e.pageX - window.innerWidth / 2) * binding.value)
        / 5}px, ${((e.pageY - window.innerHeight / 2) * binding.value) / 5}px)`;
    });
  },
  unbind() {
    window.removeEventListener('mousemove');
  },
});
