// Author: Andrei Gheorghe (http://github.com/idevelop)

var ascii = (function() {
	function asciiFromCanvas(canvas, options) {

		var characters = (" .,:;i1tfLCG08@").split("");

		var ct = canvas.getContext("2d");
		var width = canvas.width;
		var height = canvas.height;
		
		var asciiCharacters = "";

		// calcula el factor de contraste para ver la imagen definida
		var contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast));

		var imageData = ct.getImageData(0, 0, width, height);
		for (var y = 0; y < height; y += 2) { 
			for (var x = 0; x < width; x++) {
				// cambia el pixel por el simbolo

				var offset = (y * width + x) * 4;

				var color = getColorAtOffset(imageData.data, offset);
	
				// incremento del contraste
				var contrastedColor = {
					red: bound(Math.floor((color.red - 128) * contrastFactor) + 128, [0, 255]),
					green: bound(Math.floor((color.green - 128) * contrastFactor) + 128, [0, 255]),
					blue: bound(Math.floor((color.blue - 128) * contrastFactor) + 128, [0, 255]),
					alpha: color.alpha
				};

				// brillo para los pixeles, se determina para definir mejor las zonas y determinar que simbolo debe ponerse
				var brightness = (0.299 * contrastedColor.red + 0.587 * contrastedColor.green + 0.114 * contrastedColor.blue) / 255;

				var character = characters[(characters.length - 1) - Math.round(brightness * (characters.length - 1))];

				asciiCharacters += character;
			}

			asciiCharacters += "\n";
		}

		options.callback(asciiCharacters);
	}

	function getColorAtOffset(data, offset) {
		return {
			red: data[offset],
			green: data[offset + 1],
			blue: data[offset + 2],
			alpha: data[offset + 3]
		};
	}


	function bound(value, interval) {
		return Math.max(interval[0], Math.min(interval[1], value));
	}

	return {
		fromCanvas: function(canvas, options) {
			options = options || {};
			options.contrast = (typeof options.contrast === "undefined" ? 128 : options.contrast);
			options.callback = options.callback || doNothing;

			return asciiFromCanvas(canvas, options);
		}
	};
	//evento para llamada a funcion de bajar imagen
	nom_div("descarga").addEventListener('click', function(event)
    {
		guardarImagenDos(contexto);
	});
	//funcion para bajar imagen
	function guardarImagenDos(canvas)
    {  
		var datosCanvas = canvas.toDataURL();
		document.getElementById("Foto").src = datosCanvas;
        ct.download = nomfoto + ".png";
    }

})();	
	
	
	
