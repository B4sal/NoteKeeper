const btnAgregar = document.getElementById('add');

// Cargar notas desde la base de datos al cargar la página
cargarNotasDesdeBaseDeDatos();

btnAgregar.addEventListener('click', () => agregarNuevaNota());

function agregarNuevaNota(data = { id: null, titulo: '', descripcion: '', autor: '', date: '' }) {
  const nota = document.createElement('div');
  nota.classList.add('note');

  nota.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="field">
      <label for="titulo">Título</label>
      <input type="text" id="titulo" value="${data.titulo}" placeholder="Escribe un título...">
    </div>
    <div class="field">
      <label for="descripcion">Descripción</label>
      <textarea id="descripcion" placeholder="Escribe una descripción...">${data.descripcion}</textarea>
    </div>
    <div class="field">
      <label for="autor">Autor</label>
      <input type="text" id="autor" value="${data.autor}" placeholder="Escribe el autor...">
    </div>
    <div class="field">
      <label for="date">Fecha</label>
      <input type="date" id="date" value="${data.date}">
    </div>
  `;

  const btnEliminar = nota.querySelector('.delete');
  const btnEditar = nota.querySelector('.edit');

  const campos = {
    titulo: nota.querySelector('#titulo'),
    descripcion: nota.querySelector('#descripcion'),
    autor: nota.querySelector('#autor'),
    date: nota.querySelector('#date'),
  };

  btnEliminar.addEventListener('click', () => {
    nota.remove();
    actualizarLocalStorage();
    if (data.id) {
      eliminarNotaDeBaseDeDatos(data.id);
    }
  });

  btnEditar.addEventListener('click', () => {
    const estaEditando = nota.classList.toggle('editing');
    Object.values(campos).forEach(campo => {
      campo.disabled = !estaEditando;
    });
    if (!estaEditando) {
      actualizarLocalStorage();
      guardarNotaEnBaseDeDatos({
        id: data.id,
        titulo: campos.titulo.value,
        descripcion: campos.descripcion.value,
        autor: campos.autor.value,
        date: campos.date.value,
      });
    }
  });

  Object.values(campos).forEach(campo => {
    campo.addEventListener('input', actualizarLocalStorage);
  });

  document.body.appendChild(nota);
  if (!data.titulo && !data.descripcion && !data.autor && !data.date) {
    nota.classList.add('editing');
  }
}

function actualizarLocalStorage() {
  const notas = [...document.querySelectorAll('.note')].map(nota => ({
    titulo: nota.querySelector('#titulo').value,
    descripcion: nota.querySelector('#descripcion').value,
    autor: nota.querySelector('#autor').value,
    date: nota.querySelector('#date').value,
  }));

  localStorage.setItem('notes', JSON.stringify(notas));
}

// Funciones relacionadas con CRUD

function cargarNotasDesdeBaseDeDatos() {
  fetch('http://localhost:8000/api/notes')
    .then(response => response.json())
    .then(data => {
      data.forEach(nota => agregarNuevaNota(nota));
    })
    .catch(error => {
      console.error('Error cargando notas:', error);
    });
}

function guardarNotaEnBaseDeDatos(nota) {
  const url = nota.id ? `http://localhost:8000/api/notes/${nota.id}` : 'http://localhost:8000/api/notes';
  const metodo = nota.id ? 'PUT' : 'POST';

  fetch(url, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nota),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Nota guardada:', data);
  })
  .catch(error => {
    console.error('Error guardando nota:', error);
  });
}

function eliminarNotaDeBaseDeDatos(id) {
  fetch(`http://localhost:8000/api/notes/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Nota eliminada:', data);
  })
  .catch(error => {
    console.error('Error eliminando nota:', error);
  });
}
