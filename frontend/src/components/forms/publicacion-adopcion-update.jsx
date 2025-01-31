import React, { useState, useEffect } from "react";
import SuccessModalReload from "../SuccessModalReload.jsx";
import ErrorModal from "../ErrorModal";
import ConfirmationModal from "../ConfirmationModal";
import "../../styles/modal-publicacion-update.css";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";

function PublicacionAdopcionUpdate({
  isEditarOpen,
  cerrarEditar,
  publicacionEditar,
}) {
  const [titulo, set_titulo] = useState(publicacionEditar.titulo);
  const [profileMascotaPublicacion, set_profile_mascota_publicacion] = useState(
    publicacionEditar.mascota.imagen
  );
  const [descripcion, set_descripcion] = useState(
    publicacionEditar.descripcion
  );
  const [direccionDir, set_direccionDir] = useState(
    publicacionEditar.detalle_direccion.direccion
  );
  const [localidad, set_localidad] = useState(
    publicacionEditar.detalle_direccion.id_localidad
  );
  const [aptoNinos, set_aptoNinos] = useState(
    publicacionEditar.detalle_mascota.apto_ninos
  );

  const [aptoRuido, set_aptoRuido] = useState(
    publicacionEditar.detalle_mascota.apto_ruido
  );
  const [espacio, set_espacio] = useState(
    publicacionEditar.detalle_mascota.espacio
  );
  const [apto_otras_mascotas, set_apto_otras_mascotas] = useState(
    publicacionEditar.detalle_mascota.apto_otras_mascotas
  );
  const [desparasitado, set_desparasitado] = useState(
    publicacionEditar.detalle_mascota.desparasitado
  );
  const [vacunado, set_vacunado] = useState(
    publicacionEditar.detalle_mascota.vacunado
  );
  const [esterilizado, set_esterilizado] = useState(
    publicacionEditar.detalle_mascota.esterilizado
  );

  return (
    isEditarOpen && (
      <div className="modal-editar-publicacion">
        <div className="modal-editar-publicacion-content">
          <span className="close" onClick={cerrarEditar}>
            &times;
          </span>
          <form>
            <h2>Actualiza la publicación</h2>
            <div className="photo-container-publicacion-update">
              <img
                src={profileMascotaPublicacion}
                id="mascota-img"
                alt="Foto-Mascota"
                className="photo-container-publicacion-update-img"
              ></img>
            </div>
            <div className="form-group-detalles_mascota">
              <h3>{publicacionEditar.mascota.nombre}</h3>
              <div className="tabla-container">
                {/* <p>
                  Sexo:{" "}
                  {publicacionEditar.mascota.sexo === "H" ? "Hembra" : "Macho"}
                </p>
                <p>Tipo de mascota: {publicacionEditar.mascota.tipo}</p>
                <p>Raza de la mascota: {publicacionEditar.mascota.raza}</p>
                <p>Edad: {publicacionEditar.mascota.edad} año(s)</p>
                 */}

                <table className="tabla-detalles-mascota">
                  <tbody>
                    <tr>
                      <td className="tabla-celda-label">Sexo:</td>
                      <td className="tabla-celda-valor">
                        {publicacionEditar.mascota.sexo === "H"
                          ? "Hembra"
                          : "Macho"}
                      </td>
                    </tr>
                    <tr>
                      <td className="tabla-celda-label">Tipo de mascota:</td>
                      <td className="tabla-celda-valor">{publicacionEditar.mascota.tipo}</td>
                    </tr>
                    <tr>
                      <td className="tabla-celda-label">Raza de la mascota:</td>
                      <td className="tabla-celda-valor">{publicacionEditar.mascota.raza}</td>
                    </tr>
                    <tr>
                      <td className="tabla-celda-label">Edad:</td>
                      <td className="tabla-celda-valor">{publicacionEditar.mascota.edad} año(s)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="form-group">
              <label className="label-update-titulo">
                Titulo de la publicación
              </label>
              <div className="tooltip-update-publicacion">
                <input
                  type="text"
                  className="input-update-publicacion"
                  placeholder="Ingrese el título de la publicación"
                  name="titulo"
                  value={titulo}
                  onChange={(e) => set_titulo(e.target.value)}
                />
                <span className="tooltip-update-publicacion-text-m">
                  Este campo es obligatorio. Ingresa un titulo descriptivo para
                  la publicación de la adopción.
                </span>
              </div>
            </div>
            <div className="form-group">
              <label className="label-update-descripcion">Descripción</label>
              <div className="tooltip-update-publicacion">
                <textarea
                  className="textarea-update-publicacion"
                  placeholder="Ingrese la descripción de la publicación"
                  name="descripcion"
                  value={descripcion}
                  onChange={(e) => set_descripcion(e.target.value)}
                />
                <span className="tooltip-update-publicacion-text-s">
                  Este campo es obligatorio. Ingresa un descripción para la
                  publicación de la adopción.
                </span>
              </div>
            </div>
            <div className="form-group">
              <label className="label-update-localidad">Localidad</label>
              <div className="tooltip-update-publicacion">
                <select
                  id="input-publicacion-localidad"
                  className="input-update-publicacion-localidad"
                  name="localidad"
                  value={localidad}
                  onChange={(e) => set_localidad(e.target.value)}
                >
                  <option defaultValue>Selecciona...</option>
                  <option value={1}>Usaquén</option>
                  <option value={2}>Chapinero</option>
                  <option value={3}>Santa Fe</option>
                  <option value={4}>San Cristóbal</option>
                  <option value={5}>Usme</option>
                  <option value={6}>Tunjuelito</option>
                  <option value={7}>Bosa</option>
                  <option value={8}>Kennedy</option>
                  <option value={9}>Fontibón</option>
                  <option value={10}>Engativá</option>
                  <option value={11}>Suba</option>
                  <option value={12}>Barrios Unidos</option>
                  <option value={13}>Teusaquillo</option>
                  <option value={14}>Los Mártires</option>
                  <option value={15}>Antonio Nariño</option>
                  <option value={16}>Puente Aranda</option>
                  <option value={17}>La Candelaria</option>
                  <option value={18}>Rafael Uribe Uribe</option>
                  <option value={19}>Ciudad Bolívar</option>
                  <option value={20}>Sumapaz</option>
                </select>
                <span className="tooltip-update-publicacion-text-m">
                  Este campo es obligatorio. Ingresa la localidad en la que se
                  ubica la mascota.
                </span>
              </div>
            </div>
            <div className="form-group">
              <label className="label-update-direcciondir">Dirección</label>
              <div className="tooltip-update-publicacion">
                <input
                  type="text"
                  className="input-update-publicacion"
                  placeholder="Ingrese la dirección donde se ubica la mascota"
                  name="direccionDir"
                  value={direccionDir}
                  onChange={(e) => set_direccionDir(e.target.value)}
                />
                <span className="tooltip-update-publicacion-text-m">
                  Este campo es obligatorio. Ingresa la dirección donde se ubica
                  la mascota.
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="label-update-publicacion-detalles">
                Detalles de la mascota
              </label>
              <div className="input-detalles-update-container">
                <label className="label-update-publicacion-ninos">
                  Apto para niños:
                  <div className="tooltip-creacion-adopcion">
                    <select
                      className="input-update-publicacion"
                      name="apto_ninos"
                      value={aptoNinos}
                      onChange={(e) => set_aptoNinos(e.target.value)}
                      required
                    >
                      <option defaultValue>Selecciona...</option>
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </label>
                <label className="label-update-publicacion-ruido">
                  Apto con ruido:
                  <div className="tooltip-creacion-adopcion">
                    <select
                      className="input-update-publicacion"
                      name="apto_ruido"
                      value={aptoRuido}
                      onChange={(e) => set_aptoRuido(e.target.value)}
                      required
                    >
                      <option defaultValue>Selecciona...</option>
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </label>
                <label className="label-update-publicacion-vacuna">
                  Vacunado:
                  <div className="tooltip-creacion-adopcion">
                    <select
                      className="input-update-publicacion"
                      name="vacunado"
                      value={vacunado}
                      onChange={(e) => set_vacunado(e.target.value)}
                      required
                    >
                      <option defaultValue>Selecciona...</option>
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </label>
                <label className="label-update-publicacion-espacio">
                  Tipo de espacio:
                  <div className="tooltip-creacion-adopcion">
                    <select
                      className="input-update-publicacion"
                      name="espacio"
                      value={espacio}
                      onChange={(e) => set_espacio(e.target.value)}
                      required
                    >
                      <option defaultValue>Selecciona...</option>
                      <option value={"P"}>Pequeño</option>
                      <option value={"G"}>Grande</option>
                    </select>
                  </div>
                </label>
                <label className="label-update-publicacion-desparasitado">
                  Desparasitado:
                  <div className="tooltip-creacion-adopcion">
                    <select
                      className="input-update-publicacion"
                      name="desparasitado"
                      value={desparasitado}
                      onChange={(e) => set_desparasitado(e.target.value)}
                      required
                    >
                      <option defaultValue>Selecciona...</option>
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </label>
                <label className="label-update-publicacion-esterilizado">
                  Esterilizado:
                  <div className="tooltip-creacion-adopcion">
                    <select
                      className="input-update-publicacion"
                      name="esterilizado"
                      value={esterilizado}
                      onChange={(e) => set_esterilizado(e.target.value)}
                      required
                    >
                      <option defaultValue>Selecciona...</option>
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </label>
                <label className="label-update-publicacion-convive">
                  Convive con mascotas:
                  <div className="tooltip-creacion-adopcion">
                    <select
                      className="input-update-publicacion"
                      name="apto_otras_mascotas"
                      value={apto_otras_mascotas}
                      onChange={(e) => set_apto_otras_mascotas(e.target.value)}
                      required
                    >
                      <option defaultValue>Selecciona...</option>
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default PublicacionAdopcionUpdate;
