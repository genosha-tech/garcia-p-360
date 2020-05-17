/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */


AFRAME.registerComponent('hide-show-teleports', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    teleports: {type: 'string'},
    dur: {type: 'number', default: 500}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    el.addEventListener(data.on, function () {
      var toHide= document.querySelectorAll('.teleport');
      var teleports = data.teleports.split(',');

      for (var i = 0; i < toHide.length; i++) {
        toHide[i].setAttribute("visible",false);
      }
      window.currentMove = data.src.replace('#','') ;
      setTimeout(function () {
        for (var i = 0; i < teleports.length; i++) {
          var id = 'teleport-' +teleports[i];
          document.getElementById(id).setAttribute("visible",true);
        }
      
      }, data.dur);
    });
  }
});
