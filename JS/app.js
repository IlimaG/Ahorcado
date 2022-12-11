const app = {
   appName: 'Free La Veneno',
   version: '1.0.0',
   licensed: undefined,
   author: 'Los Azuquequers',
   ctx: undefined,
   imageInstance: undefined,
   framesCounter: 0,

   canvasSize: {
      h: undefined,
      w: undefined,
   },
   canvas: undefined,
   palabra: undefined,
   letras: "QWERTYUIOPASDFGHJKLÑZXCVBNM",
   colorTecla: "#585858",
   colorMargen: "red",
   inicioX: 200,
   inicioY: 300,
   lon: 35,
   margen: 20,
   pistaText: "",

 
   teclas_array: new Array(),
   letras_array: new Array(),
   palabras_array: [`FRANCES`, `PIRAÑA`, `GATO`, `PACA`, `VENENO`, `TIBURON`, `GRIEGO`, `HACHAZO`, `PARQUEOESTE`],

   // init() {

      

   // },

   
   aciertos: 0,
   errores: 0,


   Tecla(x, y, ancho, alto, letra) {
      this.x = x;
      this.y = y;
      this.ancho = ancho;
      this.alto = alto;
      this.letra = letra;
      this.dibuja = dibujaTecla();
   },

   Letra(x, y, ancho, alto, letra) {
      this.x = x;
      this.y = y;
      this.ancho = ancho;
      this.alto = alto;
      this.letra = letra;
      this.dibuja = dibujaCajaLetra();
      this.dibujaLetra = dibujaLetraLetra();
   },

   dibujaTecla() {
      ctx.fillStyle = colorTecla;
      ctx.strokeStyle = colorMargen;
      ctx.fillRect(this.x, this.y, this.ancho, this.alto);
      ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

      ctx.fillStyle = "white";
      ctx.font = "bold 20px courier";
      ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto / 2 + 5);
   },

   dibujaLetraLetra() {
      var w = this.ancho;
      var h = this.alto;
      ctx.fillStyle = "black";
      ctx.font = "bold 40px Courier";
      ctx.fillText(this.letra, this.x + w / 2 - 12, this.y + h / 2 + 14);
   },
   dibujaCajaLetra() {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.fillRect(this.x, this.y, this.ancho, this.alto);
      ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
   },



   // pistaFunction(palabra) {
   //    let pista = ""; 
   //    switch (palabra) {  
   //       case 'LEON':   
   //          pista = "Ruge y es fuerte";
   //          break;     
   //       case 'CABALLO':
   //          pista = "Hay de tierra y hay de mar";
   //          break;
   //       case 'PERRO':
   //          pista = "El mejor amigo del hombre";
   //          break;
   //       case 'GATO':
   //          pista = "Son tiernos pero arañan";
   //          break;
   //       default:  
   //          pista = "No hay pista aun xP";
   //    }
   //    
   //    ctx.fillStyle = "black";  
   //    ctx.font = "bold 20px Courier";  
   //    ctx.fillText(pista, 10, 15); 
   // }



   teclado() {
      let ren = 0;
      let col = 0;
      let letra = "";
      let miLetra;
      let x = this.inicioX;
      let y = this.inicioY;
      for (let i = 0; i < this.letras.length; i++) {
         letra = letras.substr(i, 1);
         miLetra = new Tecla(x, y, lon, lon, letra);
         miLetra.dibuja();
         teclas_array.push(miLetra);
         x += lon + margen;
         col++;
         if (col == 10) {
            col = 0;
            ren++;
            if (ren == 2) {
               x = 280;
            } else {
               x = this.inicioX;
            }
         }
         y = this.inicioY + ren * 50;
      }
   },


   // /* aqui obtenemos nuestra palabra aleatoriamente y la dividimos en letras */
   pintaPalabra() {
      let p = Math.floor(Math.random() * palabras_array.length);
      palabra = palabras_array[p];

      pistaFunction(palabra);

      let w = canvas.width;
      let len = palabra.length;
      let ren = 0;
      let col = 0;
      let y = 230;
      let lon = 50;
      let x = (w - (lon + margen) * len) / 2;
      for (var i = 0; i < palabra.length; i++) {
         letra = palabra.substr(i, 1);
         miLetra = new Letra(x, y, lon, lon, letra);
         miLetra.dibuja();
         letras_array.push(miLetra);
         x += lon + margen;
      }
   },


   horca(errores) {
      let imagen = new Image();
      imagen.src = "imagenes/ahorcado" + errores + ".png";
      imagen.onload = function () {
         ctx.drawImage(imagen, 390, 0, 230, 230);
      }
 
   },

   ajusta(xx, yy) {
      let posCanvas = canvas.getBoundingClientRect();
      let x = xx - posCanvas.left;
      let y = yy - posCanvas.top;
      return { x: x, y: y }
   },

   selecciona(e) {
      let pos = ajusta(e.clientX, e.clientY);
      let x = pos.x;
      let y = pos.y;
      let tecla;
      let bandera = false;
      for (var i = 0; i < teclas_array.length; i++) {
         tecla = teclas_array[i];
         if (tecla.x > 0) {
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)) {
               break;
            }
         }
      }
      if (i < teclas_array.length) {
         for (var i = 0; i < palabra.length; i++) {
            letra = palabra.substr(i, 1);
            if (letra == tecla.letra) { 
               caja = letras_array[i];
               caja.dibujaLetra();
               aciertos++;
               bandera = true;
            }
         }
         if (bandera == false) { 
            errores++;
            horca(errores);
            if (errores == 5) gameOver(errores);
         }
       
         ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
         tecla.x - 1;

         if (aciertos == palabra.length) gameOver(errores);
      }
   },

   gameOver(errores) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";

      ctx.font = "bold 50px Courier";
      if (errores < 5) {
         ctx.fillText("Muy bien, la palabra es: ", 110, 280);
      } else {
         ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
      }

      ctx.font = "bold 80px Courier";
      lon = (canvas.width - (palabra.length * 48)) / 2;
      ctx.fillText(palabra, lon, 380);
      horca(errores);
   }
}
