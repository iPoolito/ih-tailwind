import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { list } from 'purgecss/node_modules/postcss'
export default function Pool() {
  const [contacto, setContacto] = useState({
    nombre: '',
    empresa: ''
  })

  const [listaT, setListaT] = useState([])

  const [editMode, setEditMode] = useState(true)

  const [id, setId] = useState('')

  const handleInputs = ({ target: { name, value } }) => {
    // console.log(value)
    // console.log(name)
    setContacto({
      ...contacto,
      id: nanoid(),
      [name]: value
    })
  }

  const createContact = event => {
    event.preventDefault()

    setListaT([...listaT, contacto])
  }

  const borrarContact = (event, id) => {
    event.preventDefault()
    const filterArr = listaT.filter(el => {
      return el.id !== id
    })
    setListaT([...filterArr])
  }

  const editContact = (event, el) => {
    event.preventDefault()
    setEditMode(!editMode)
    setContacto({
      id: el.id,
      nombre: el.nombre,
      empresa: el.empresa
    })
    setId(el.id)
  }

  return (
    <div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <label for="name" class="block text-xs font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="name"
            class="block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Jane Doe"
            onChange={event => {
              handleInputs(event)
            }}
          />
        </div>
        <div class="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <label for="job-title" class="block w-full text-xs font-medium text-gray-700">
            Empresa
          </label>
          <input
            type="text"
            name="empresa"
            id="job-title"
            class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Head of Tomfoolery"
            onChange={event => {
              handleInputs(event)
            }}
          />
        </div>

        {editMode ? (
          <>
            <button
              type="button"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={event => {
                createContact(event)
              }}
            >
              Crear Contacto
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={event => {
                createContact(event)
              }}
            >
              Editar
            </button>
          </>
        )}
      </div>
      {listaT.length == 0 ? (
        <p> No tienes ningun contacto </p>
      ) : (
        <div>
          {listaT.map(el => {
            return (
              <div key={el.id}>
                <h3> {el.nombre}</h3>
                <h3> {el.empresa}</h3>

                <button
                  type="button"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={event => {
                    borrarContact(event, el.id)
                  }}
                >
                  Borrar
                </button>

                <button
                  type="button"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={event => {
                    editContact(event, el)
                  }}
                >
                  Editar
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
