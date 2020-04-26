var toHide= document.querySelectorAll('.teleport');
for (var i = 0; i < toHide.length; i++) {
    toHide[i].setAttribute("visible",false);
};

var id = 'teleport-01-02';
document.getElementById(id).setAttribute("visible",true);