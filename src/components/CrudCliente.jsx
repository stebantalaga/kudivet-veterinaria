import React from 'react'
import '../App.css'
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
  } from "reactstrap";


const data = [
    {id: 1, nombre: "Coco", animal: "Gato", raza: "Angora", edad: 2, dueño: "Carla Torres"},
    {id: 2, nombre: "Tama", animal: "Perro", raza: "Affenpinscher", edad: 8, dueño: "Daniel Herrera"},
    {id: 3, nombre: "Luna", animal: "Gato", raza: "Egipcio", edad: 4, dueño: "Milena Ortiz"},
    {id: 4, nombre: "Coraline", animal: "Gato", raza: "Persa", edad: 2, dueño: "Juan Perlaza"},
    {id: 5, nombre: "Zeus", animal: "Perro", raza: "Basenji", edad: 6, dueño: "David Estupiñan"}
]


class CrudCliente extends React.Component {
    state={
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
          id: '',
          nombre: '',
          raza: '',
          dueño: ''
        }
    };
    
    /* Función para cerrar el modal de actualización de datos */
    mostrarModalActualizar = (dato) => {
        this.setState({
        form: dato,
        modalActualizar: true,
        });
    };

    /* Función para cerrar el modal de actualización de datos */
    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    /* Función para abrir el modal de añadir datos */
    mostrarModalInsertar = () => {
        this.setState({
        modalInsertar: true,
        });
    };

    /* Función para cerrar el modal de añadir mascota */
    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    /* Función que guarda la edición de datos */
    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
        if (dato.id == registro.id) {
            arreglo[contador].nombre = dato.nombre;
            arreglo[contador].animal = dato.animal;
            arreglo[contador].raza = dato.raza;
            arreglo[contador].edad = dato.edad;
            arreglo[contador].dueño = dato.dueño;
        }
        contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    /* Función que elimina los datos de un registro */
    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar la mascota "+dato.nombre);
        if (opcion == true) {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id == registro.id) {
            arreglo.splice(contador, 1);
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
        }
    };

    /* Función que añade un registro a los datos */
    insertar= ()=>{
        var valorNuevo= {...this.state.form};
        valorNuevo.id=this.state.data.length+1;
        var lista= this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }

    handleChange = (e) => {
        this.setState({
        form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
        },
        });
    };

    /* UI que se renderiza al usuario */
    render() {
        return(
            <div>
                <div className='wrap-space-between'>
                    <h4>Gestionar clientes</h4>
                    <button className='btn btn-primary' onClick={()=>this.mostrarModalInsertar()}>Añadir mascota</button>
                </div>

                <br />

                <table className='table-main'>
                    <thead className='table-header'>
                        <tr className='table-row'>
                            <th className='table-item col-md-1'>Id</th>
                            <th className='table-item col-md-2'>Nombre</th>
                            <th className='table-item col-md-2'>Animal</th>
                            <th className='table-item col-md-2'>Raza</th>
                            <th className='table-item col-md-1'>Edad</th>
                            <th className='table-item col-md-2'>Dueño</th>
                            <th className='table-item col-md-2'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id} className='table-row'>
                                <td className='table-item col-md-1'>{dato.id}</td>
                                <td className='table-item col-md-2'>{dato.nombre}</td>
                                <td className='table-item col-md-2'>{dato.animal}</td>
                                <td className='table-item col-md-2'>{dato.raza}</td>
                                <td className='table-item col-md-1'>{dato.edad} años</td>
                                <td className='table-item col-md-2'>{dato.dueño}</td>
                                <td className='table-item col-md-2'>
                                    <button className='btn btn-info btn-sm' onClick={() => this.mostrarModalActualizar(dato)}>Editar</button>
                                    {"    "}
                                    <button className='btn btn-outline-danger btn-sm' onClick={()=> this.eliminar(dato)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para editar el registro de una mascota en la base de datos */}
                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar mascota</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                        <label>Id:</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={this.state.form.id}
                        />
                        </FormGroup>
                        
                        <FormGroup>
                        <label>Nombre:</label>
                        <input
                            className="form-control"
                            name="nombre"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.nombre}
                        />
                        </FormGroup>

                        <FormGroup>
                        <label>Tipo de mascota:</label>
                        <input
                            className="form-control"
                            name="animal"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.animal}
                        />
                        </FormGroup>
                        
                        <FormGroup>
                        <label>Raza:</label>
                        <input
                            className="form-control"
                            name="raza"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.raza}
                        />
                        </FormGroup>

                        <FormGroup>
                        <label>Edad (en años):</label>
                        <input
                            className="form-control"
                            name="edad"
                            type="number"
                            onChange={this.handleChange}
                            value={this.state.form.edad}
                        />
                        </FormGroup>

                        <FormGroup>
                        <label>Dueño:</label>
                        <input
                            className="form-control"
                            name="dueño"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.form.dueño}
                        />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
                        <Button color="outline-secondary" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>


                {/* Modal para agregar una nueva mascota a la base de datos */}
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Añadir mascota</h3></div>
                    </ModalHeader>
                    
                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={this.state.data.length+1}
                            />
                        </FormGroup>
                    
                        <FormGroup>
                            <label>Nombre:</label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Tipo de mascota:</label>
                            <input
                                className="form-control"
                                name="animal"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    
                        <FormGroup>
                            <label>Raza:</label>
                            <input
                                className="form-control"
                                name="raza"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Edad (en años):</label>
                            <input
                                className="form-control"
                                name="edad"
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Dueño:</label>
                            <input
                                className="form-control"
                                name="dueño"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
                        <Button color="outline-secondary" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                </div>
        )
    }
}

export default CrudCliente;