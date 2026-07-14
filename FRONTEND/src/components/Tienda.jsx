import React, { useState, useEffect } from 'react';
import './Tienda.css';

// Productos estáticos listos para mostrar
export const PRODUCTOS_MOCK = [
  // ALIMENTOS
  {
    id: 1,
    nombre: "Alimento Premium Perros Adultos",
    precio: "S/. 85.00",
    descripcion: "Bolsa de 3kg con nutrientes esenciales para el cuidado de tu mascota.",
    imagen: "https://oechsle.vteximg.com.br/arquivos/ids/1210986-1000-1000/image-715bb9c641a84b3483d1b6fe7a20f9ec.jpg?v=637494291737630000",
    categoria: "alimentos"
  },
  {
    id: 7,
    nombre: "Alimento Gatos Siete Años+",
    precio: "S/. 65.00",
    descripcion: "Fórmula especial para gatos mayores con probióticos y taurina.",
    imagen: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80",
    categoria: "alimentos"
  },
  {
    id: 8,
    nombre: "Comida Húmeda Pollo y Arroz",
    precio: "S/. 12.50",
    descripcion: "Latas de 400g con ingredientes naturales y sin conservantes.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVpyjyG1jI8B-yAgTnMwKGNh4ShLlKijl7sFfWim59bzEEaXSk-MulH9w&s=10",
    categoria: "alimentos"
  },
  {
    id: 9,
    nombre: "Alimento Cachorros Premium 1kg",
    precio: "S/. 42.00",
    descripcion: "Diseñado para cachorros con proteínas y calcio para crecimiento.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5XLH98-qLREJYGw9X0Ojg0r4QyHIKKmvD44IHfzsTh2moIa3H0bmTZzM&s=10",
    categoria: "alimentos"
  },
  {
    id: 10,
    nombre: "Snacks Dentales para Perros",
    precio: "S/. 18.00",
    descripcion: "Galletas que limpian dientes y refrescan aliento.",
    imagen: "https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw4dea5d9c/images/gnawlers-dental-pure-snack-de-higiene.jpg",
    categoria: "alimentos"
  },
  {
    id: 11,
    nombre: "Alimento Gluten Free Perros",
    precio: "S/. 95.00",
    descripcion: "Bolsa de 4kg sin gluten para perros con alergias.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    categoria: "alimentos"
  },
  
  // JUGUETES
  {
    id: 2,
    nombre: "Juguete Cuerda Dental",
    precio: "S/. 15.00",
    descripcion: "Ayuda a limpiar los dientes de tu perro mientras juega.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    categoria: "juguetes"
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
    id: 12,
    nombre: "Pelota Interactiva Sonora",
    precio: "S/. 22.00",
    descripcion: "Juguete que rebota y emite sonidos para entretener a tu perro.",
    imagen: "https://oechsle.vteximg.com.br/arquivos/ids/17759847-1000-1000/imageUrl_1.jpg?v=638507610513170000",
    categoria: "juguetes"
  },
  {
    id: 13,
    nombre: "Frisbee para Perros",
    precio: "S/. 19.00",
    descripcion: "Frisbee resistente y flotante para jugar en tierra o agua.",
    imagen: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80",
    categoria: "juguetes"
  },
  {
    id: 14,
    nombre: "Tubo de Peluche con Cascabel",
    precio: "S/. 25.00",
    descripcion: "Juguete de peluche suave con cascabel para gatos.",
    imagen: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&q=80",
    categoria: "juguetes"
  },
  {
    id: 15,
    nombre: "Kong Clásico Resistente",
    precio: "S/. 35.00",
    descripcion: "Juguete de goma indestructible que ayuda a limpiar dientes.",
    imagen: "https://vetpharmaperu.com/wp-content/uploads/2021/09/1.1.1.-Kong-Classic-6.jpg",
    categoria: "juguetes"
  },
  {
    id: 16,
    nombre: "Set Juguetes Variados 8 Pzas",
    precio: "S/. 40.00",
    descripcion: "Pack con 8 juguetes diferentes para mantener a tu mascota entretenida.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    categoria: "juguetes"
  },
  
  // HIGIENE
  {
    id: 3,
    nombre: "Shampoo Hipoalergénico Mascotas",
    precio: "S/. 28.00",
    descripcion: "Fórmula suave ideal para pieles sensibles y todo tipo de pelaje.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rbZHhmmffdGDXk_HurVjn0rg7kQK5zhr8IHOYEo1ePJpaVlVU3f6pAAA&s=10",
    categoria: "higiene"
  },
  {
    id: 17,
    nombre: "Acondicionador Pelaje Brillante",
    precio: "S/. 32.00",
    descripcion: "Acondicionador que deja el pelaje suave, brillante y manejable.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR28Y-HiMUtnbWbjDRvVPdX0vIJ7Ci-K-R6ARkvGM1yJVKJjtaAKgMIuaep&s=10",
    categoria: "higiene"
  },
  {
    id: 18,
    nombre: "Cepillo Desengrasante Dientes",
    precio: "S/. 15.00",
    descripcion: "Cepillo especial con crema dental para limpiar dientes.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    categoria: "higiene"
  },
  {
    id: 19,
    nombre: "Toallitas Húmedas Limpiadoras",
    precio: "S/. 12.00",
    descripcion: "Pack de 50 toallitas biodegradables para limpiar patas y hocico.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMfczBB05XNdpDurEF2vIJKWH-Su6Qm4V5-AXB8Eq2fX2YVIXu68IRnA0C&s=10",
    categoria: "higiene"
  },
  {
    id: 20,
    nombre: "Loción Limpiadora de Oídos",
    precio: "S/. 22.00",
    descripcion: "Solución suave para limpiar y prevenir infecciones de oído.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    categoria: "higiene"
  },
  {
    id: 21,
    nombre: "Cortaúñas Profesional",
    precio: "S/. 45.00",
    descripcion: "Cortaúñas de acero inoxidable con seguro y lima incluida.",
    imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/afa/afa51066/y/14.jpg",
    categoria: "higiene"
  },
  {
    id: 22,
    nombre: "Spray Desodorizante Mascotas",
    precio: "S/. 18.00",
    descripcion: "Spray neutralizador de olores con aroma natural.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMFiBjaWpxJ30O7QOBQrocrUJokoMIVBU8prJkjmYYUA&s=10",
    categoria: "higiene"
  },
  
  // ACCESORIOS
  {
    id: 5,
    nombre: "Correa Extensible Premium",
    precio: "S/. 45.00",
    descripcion: "Correa extensible de 5m con manija ergonómica para paseos cómodos.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-lpBz2ZBpUA0ip2ckTLkzgiJEo0cxkDXKUJUo0xPr5P46efY2lFUtgE&s=10",
    categoria: "accesorios"
  },
  {
    id: 23,
    nombre: "Collar Identificación Grabado",
    precio: "S/. 28.00",
    descripcion: "Collar de acero inoxidable con grabado personalizado del nombre.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    categoria: "accesorios"
  },
  {
    id: 24,
    nombre: "Arnés de Seguridad Ajustable",
    precio: "S/. 55.00",
    descripcion: "Arnés reforzado con cinturones reflectantes para mayor seguridad.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjEkR0ZiKvePFeNKczVKxdgk12zFBdCYmKTWVf2Prk-7-WaN40sZ-W_Y8&s=10",
    categoria: "accesorios"
  },
  {
    id: 25,
    nombre: "Cama Ortopédica Premium",
    precio: "S/. 180.00",
    descripcion: "Cama de espuma viscoelástica con funda lavable y antideslizante.",
    imagen: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&q=80",
    categoria: "accesorios"
  },
  {
    id: 26,
    nombre: "Comedero Automático con Temporizador",
    precio: "S/. 120.00",
    descripcion: "Comedero inteligente que dosifica alimento en horarios programados.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_83MFNvUixx4-ltHKmh-BShFLWz8CkZkW8q_0BSQIY2QhEC_uyCX5efk&s=10",
    categoria: "accesorios"
  },
  {
    id: 27,
    nombre: "Transportín Aéreo Homologado",
    precio: "S/. 95.00",
    descripcion: "Transportín certificado para viajes en avión con ventilación.",
    imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    categoria: "accesorios"
  },
  {
    id: 28,
    nombre: "Bebedero Automático con Filtro",
    precio: "S/. 65.00",
    descripcion: "Bebedero de circulación con filtro para agua fresca y limpia.",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_848794-MPE82278484530_022025-O.webp",
    categoria: "accesorios"
  },
  
  // SUPLEMENTOS
  {
    id: 6,
    nombre: "Vitaminas Masticables Perros",
    precio: "S/. 35.00",
    descripcion: "Suplemento vitamínico completo con sabor a carne.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdCi5hfQr77OIeXO8_bMgQesPkhv9Vx1t5ZRzW9uol8gGdS5kNr86GaAW-&s=10",
    categoria: "suplementos"
  },
  {
    id: 29,
    nombre: "Omega 3 para Pelaje Brillante",
    precio: "S/. 42.00",
    descripcion: "Suplemento de ácidos grasos para pelaje y piel saludables.",
    imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nor/nor51502/l/77.jpg",
    categoria: "suplementos"
  },
  {
    id: 30,
    nombre: "Glucosamina para Articulaciones",
    precio: "S/. 55.00",
    descripcion: "Suplemento para mantener articulaciones y huesos fuertes.",
    imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/jrw/jrw19021/y/69.jpg",
    categoria: "suplementos"
  },
  {
    id: 31,
    nombre: "Probióticos Digestivos",
    precio: "S/. 38.00",
    descripcion: "Probióticos para mejorar la digestión y la salud intestinal.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5dt_Tg92d2jciUVV8Yaies7mS55Y6IrpWKGFyzclsuO2coWUt4BBMIvD&s=10",
    categoria: "suplementos"
  },
  {
    id: 32,
    nombre: "Calcio y Fósforo Crecimiento",
    precio: "S/. 48.00",
    descripcion: "Suplemento mineral para fortalecer huesos en cachorros.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0e02cBQmu8NjtwZTdaA7iKjfDpNCvy3uQvIesl7VWqw&s=10",
    categoria: "suplementos"
  },
  {
    id: 33,
    nombre: "Vitamina C Inmunidad",
    precio: "S/. 32.00",
    descripcion: "Refuerza el sistema inmunológico contra enfermedades.",
    imagen: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&q=80",
    categoria: "suplementos"
  },
  {
    id: 34,
    nombre: "Taurina para Gatos",
    precio: "S/. 28.00",
    descripcion: "Aminoácido esencial para la salud cardiovascular de gatos.",
    imagen: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=500&q=80",
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
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [notificacion, setNotificacion] = useState(null);
  const [modalProducto, setModalProducto] = useState(null);

  // Agregar al carrito con notificación
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setNotificacion(`✓ ${producto.nombre} agregado al carrito`);
    
    setTimeout(() => setNotificacion(null), 3000);
  };

  // Filtrar productos según categoría y búsqueda
  let productosFiltrados = categoriaActiva === 'todos' 
    ? PRODUCTOS_MOCK 
    : PRODUCTOS_MOCK.filter(p => p.categoria === categoriaActiva);

  productosFiltrados = productosFiltrados.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

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

  // Generar rating aleatorio (para demostración)
  const obtenerRating = (id) => {
    return (4 + (id % 2)).toFixed(1);
  };

  // SVG para icono de carrito
  const IconoCarrito = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1h7.586a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM5 16a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  );

  // SVG para estrella
  const IconoEstrella = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );

  return (
    <div className="tienda-container">
      {/* Notificación */}
      {notificacion && (
        <div className="notificacion-flotante">
          {notificacion}
        </div>
      )}

      {/* Header con Carrito */}
      <div className="tienda-header-superior">
        <div className="tienda-header">
          <h1>🛍️ Tienda Virtual Veterinaria</h1>
          <p>Productos de calidad para el cuidado de tus mascotas</p>
        </div>
        
        <div className="carrito-badge">
          <IconoCarrito />
          <span className="cantidad">{carrito.length}</span>
        </div>
      </div>

      {/* Buscador */}
      <div className="buscador-container">
        <input
          type="text"
          className="buscador-input"
          placeholder="🔍 Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
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

      {/* Contador de resultados */}
      <div className="contador-resultados">
        Mostrando <strong>{productosFiltrados.length}</strong> productos
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
              
              {/* Badge de popularidad */}
              <div className="rating-badge">
                <IconoEstrella />
                <span>{obtenerRating(producto.id)}</span>
              </div>
            </div>

            {/* Contenido */}
            <div className="producto-contenido">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
              
              {/* Rating */}
              <div className="rating-container">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`estrella ${i < Math.floor(obtenerRating(producto.id)) ? 'llena' : ''}`}>
                    ★
                  </span>
                ))}
                <span className="rating-texto">({Math.floor(Math.random() * 100) + 20})</span>
              </div>
            </div>

            {/* Footer con Precio y Botón */}
            <div className="producto-footer">
              <p className="producto-precio">{producto.precio}</p>
              <button 
                className="btn-detalle"
                onClick={() => agregarAlCarrito(producto)}
              >
                <IconoCarrito />
                Agregar
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
          <p>😔 No encontramos productos que coincidan con tu búsqueda.</p>
        </div>
      )}

      {/* Banner informativo */}
      <div className="banner-info">
        <div className="banner-item">
          <span className="banner-icon">🚚</span>
          <div>
            <strong>Envío Gratis</strong>
            <p>En compras mayores a S/. 100</p>
          </div>
        </div>
        <div className="banner-item">
          <span className="banner-icon">✅</span>
          <div>
            <strong>Garantía</strong>
            <p>Todos nuestros productos incluyen garantía</p>
          </div>
        </div>
        <div className="banner-item">
          <span className="banner-icon">💬</span>
          <div>
            <strong>Soporte 24/7</strong>
            <p>¿Preguntas? Estamos aquí para ayudarte</p>
          </div>
        </div>
      </div>
    </div>
  );
}