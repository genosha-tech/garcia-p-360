/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */


AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    teleports: {type: 'string'},
    dur: {type: 'number', default: 750}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      data.target.setAttribute('material', 'src', data.src);
      // Wait for fade to complete.
      window.currentMove = data.src.replace('#','') ;
      setTimeout(function () {
        // Set image.
        
      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'opacity',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '0',
      to: '1'
    }); 
  }
});
