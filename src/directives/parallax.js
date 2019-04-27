import Vue from 'vue';
import _ from 'lodash';

Vue.directive('parallax', {
  bind(el, binding) {
    const element = el;
    window.addEventListener(
      'mousemove',
      _.throttle((e) => {
        const x = ((e.pageX - window.innerWidth / 2) * binding.value) / 5;
        const y = ((e.pageY - window.innerHeight / 2) * binding.value) / 5;
        element.style.transition = '260ms ease';
        element.style.transform = `translate(${x}px, ${y}px)`;
      }, 100),
    );
  },
  unbind() {
    window.removeEventListener('mousemove');
  },
});
