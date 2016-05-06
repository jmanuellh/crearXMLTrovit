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
        id: document.getElementById('id').value,
        url: document.getElementById('url').value,
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        content: document.getElementById('content').value,
        price: document.getElementById('price').value,
        property_type: document.getElementById('property_type').value,
        address: document.getElementById('address').value,
        city_area: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postcode: document.getElementById('postcode').value,
        region: document.getElementById('region').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        orientation: document.getElementById('orientation').value,
        agency: document.getElementById('agency').value,
        floor_area: document.getElementById('floor_area').value,
        rooms: document.getElementById('rooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        parking: document.getElementById('parking').value,
        contact_name: document.getElementById('contact_name').value,
        contact_email: document.getElementById('contact_email').value,
        contact_telephone: document.getElementById('contact_telephone').value
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
    texto.push('\t<ad>\n');
        texto.push('\t\t<id>');
            texto.push(escaparXML(datos.id));
        texto.push('</id>\n');
        texto.push('\t\t<url>');
            texto.push(escaparXML(datos.url));
        texto.push('</url>\n');
        texto.push('\t\t<title>');
            texto.push(escaparXML(datos.title));
        texto.push('</title>\n');
        texto.push('\t\t<type>');
            texto.push(escaparXML(datos.type));
        texto.push('</type>\n');
        texto.push('\t\t<content>');
            texto.push(escaparXML(datos.content));
        texto.push('</content>\n');
        texto.push('\t\t<price>');
            texto.push(escaparXML(datos.price));
        texto.push('</price>\n');
        texto.push('\t\t<property_type>');
            texto.push(escaparXML(datos.property_type));
        texto.push('</property_type>\n');
        texto.push('\t\t<address>');
            texto.push(escaparXML(datos.address));
        texto.push('</address>\n');
        texto.push('\t\t<city_area>');
            texto.push(escaparXML(datos.city_area));
        texto.push('</city_area>\n');
        texto.push('\t\t<city>');
            texto.push(escaparXML(datos.city));
        texto.push('</city>\n');
        texto.push('\t\t<postcode>');
            texto.push(escaparXML(datos.postcode));
        texto.push('</postcode>\n');
        texto.push('\t\t<region>');
            texto.push(escaparXML(datos.region));
        texto.push('</region>\n');
        texto.push('\t\t<latitude>');
            texto.push(escaparXML(datos.latitude));
        texto.push('</latitude>\n');
        texto.push('\t\t<longitude>');
            texto.push(escaparXML(datos.longitude));
        texto.push('</longitude>\n');
        texto.push('\t\t<orientation>');
            texto.push(escaparXML(datos.orientation));
        texto.push('</orientation>\n');
        texto.push('\t\t<agency>');
            texto.push(escaparXML(datos.agency));
        texto.push('</agency>\n');
        texto.push('\t\t<floor_area>');
            texto.push(escaparXML(datos.floor_area));
        texto.push('</floor_area>\n');
        texto.push('\t\t<rooms>');
            texto.push(escaparXML(datos.rooms));
        texto.push('</rooms>\n');
        texto.push('\t\t<bathrooms>');
            texto.push(escaparXML(datos.bathrooms));
        texto.push('</bathrooms>\n');
        texto.push('\t\t<pictures>');
            texto.push('\n\t\n');
        texto.push('\t\t</pictures>\n')
        texto.push('\t\t<parking>');
            texto.push(escaparXML(datos.parking));
        texto.push('</parking>\n');
        texto.push('\t\t<contact_name>');
            texto.push(escaparXML(datos.contact_name));
        texto.push('</contact_name>\n');
        texto.push('\t\t<contact_email>');
            texto.push(escaparXML(datos.contact_email));
        texto.push('</contact_email>\n');
        texto.push('\t\t<contact_telephone>');
            texto.push(escaparXML(datos.contact_telephone));
        texto.push('</contact_telephone>\n');
    texto.push('\t</ad>\n')
    //texto.push('</trovit>');
    //No olvidemos especificar el tipo MIME correcto :)
    return new Blob(texto, {
        type: 'application/xml'
    });
};

document.getElementById('btn1').addEventListener('click', function () {
    var datos = obtenerDatos();
    descargarArchivo(generarXml(datos), 'archivo.xml');
}, false);

    
});