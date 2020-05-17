var toHide= document.querySelectorAll('.teleport');
for (var i = 0; i < toHide.length; i++) {
    toHide[i].setAttribute("visible",false);
};


var firstTeleports = []
firstTeleports.push('teleport-01-07');
firstTeleports.push('teleport-01-06');
firstTeleports.push('teleport-01-03');
firstTeleports.push('teleport-01-12');
for (var i = 0; i < firstTeleports.length; i++) {
	var id = firstTeleports[i];
	document.getElementById(id).setAttribute("visible",true);
}
