import React from 'react';

// Productos estáticos listos para mostrar
const PRODUCTOS_MOCK = [
  {
    id: 1,
    nombre: "Alimento Premium Perros Adultos",
    precio: "S/. 85.00",
    descripcion: "Bolsa de 3kg con nutrientes esenciales para el cuidado de tu mascota.",
    imagen: "https://oechsle.vteximg.com.br/arquivos/ids/1210986-1000-1000/image-715bb9c641a84b3483d1b6fe7a20f9ec.jpg?v=637494291737630000"
  },
  {
    id: 2,
    nombre: "Juguete Cuerda Dental",
    precio: "S/. 15.00",
    descripcion: "Ayuda a limpiar los dientes de tu perro mientras juega.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80"
  },
  {
    id: 3,
    nombre: "Shampoo Hipoalergénico Mascotas",
    precio: "S/. 28.00",
    descripcion: "Fórmula suave ideal para pieles sensibles y todo tipo de pelaje.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rbZHhmmffdGDXk_HurVjn0rg7kQK5zhr8IHOYEo1ePJpaVlVU3f6pAAA&s=10"
  },
  {
    id: 4,
    nombre: "Rascador para Gatos de 3 Niveles",
    precio: "S/. 120.00",
    descripcion: "Con postes de sisal para que tus gatos jueguen y afilen sus uñas.",
    imagen: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&q=80"
  }
];

export default function Tienda() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '2rem' }}>
        Tienda Virtual Veterinaria
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {PRODUCTOS_MOCK.map((producto) => (
          <div key={producto.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff'
          }}>
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#333' }}>{producto.nombre}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', flexGrow: 1 }}>{producto.descripcion}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#27ae60' }}>{producto.precio}</span>
                <button style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Ver detalle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}