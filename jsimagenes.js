$(document).ready(function(){
        function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

//Función de ayuda: reúne los datos a exportar en un solo objeto
function obtenerDatos() {
    return {
        picture_url: document.getElementById('picture_url').value,
        picture_title: document.getElementById('picture_title').value,
    };
};

//Función de ayuda: "escapa" las entidades XML necesarias
//para los valores (y atributos) del archivo XML
function escaparXML(cadena) {
    if (typeof cadena !== 'string') {
        return '';
    };
    cadena = cadena.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;');
    return "<![CDATA["+cadena+"]]>";
};


//Genera un objeto Blob con los datos en un archivo XML
function generarXml(datos) {
    var texto = [];
    //texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
    //texto.push('<trovit>\n');
    texto.push('\t\t\t<picture>\n');
        texto.push('\t\t\t\t<picture_url>\n');
            texto.push('\t\t\t\t'+escaparXML(datos.picture_url)+'\n');
        texto.push('\t\t\t\t</picture_url>\n');
        texto.push('\t\t\t\t<picture_title>');
            texto.push(escaparXML(datos.picture_title));
        texto.push('</picture_title>\n');
    texto.push('\t\t\t</picture>')
    //texto.push('</trovit>');
    //No olvidemos especificar el tipo MIME correcto :)
    return new Blob(texto, {
        type: 'text/plain'
    });
};

document.getElementById('btn2').addEventListener('click', function () {
    var datos = obtenerDatos();
    descargarArchivo(generarXml(datos), 'archivo.txt');
}, false);

    
});