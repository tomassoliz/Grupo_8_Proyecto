const $ = id => document.getElementById(id);
const baseURL = "https://apis.datos.gob.ar/georef/api"


window.onload = async function(e){

    $('name').addEventListener('blur', function(e){

        switch (true) {
            case !this.value.trim():
                $('msgError-name').innerHTML = "El nombre es obligatorio!"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length < 2:
                $('msgError-name').innerHTML = "Mínimo dos letras";
                this.classList.add('is-invalid')
                break
            case !/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(this.value.trim()):
                $('msgError-name').innerHTML = "Solo se permiten letras";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-name').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    });

    

    $('surname').addEventListener('blur', function(e){

        switch (true) {
            case !this.value.trim():
                $('msgError-surname').innerHTML = "El apellido es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length < 2:
                $('msgError-surname').innerHTML = "Mínimo dos letras";
                this.classList.add('is-invalid')
                break
            case !/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(this.value.trim()):
                $('msgError-surname').innerHTML = "Solo se permiten letras";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-surname').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    });

    $('email').addEventListener('focus', function(e){
        $('msgError-email').innerHTML = null
        this.classList.remove('is-invalid');
        this.classList.remove('is-valid')
    })
    
    $('email').addEventListener('blur', function(e){
    
        switch (true) {
            case !this.value.trim():
                $('msgError-email').innerHTML = "El email es obligatorioo!"
                this.classList.add('is-invalid')
                break;
            case !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.value.trim()):
                $('msgError-email').innerHTML = "Formato inválido";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-email').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    })
    
    
    
    $('birthday').addEventListener('blur', function (e) {
        const birthday = moment(this.value);
        const minDate = moment().subtract(100, 'years');
        const currentDate = moment();

        switch (true) {

            case birthday.isBefore(minDate):
                $('msgError-birthday').innerHTML = "La fecha que seleccionaste es inválida";
                this.classList.add('is-invalid')
                break
            case birthday.isAfter(currentDate):
                $('msgError-birthday').innerHTML = "La fecha que seleccionaste es inválida, seleccioná una anterior";
                this.classList.add('is-invalid')
                break
            default:
                $('msgError-birthday').innerHTML = null;
                this.classList.add('is-valid')
                this.classList.remove('is-invalid')
                break;
        }
    })

      try {
        // respuesta pedido por fetch, que recibe una url, ya agregamos las provincias
        const response = await fetch(`${baseURL}/provincias`);
        // tiene una espera para parsearlo
        const result = await response.json();
        // sort ordena ante de recorrerla
        result.provincias.sort((a, b) => a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? - 1 : 0).forEach(({ nombre }) => {
            // tomamos el option y le agregamos lo lo que recorre
            $('province').innerHTML += `<option value="${nombre}">${nombre}</option>`
        });


    } catch (error) {
        console.error(error);
    }
    // cuando cambie "province" usamos change
    $('province').addEventListener('change', async function (e) {
        $('city').disabled = true

        try {
            // el value es del select de arriba por eso tiene el nombre
            const response = await fetch(`${baseURL}/localidades?provincia=${this.value}&max=1000`);
            const result = await response.json();

            // cuando me responda
            if (result) {
                $('city').disabled = false
                $('city').innerHTML = `<option value="">Seleccione...</option>`

                result.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre)).forEach(({ nombre }) => {
                    $('city').innerHTML += `<option value="${nombre}">${nombre}</option>`
                })
            }

        } catch (error) {
            console.error(error);

        }
    });


    
    $('form-Profile').addEventListener('submit', function(event) {
        event.preventDefault();

        const elementsForm = this.elements;
        let error = false;

        for (let i = 0; i < 3; i++) {
            
            if(!elementsForm[i].value.trim()){
                error = true;
                $('msgError-empty').innerHTML = "El formulario tiene errores, volvé a intentarlo"
            }

        }

        !error && this.submit()
    })
  

}