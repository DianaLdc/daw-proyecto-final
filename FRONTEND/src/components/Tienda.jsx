import React, { useState } from 'react';
import './Tienda.css';

// Productos estáticos listos para mostrar
const PRODUCTOS_MOCK = [
  {
    id: 1,
    nombre: "Alimento Premium Perros Adultos",
    precio: "S/. 85.00",
    descripcion: "Bolsa de 3kg con nutrientes esenciales para el cuidado de tu mascota.",
    imagen: "https://oechsle.vteximg.com.br/arquivos/ids/1210986-1000-1000/image-715bb9c641a84b3483d1b6fe7a20f9ec.jpg?v=637494291737630000",
    categoria: "alimentos"
  },
  {
    id: 2,
    nombre: "Juguete Cuerda Dental",
    precio: "S/. 15.00",
    descripcion: "Ayuda a limpiar los dientes de tu perro mientras juega.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    categoria: "juguetes"
  },
  {
    id: 3,
    nombre: "Shampoo Hipoalergénico Mascotas",
    precio: "S/. 28.00",
    descripcion: "Fórmula suave ideal para pieles sensibles y todo tipo de pelaje.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rbZHhmmffdGDXk_HurVjn0rg7kQK5zhr8IHOYEo1ePJpaVlVU3f6pAAA&s=10",
    categoria: "higiene"
  },
  {
    id: 4,
    nombre: "Rascador para Gatos de 3 Niveles",
    precio: "S/. 120.00",
    descripcion: "Con postes de sisal para que tus gatos jueguen y afilen sus uñas.",
    imagen: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&q=80",
    categoria: "juguetes"
  },
  {
    id: 5,
    nombre: "Correa Extensible Premium",
    precio: "S/. 45.00",
    descripcion: "Correa extensible de 5m con manija ergonómica para paseos cómodos.",
    imagen: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=500&q=80",
    categoria: "accesorios"
  },
  {
    id: 6,
    nombre: "Vitaminas Masticables Perros",
    precio: "S/. 35.00",
    descripcion: "Suplemento vitamínico completo con sabor a carne.",
    imagen: "https://images.unsplash.com/photo-1585518419759-2028e91e4fca?w=500&q=80",
    categoria: "suplementos"
  }
];

const CATEGORIAS = [
  { id: 'todos', label: 'Todos' },
  { id: 'alimentos', label: 'Alimentos' },
  { id: 'juguetes', label: 'Juguetes' },
  { id: 'higiene', label: 'Higiene' },
  { id: 'accesorios', label: 'Accesorios' },
  { id: 'suplementos', label: 'Suplementos' }
];

export default function Tienda() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  // Filtrar productos según categoría
  const productosFiltrados = categoriaActiva === 'todos' 
    ? PRODUCTOS_MOCK 
    : PRODUCTOS_MOCK.filter(p => p.categoria === categoriaActiva);

  // Mapeo de categorías a colores
  const obtenerColorCategoria = (categoria) => {
    const colores = {
      alimentos: '#f59e0b',
      juguetes: '#ec4899',
      higiene: '#06b6d4',
      accesorios: '#8b5cf6',
      suplementos: '#ef4444'
    };
    return colores[categoria] || '#10b981';
  };

  // SVG para icono de carrito
  const IconoCarrito = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1h7.586a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM5 16a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  );

  return (
    <div className="tienda-container">
      {/* Header */}
      <div className="tienda-header">
        <h1>🛍️ Tienda Virtual Veterinaria</h1>
        <p>Productos de calidad para el cuidado de tus mascotas</p>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        {CATEGORIAS.map(categoria => (
          <button
            key={categoria.id}
            className={`filtro-btn ${categoriaActiva === categoria.id ? 'activo' : ''}`}
            onClick={() => setCategoriaActiva(categoria.id)}
          >
            {categoria.label}
          </button>
        ))}
      </div>

      {/* Grid de Productos */}
      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="producto-card">
            {/* Imagen con Badge */}
            <div style={{ position: 'relative' }}>
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                className="producto-imagen"
              />
              <div 
                className="categoria-badge"
                style={{ background: obtenerColorCategoria(producto.categoria) }}
              >
                {producto.categoria}
              </div>
            </div>

            {/* Contenido */}
            <div className="producto-contenido">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
            </div>

            {/* Footer con Precio y Botón */}
            <div className="producto-footer">
              <p className="producto-precio">{producto.precio}</p>
              <button className="btn-detalle">
                <IconoCarrito />
                Ver detalle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay productos */}
      {productosFiltrados.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem 1rem',
          color: '#6b7280',
          fontSize: '1.1rem'
        }}>
          <p>No hay productos en esta categoría.</p>
        </div>
      )}
    </div>
  );
}