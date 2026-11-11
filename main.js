
// ============================================
// MICHAEL JORDAN 3D - JUGADOR DE BALONCESTO
// ============================================

// MATERIALES Y COLORES

const piel = new THREE.MeshStandardMaterial({
    color: 0x754321,
    roughness: 0.8
});

const rojo = new THREE.MeshStandardMaterial({
    color: 0xce2029
});

const negro = new THREE.MeshStandardMaterial({
    color: 0x151515
});

const blanco = new THREE.MeshStandardMaterial({
    color: 0xffffff
});

const dorado = new THREE.MeshStandardMaterial({
    color: 0xffc928
});

const naranja = new THREE.MeshStandardMaterial({
    color: 0xe87918,
    roughness: 0.85
});

// GRUPO PRINCIPAL DEL JUGADOR

const jordan = new THREE.Group();
escena.add(jordan);

// GRUPO DEL CUERPO

const cuerpo = new THREE.Group();
jordan.add(cuerpo);

// FUNCIÓN PARA CREAR PIEZAS

function pieza(geometria, material, x, y, z, padre = cuerpo) {
    const objeto = new THREE.Mesh(geometria, material);
    objeto.position.set(x, y, z);
    padre.add(objeto);
    return objeto;
}

// FUNCIÓN PARA CREAR CILINDROS ENTRE DOS PUNTOS

function segmento(inicio, fin, radio, material, padre) {
    const direccion = new THREE.Vector3().subVectors(fin, inicio);
    const geometria = new THREE.CylinderGeometry(
        radio, radio, direccion.length(), 16
    );

    const objeto = new THREE.Mesh(geometria, material);
    objeto.position.copy(inicio).add(fin).multiplyScalar(0.5);
    objeto.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direccion.normalize()
    );

    padre.add(objeto);
    return objeto;
}

// ============================================
// PIERNAS Y SHORT DE BALONCESTO
// ============================================

// Short rojo

pieza(
    new THREE.BoxGeometry(0.95, 0.45, 0.55),
    rojo, 0, 0.95, 0
);

// Pierna izquierda

segmento(
    new THREE.Vector3(-0.25, 0.8, 0),
    new THREE.Vector3(-0.28, 0.22, 0),
    0.13, piel, cuerpo
);

// Pierna derecha

segmento(
    new THREE.Vector3(0.25, 0.8, 0),
    new THREE.Vector3(0.28, 0.22, 0),
    0.13, piel, cuerpo
);

// Medias

pieza(
    new THREE.CylinderGeometry(0.14, 0.14, 0.17, 16),
    blanco, -0.28, 0.17, 0
);

pieza(
    new THREE.CylinderGeometry(0.14, 0.14, 0.17, 16),
    blanco, 0.28, 0.17, 0
);

// Tenis

pieza(
    new THREE.BoxGeometry(0.32, 0.17, 0.52),
    negro, -0.28, 0.06, 0.08
);

pieza(
    new THREE.BoxGeometry(0.32, 0.17, 0.52),
    negro, 0.28, 0.06, 0.08
);

// Suelas blancas

pieza(
    new THREE.BoxGeometry(0.34, 0.06, 0.54),
    blanco, -0.28, 0.015, 0.08
);

pieza(
    new THREE.BoxGeometry(0.34, 0.06, 0.54),
    blanco, 0.28, 0.015, 0.08
);

// ============================================
// TORSO Y UNIFORME DE MICHAEL JORDAN
// ============================================

// Cuerpo

pieza(
    new THREE.BoxGeometry(0.95, 1.15, 0.48),
    piel, 0, 1.85, 0
);

// Camiseta roja

pieza(
    new THREE.BoxGeometry(0.98, 0.92, 0.52),
    rojo, 0, 1.93, 0
);

// Cuello

pieza(
    new THREE.CylinderGeometry(0.13, 0.13, 0.18, 16),
    piel, 0, 2.48, 0
);

// Número 23 en la camiseta

const lienzo = document.createElement('canvas');
lienzo.width = 256;
lienzo.height = 256;

const contexto = lienzo.getContext('2d');

contexto.fillStyle = '#ffffff';
contexto.font = 'bold 115px Arial';
contexto.textAlign = 'center';
contexto.textBaseline = 'middle';
contexto.fillText('23', 128, 128);

const textura = new THREE.CanvasTexture(lienzo);

const materialNumero = new THREE.MeshBasicMaterial({
    map: textura,
    transparent: true,
    side: THREE.DoubleSide
});

pieza(
    new THREE.PlaneGeometry(0.48, 0.48),
    materialNumero, 0, 1.95, 0.267
);

// ============================================
// CABEZA Y ROSTRO
// ============================================

// Cabeza

const cabeza = pieza(
    new THREE.SphereGeometry(0.39, 32, 24),
    piel, 0, 2.9, 0
);

// Cuello y cabeza forman una figura estilizada.
// Detalles del rostro mirando hacia Z positivo.

pieza(
    new THREE.SphereGeometry(0.045, 16, 12),
    blanco, -0.14, 2.94, 0.345
);

pieza(
    new THREE.SphereGeometry(0.045, 16, 12),
    blanco, 0.14, 2.94, 0.345
);

pieza(
    new THREE.SphereGeometry(0.022, 12, 8),
    negro, -0.14, 2.94, 0.385
);

pieza(
    new THREE.SphereGeometry(0.022, 12, 8),
    negro, 0.14, 2.94, 0.385
);

// Nariz

pieza(
    new THREE.SphereGeometry(0.055, 16, 12),
    piel, 0, 2.84, 0.38
);

// Boca

pieza(
    new THREE.BoxGeometry(0.13, 0.025, 0.025),
    negro, 0, 2.76, 0.355
);

// ============================================
// BRAZOS ARTICULADOS
// ============================================

// Brazo izquierdo

const brazoIzq = new THREE.Group();
brazoIzq.position.set(-0.55, 2.28, 0);
cuerpo.add(brazoIzq);

segmento(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.12, -0.48, 0),
    0.13, piel, brazoIzq
);

segmento(
    new THREE.Vector3(-0.12, -0.48, 0),
    new THREE.Vector3(-0.12, -0.88, 0.05),
    0.10, piel, brazoIzq
);

// Mano izquierda

pieza(
    new THREE.SphereGeometry(0.12, 16, 12),
    piel, -0.12, -0.94, 0.05, brazoIzq
);

// Brazo derecho

const brazoDer = new THREE.Group();
brazoDer.position.set(0.55, 2.28, 0);
cuerpo.add(brazoDer);

segmento(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.15, -0.48, 0),
    0.13, piel, brazoDer
);

segmento(
    new THREE.Vector3(0.15, -0.48, 0),
    new THREE.Vector3(0.25, -0.85, 0.12),
    0.10, piel, brazoDer
);

pieza(
    new THREE.SphereGeometry(0.12, 16, 12),
    piel, 0.25, -0.91, 0.12, brazoDer
);

// ============================================
// BALÓN DE BALONCESTO
// ============================================

const balon = new THREE.Group();
escena.add(balon);

// Esfera naranja

const esfera = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 32, 32),
    naranja
);

balon.add(esfera);

// Líneas negras del balón

const linea1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.322, 0.012, 8, 64),
    negro
);

balon.add(linea1);

const linea2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.322, 0.012, 8, 64),
    negro
);

linea2.rotation.x = Math.PI / 2;
balon.add(linea2);

const linea3 = new THREE.Mesh(
    new THREE.TorusGeometry(0.322, 0.012, 8, 64),
    negro
);

linea3.rotation.y = Math.PI / 2;
balon.add(linea3);

// ============================================
// MOVIMIENTO Y CONTROLES
// ============================================

const datos = {};
const panel = document.getElementById('panel');

const reloj = new THREE.Clock();

let inicioSalto = -10;
let movimientoExtra = false;

addEventListener('keydown', (e) => {

    if (e.key === 'ArrowRight') jordan.position.x += 0.2;
    if (e.key === 'ArrowLeft') jordan.position.x -= 0.2;

    if (e.key === 'ArrowUp') jordan.position.z -= 0.2;
    if (e.key === 'ArrowDown') jordan.position.z += 0.2;

    if (e.code === 'Space') {
        inicioSalto = reloj.getElapsedTime();
    }

    if (e.key.toLowerCase() === 'q') {
        jordan.rotation.y += Math.PI / 8;
    }

    if (e.key.toLowerCase() === 'e') {
        jordan.rotation.y -= Math.PI / 8;
    }

    if (e.key.toLowerCase() === 'm') {
        movimientoExtra = !movimientoExtra;
    }

});

// ============================================
// ANIMACIÓN DEL BALÓN Y DEL JUGADOR
// ============================================

animaciones.push((t) => {

    // El balón sube y baja constantemente

    const rebote = Math.abs(Math.sin(t * 4));

    balon.position.set(
        jordan.position.x + 0.95,
        0.33 + rebote * 0.85,
        jordan.position.z + 0.45
    );

    // El balón gira mientras rebota

    balon.rotation.z = t * 2;

    // Movimiento del brazo derecho

    brazoDer.rotation.z =
        -0.25 - rebote * 0.45;

    // Movimiento del cuerpo al botar

    cuerpo.rotation.z = 0.04 * Math.sin(t * 4);

    // Movimiento de la cabeza

    cabeza.rotation.y = 0.12 * Math.sin(t * 2);

    // Movimiento adicional

    if (movimientoExtra) {
        jordan.rotation.y += 0.01;
    }

    // Salto del jugador

    const s = t - inicioSalto;

    jordan.position.y =
        s >= 0 && s < 0.7
            ? Math.sin((s / 0.7) * Math.PI) * 0.8
            : 0;

    datos['Personaje'] = 'Michael Jordan 23';
    datos['Balón'] = 'Botando';
    datos['Movimiento'] = movimientoExtra
        ? 'Activo'
        : 'Normal';

    datos['Posición'] =
        `X: ${jordan.position.x.toFixed(1)} Z: ${jordan.position.z.toFixed(1)}`;

    panel.textContent = Object.entries(datos)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');

});

// ============================================
// AJUSTAR PANTALLA
// ============================================

addEventListener('resize', () => {

    camara.aspect = innerWidth / innerHeight;
    camara.updateProjectionMatrix();

    renderizador.setSize(innerWidth, innerHeight);

});
