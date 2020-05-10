
    var videos = ["audio01"];
    var played = [false];

    function checkOpenYoutube(){
      for (var i = 0; i < played.length; i++) {
        if (!played[i]){
          return;
        }
      }

      // var d = document.getElementById('second-wrapper');
      // d.style.visibility='visible';
      // d.style.display='block';
    }
  function start(element) {
    element.parentNode.removeChild(element);
    // document.getElementById("soundtrack").play();
    // for (var i = 0; i < videos.length; i++) {
    //   var id = videos[i];
    //     var v = document.getElementById(id);
    //     v.play();
    //     // v.pause();
    //       // (function(vid,id,i){
    //       //   document.getElementById(id+ '-marker').addEventListener('marker-found', function(e){ 
    //       //      vid.play();
    //       //      vid.onended = function(e) {
    //       //        checkOpenYoutube()
    //       //     };
    //       //      played[i] = true;
    //       //   });
    //       //   document.getElementById(id+'-marker').addEventListener('marker-lost', function(e){ 
    //       //     vid.pause();

    //       //   });
    //       // })(v,id,i);
    // }

    

  };
  





  