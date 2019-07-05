angular
  .module("testApp", [])
  .controller("TestController", function TestController($scope) {
    const vm = this;
    vm.isExpanded = true;
    const retractedHeight = '15vh';

    vm.handleCollapse = (elementId) => {
      let element = document.getElementById(elementId);
      (vm.isExpanded)
        ? collapseSection(element)
        : expandSection(element);
      vm.isExpanded = !vm.isExpanded;
    }

    function collapseSection(element) {
      let sectionHeight = element.scrollHeight;

      let elementTransition = element.style.transition;
      element.style.transition = '';

      requestAnimationFrame(function () {
        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;

        requestAnimationFrame(function () {
          element.style.height = 5 + 'px';
        });
      });

      element.setAttribute('data-collapsed', 'true');
    }

    function expandSection(element) {
      let sectionHeight = element.scrollHeight;

      // have the element transition to the height of its inner content
      element.style.height = sectionHeight + 'px';

      // when the next css transition finishes (which should be the one we just triggered)
      element.addEventListener('transitionend', function (e) {
        // remove this event listener so it only gets triggered once
        element.removeEventListener('transitionend', arguments.callee);

        // remove "height" from the element's inline styles, so it can return to its initial value
        element.style.height = null;
      });

      // mark the section as "currently not collapsed"
      element.setAttribute('data-collapsed', 'false');
    }

  })
