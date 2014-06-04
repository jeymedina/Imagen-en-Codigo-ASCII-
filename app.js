/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

(function() {
	var contenedorParaAscii = document.getElementById("ascii");
	var captura = false;

	camera.init({
		width: 100,
		height: 80,
		fps: 30,
		mirror: true,

		onFrame: function(canvas) {
			ascii.fromCanvas(canvas, {
				// contrast: 128,
				callback: function(asciiString) {
					contenedorParaAscii.innerHTML = asciiString;
				}
			});
		},

		onSuccess: function() {
			document.getElementById("info").style.display = "none";

			captura = true;
		},

		onNotSupported: function() {
			document.getElementById("info").style.display = "none";
			contenedorParaAscii.style.display = "none";
			document.getElementById("notSupported").style.display = "block";
		}
	});
})();
