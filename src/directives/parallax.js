import Vue from 'vue';
import _ from 'lodash';

Vue.directive('parallax', {
  bind(el, binding) {
    const element = el;
    window.addEventListener(
      'mousemove',
      _.throttle((e) => {
        element.style.transition = '260ms ease';
        element.style.transform = `translate(${((e.pageX - window.innerWidth / 2) * binding.value)
          / 5}px, ${((e.pageY - window.innerHeight / 2) * binding.value) / 5}px)`;
      }, 100),
    );
  },
  unbind() {
    window.removeEventListener('mousemove');
  },
});
