const motos = [
  // =========================
  // PASOLAS / SCOOTER
  // =========================

  {sku:"34005154",codigo:"70000151",nombre:"D125",detalle:"D125 BLAN/NEG/TURQUESA",categoria:"Pasolas",precio:8499,precioCredito:8499,img:"D125"},

  {sku:"34007441",codigo:"70000278",nombre:"D150LT",detalle:"D150 LT 2026",categoria:"Pasolas",precio:9499,precioCredito:9499,img:"D150"},
  {sku:"34007451",codigo:"70000275",nombre:"D150LT",detalle:"D150 LT 2027",categoria:"Pasolas",precio:9999,precioCredito:9999,img:"D150"},

  {sku:"34007452",codigo:"70000276",nombre:"W150",detalle:"W150 G/N 2027",categoria:"Pasolas",precio:9999,precioCredito:9999,img:"WS150"},
  {sku:"34007461",codigo:"70000280",nombre:"W150",detalle:"W150 G/N 2026",categoria:"Pasolas",precio:9499,precioCredito:9499,img:"WS150"},

  {sku:"34005713",codigo:"70000262",nombre:"WS150",detalle:"WS150 A/A",categoria:"Pasolas",precio:8499,precioCredito:8499,img:"WS150"},

  {sku:"34005153",codigo:"70000153",nombre:"D150",detalle:"D150 TURQUESA NEGRO",categoria:"Pasolas",precio:10999,precioCredito:9499,img:"D150"},

  {sku:"34005703",codigo:"70000260",nombre:"DS150",detalle:"DS150 N/N",categoria:"Pasolas",precio:11499,precioCredito:10499,img:"DS150"},


  // =========================
  // TRABAJO
  // =========================

  {sku:"34006081",codigo:"70000266",nombre:"BIT150",detalle:"BIT150 ROJO NEGRO",categoria:"Trabajo",precio:9999,precioCredito:8999,img:"BIT150"},

  {sku:"34005587",codigo:"70000252",nombre:"AT110",detalle:"AT110",categoria:"Trabajo",precio:5999,precioCredito:5999,img:"AT110"},

  {sku:"34005062",codigo:"70000131",nombre:"GTK125",detalle:"GTK125 ROJO",categoria:"Trabajo",precio:8999,precioCredito:8499,img:"gtkr"},
  {sku:"34005144",codigo:"70000148",nombre:"GTK125",detalle:"GTK125 NEGRO",categoria:"Trabajo",precio:8999,precioCredito:8499,img:"gtkn"},
  {sku:"34005145",codigo:"70000149",nombre:"GTK125",detalle:"GTK125 AZUL",categoria:"Trabajo",precio:8999,precioCredito:8499,img:"gtka"},

  {sku:"34005523",codigo:"70000230",nombre:"GTK125X",detalle:"GTK125X R",categoria:"Trabajo",precio:9999,precioCredito:8999,img:"gtkxr"},
  {sku:"34005524",codigo:"70000231",nombre:"GTK125X",detalle:"GTK125X A",categoria:"Trabajo",precio:9999,precioCredito:8999,img:"gtkxa"},
  {sku:"34005532",codigo:"70000232",nombre:"GTK125X",detalle:"GTK125X N",categoria:"Trabajo",precio:9999,precioCredito:8999,img:"gtkxn"},


  // =========================
  // LÍNEA Z
  // =========================

  {sku:"34005063",codigo:"70000162",nombre:"125Z",detalle:"125Z AZUL NEGRO",categoria:"Línea Z",precio:9499,precioCredito:7999,img:"125za"},

  {sku:"34006381",codigo:"70000269",nombre:"125Z",detalle:"125Z NEGRO GRIS",categoria:"Línea Z",precio:9499,precioCredito:7999,img:"125zn"},

  {sku:"34006382",codigo:"70000270",nombre:"150Z",detalle:"150Z NEGRO AZUL",categoria:"Línea Z",precio:11999,precioCredito:10999,img:"150za"},

  {sku:"34005183",codigo:"70000158",nombre:"150Z",detalle:"150Z NEGRO AMARILLO",categoria:"Línea Z",precio:9999,precioCredito:9999,img:"150zam"},

  {sku:"34006391",codigo:"70000271",nombre:"200Z",detalle:"200Z NEGRO AZUL",categoria:"Línea Z",precio:13999,precioCredito:12999,img:"200Z"},

  {sku:"34006401",codigo:"70000272",nombre:"250Z",detalle:"250Z NEGRO GRIS",categoria:"Línea Z",precio:18999,precioCredito:17999,img:"250Z"},

  {sku:"34006836",codigo:"70000274",nombre:"280Z",detalle:"280Z",categoria:"Línea Z",precio:19999,precioCredito:18999,img:"280Z"},


  // =========================
  // CAFÉ RACER
  // =========================

  {sku:"34004955",codigo:"70000150",nombre:"BLACKBIRD250",detalle:"BLACKBIRD250",categoria:"Café Racer",precio:12999,precioCredito:12999,img:"BLACKBIRD250"},


  // =========================
  // DEPORTIVAS
  // =========================

  {sku:"34005844",codigo:"70000265",nombre:"TITAN250",detalle:"TITAN 250",categoria:"Deportiva",precio:21999,precioCredito:21999,img:"TITAN250"},

  {sku:"34005343",codigo:"70000226",nombre:"RT250G",detalle:"RT250G",categoria:"Deportiva",precio:17999,precioCredito:16999,img:"RT250G"},


  // =========================
  // VORT-X
  // =========================

  {sku:"34005352",codigo:"70000229",nombre:"VORTX250",detalle:"VORT-X250",categoria:"Vort-X",precio:17999,precioCredito:16999,img:"VORTX250"},


  // =========================
  // TODO TERRENO
  // =========================

  {sku:"34005055",codigo:"70000145",nombre:"DM125",detalle:"DM125",categoria:"Todo Terreno",precio:8999,precioCredito:8499,img:"DM125"},

  {sku:"34005111",codigo:"70000144",nombre:"DM150",detalle:"DM150 SPRT",categoria:"Todo Terreno",precio:9999,precioCredito:9499,img:"DM150"},

  {sku:"34005342",codigo:"72040001",nombre:"DM200",detalle:"DM200 V",categoria:"Todo Terreno",precio:10999,precioCredito:10499,img:"DM200"},

  {sku:"34007444",codigo:"70000279",nombre:"DM250",detalle:"DM250 2026",categoria:"Todo Terreno",precio:12499,precioCredito:12499,img:"DM250"},

  {sku:"34005351",codigo:"70000228",nombre:"DM250",detalle:"DM250",categoria:"Todo Terreno",precio:11499,precioCredito:11499,img:"DM250"},

  {sku:"34005704",codigo:"70000261",nombre:"DM250X",detalle:"DM250X N/B",categoria:"Todo Terreno",precio:13999,precioCredito:13999,img:"DM250"},

  {sku:"34006541",codigo:"70000273",nombre:"DM300",detalle:"DM300",categoria:"Todo Terreno",precio:14999,precioCredito:14999,img:"DM300"},


  // =========================
  // ATV / CUATRIMOTOS
  // =========================

  {sku:"34005821",codigo:"70000263",nombre:"ATV150",detalle:"ATV150 G",categoria:"ATV's",precio:15999,precioCredito:15999,img:"ATV150"},

  {sku:"34005218",codigo:"70000161",nombre:"ATV180",detalle:"ATV180 VERDE NEGRO",categoria:"ATV's",precio:17999,precioCredito:17999,img:"ATV180"},

  {sku:"34004931",codigo:"70000130",nombre:"ATV200",detalle:"ATV200 ANARANJADO",categoria:"ATV's",precio:20999,precioCredito:20999,img:"ATV200"},

  {sku:"34005266",codigo:"70000164",nombre:"ATV250",detalle:"ATV250 N/C",categoria:"ATV's",precio:27999,precioCredito:24999,img:"ATV250"}
];



// =======================================================
// INFORMACIÓN BÁSICA POR MODELO
// Fuente: Italika Guatemala y fichas técnicas de la marca.
// =======================================================

const specs = {

  D125: {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"~125 cc",
    arranque:"Eléctrico y de pedal",
    frenos:"Tambor delantero y trasero",
    uso:"Motoneta pasola ágil y económica, ideal para trayectos cortos en ciudad."
  },

  D150LT: {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"~150 cc",
    arranque:"Eléctrico y de pedal",
    uso:"Motoneta de la línea D150 para uso diario y recorridos urbanos."
  },

  W150: {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"~150 cc",
    arranque:"Eléctrico y de pedal",
    uso:"Motoneta Italika de 150 cc para movilidad urbana y uso diario."
  },

  WS150: {
    motor:"4 Tiempos monocilíndrico OHC",
    cilindrada:"149.6 cc",
    potencia:"8.6 HP @ 7,500 RPM",
    velocidadMax:"90 km/h",
    frenos:"Disco delantero / Tambor trasero",
    arranque:"Eléctrico y de pedal",
    rendimiento:"~28 km/L",
    uso:"Motoneta de doble faro, cómoda y con buen estilo para uso diario en ciudad."
  },

  D150: {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"~150 cc",
    arranque:"Eléctrico y de pedal",
    frenos:"Tambor delantero y trasero",
    uso:"Motoneta compacta, ligera y fácil de maniobrar en tráfico urbano."
  },

  DS150: {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"~150 cc",
    arranque:"Eléctrico y de pedal",
    frenos:"Disco delantero / Tambor trasero",
    uso:"Motoneta con equipamiento intermedio dentro de la familia 150, buen balance precio-prestaciones."
  },

  BIT150: {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"149.6 cc",
    potencia:"8.4 HP @ 7,500 RPM",
    velocidadMax:"90 km/h",
    frenos:"Tambor delantero y trasero",
    arranque:"Eléctrico y de pedal",
    rendimiento:"~28 km/L",
    uso:'Modelo "crossover": combina el look de una naked con la comodidad y transmisión automática de una motoneta.'
  },

  AT110: {
    motor:"4 Tiempos, carburador",
    cilindrada:"107 cc",
    potencia:"6.5 HP @ 8,500 RPM",
    frenos:"Tambor delantero y trasero",
    arranque:"Eléctrico y de pedal",
    uso:"Semiautomática ligera (~87 kg), ideal para quienes empiezan a manejar o buscan uso urbano sencillo."
  },

  GTK125: {
    motor:"4 Tiempos OHV",
    cilindrada:"125 cc",
    potencia:"~11 HP @ 8,500 RPM",
    torque:"~9.5 Nm @ 7,500 RPM",
    velocidadMax:"90 km/h",
    transmision:"Manual 5 velocidades",
    frenos:"Disco delantero / Tambor trasero",
    arranque:"Eléctrico y de pedal",
    rendimiento:"~33 km/L",
    uso:"Moto de trabajo confiable y económica, pensada para repartidores y uso diario intensivo."
  },

  GTK125X: {
    motor:"4 Tiempos OHV",
    cilindrada:"125 cc",
    transmision:"Manual 5 velocidades",
    frenos:"Disco delantero / Tambor trasero",
    arranque:"Eléctrico y de pedal",
    uso:"Versión reforzada de la GTK125, con suspensión doble y mayor resistencia para trabajo exigente."
  },

  TITAN250: {
    cilindrada:"~250 cc",
    uso:"Deportiva de la línea Italika enfocada en potencia y presencia en carretera.",
    nota:"Ficha técnica detallada de este modelo aún no disponible en línea; se recomienda confirmar en agencia."
  },

  "125Z": {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"125 cc",
    potencia:"~11 HP",
    velocidadMax:"90 km/h",
    transmision:"Manual 5 velocidades",
    rendimiento:"~132 km/galón",
    uso:"Naked de entrada a la línea Z: ágil, ligera y económica para ciudad."
  },

  "150Z": {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"~150 cc",
    uso:"Naked de la línea Z con un paso más de potencia y equipamiento frente a la 125Z."
  },

  "200Z": {
    motor:"4 Tiempos, monocilíndrico enfriado por aire",
    cilindrada:"196 cc",
    potencia:"16.4 HP @ 8,000 RPM",
    torque:"15 Nm @ 6,500 RPM",
    velocidadMax:"110 km/h",
    frenos:"Disco ventilado delantero y trasero",
    suspension:"Horquilla telescópica / Monoshock",
    uso:"Naked equilibrada, con mejor frenado y tablero digital frente a la 150Z."
  },

  "250Z": {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"223 cc",
    transmision:"Manual 5 velocidades",
    frenos:"Disco delantero / Tambor trasero",
    suspension:"Horquilla telescópica / Amortiguador central",
    uso:"La más potente de la línea Z clásica, sin salir del estilo naked."
  },

  "280Z": {
    cilindrada:"~280 cc",
    uso:"Tope de gama de la línea Z, con más potencia y diseño deportivo renovado.",
    nota:"Ficha técnica detallada de este modelo aún no disponible en línea; se recomienda confirmar en agencia."
  },

  BLACKBIRD250: {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"250 cc",
    potencia:"~19.4 HP @ 8,500 RPM",
    torque:"~20.4 Nm @ 8,500 RPM",
    frenos:"Disco delantero y trasero",
    suspension:"Horquilla invertida / Monoshock",
    uso:"Estilo café racer clásico con toques modernos, tanque de 14L y asiento doble amplio."
  },

  RT250G: {
    motor:"4 Tiempos, monocilíndrico SOHC",
    cilindrada:"250 cc",
    potencia:"~17.3 HP @ 8,500 RPM",
    torque:"~16.6 Nm @ 7,500 RPM",
    velocidadMax:"~122 km/h",
    transmision:"Manual 6 velocidades",
    arranque:"Eléctrico",
    rendimiento:"~23 km/L",
    uso:"Deportiva de la línea RT, con diseño agresivo y farola frontal grande."
  },

  VORTX250: {
    motor:"4 Tiempos, monocilíndrico OHC",
    cilindrada:"250 cc",
    potencia:"20 HP @ 8,500 RPM",
    torque:"20.4 Nm @ 8,500 RPM",
    velocidadMax:"135 km/h",
    transmision:"Manual 6 velocidades por cadena",
    frenos:"Disco ventilado delantero y trasero",
    arranque:"Eléctrico",
    rendimiento:"~27 km/L",
    uso:"Tope de gama deportivo de Italika, tablero digital y diseño agresivo para carretera."
  },

  DM125: {
    cilindrada:"~125 cc",
    uso:"Todo terreno compacta y ligera, fácil de manejar tanto en calle como en terracería."
  },

  DM150: {
    cilindrada:"~150 cc",
    uso:"Todo terreno con más potencia que la DM125, pensada para caminos variados."
  },

  DM200: {
    motor:"4 Tiempos, monocilíndrico",
    cilindrada:"198 cc",
    potencia:"15.5 HP @ 8,500 RPM",
    torque:"16 Nm @ 7,500 RPM",
    velocidadMax:"110 km/h",
    rendimiento:"~26 km/L",
    uso:"Todo terreno intermedia, buen balance entre potencia y control."
  },

  DM250: {
    motor:"4 Tiempos",
    velocidadMax:"~100 km/h",
    arranque:"Eléctrico y de pedal",
    cargaMax:"~150 kg",
    uso:"Todo terreno pensada para recorridos largos y caminos exigentes."
  },

  DM250X: {
    motor:"4 Tiempos",
    arranque:"Eléctrico y de pedal",
    uso:"Versión X de la DM250, mismo motor y mayor equipamiento para terrenos más desafiantes."
  },

  DM300: {
    motor:"4 Tiempos",
    cilindrada:"271.3 cc",
    potencia:"~19.2 HP @ 8,500 RPM",
    torque:"~18.3 Nm @ 8,500 RPM",
    velocidadMax:"120 km/h",
    transmision:"Estándar 6 velocidades por cadena",
    frenos:"Disco delantero y trasero",
    suspension:"Horquilla invertida / Monoshock basculante",
    uso:"Tope de gama doble propósito, para pilotos experimentados que buscan dominar cualquier camino."
  },

  ATV150: {
    motor:"4 Tiempos, monocilíndrico enfriado por aire",
    cilindrada:"149.6 cc",
    potencia:"~7.65 HP",
    velocidadMax:"45 km/h",
    transmision:"Automática con reversa",
    rendimiento:"~26.5 km/L",
    uso:"La cuatrimoto más pequeña de Italika, ideal para trayectos cortos fuera de ciudad."
  },

  ATV180: {
    motor:"4 Tiempos, monocilíndrico enfriado por aire",
    cilindrada:"177.3 cc",
    potencia:"~9.38 HP @ 6,500 RPM",
    torque:"~11 Nm @ 5,500 RPM",
    velocidadMax:"65 km/h",
    transmision:"Automática",
    arranque:"Eléctrico",
    rendimiento:"~23 km/L",
    uso:"Cuatrimoto económica y accesible para uso ligero fuera de carretera."
  },

  ATV200: {
    motor:"4 Tiempos, monocilíndrico enfriado por aire",
    cilindrada:"200 cc",
    potencia:"~12.4 HP",
    velocidadMax:"65 km/h",
    frenos:"Disco trasero ventilado / Tambor delantero",
    cargaMax:"~150 kg",
    uso:"Diseño contemporáneo, con parrillas de carga en acero y plástico."
  },

  ATV250: {
    motor:"4 Tiempos, monocilíndrico enfriado por aire",
    cilindrada:"229 cc",
    potencia:"~14.8 HP @ 7,000 RPM",
    torque:"~15.5 Nm @ 6,000 RPM",
    transmision:"Semiautomática 5 velocidades + reversa",
    frenos:"Disco delantero y trasero",
    rendimiento:"~19 km/L",
    uso:"La cuatrimoto más grande y equipada de Italika, con tablero digital y puerto USB."
  }
};



// =======================================================
// AGENCIAS
// =======================================================

const agencias = {

  sanpablo: {

    nombre: "San Pablo",

    telefonos: [
      "50259173974"
    ],

    facebook:
      "https://www.facebook.com/profile.php?id=61578489304946",

    tiktok:
      "https://www.tiktok.com/@itlksp?_r=1&_t=ZS-96nt4gTdqI4",

    direccion:
      "San Pablo, San Marcos",

    mapsUrl:
      "https://www.google.com/maps/place/Italika+San+Pablo/@14.9317419,-92.0027141,21z/data=!4m6!3m5!1s0x858e7742f8c18be3:0xa096e2efba84e7b!8m2!3d14.9316589!4d-92.0028031!16s%2Fg%2F11zbqk6rg_?entry=ttu"
  },


  malacatan: {

    nombre: "Malacatán",

    telefonos: [
      "50230822551",
      "50238815225"
    ],

    facebook:
      "https://www.facebook.com/profile.php?id=100068131396850",

    tiktok: null,

    direccion:
      "5 calle 06-55 zona 2, Malacatán, San Marcos",

    mapsUrl:
      "https://www.google.com/maps/place/Malacat%C3%A1n/@14.9087559,-92.0643583,21z/data=!4m6!3m5!1s0x858e714365343571:0xf887bdb0b89ca99d!8m2!3d14.9122239!4d-92.0518154!16zL20vMDc5MHNy?entry=ttu"
  }
};



// =======================================================
// ROTACIÓN DE NÚMEROS DE WHATSAPP
// =======================================================

// Reparte los contactos por WhatsApp en turnos estrictos.
// Si una agencia tiene más de un número, como Malacatán,
// nunca se repite el mismo número dos veces seguidas.
//
// Se guarda el último turno usado en localStorage para que
// la alternancia se mantenga entre visitas y entre el catálogo
// y la página de contactos.

function getAgencyPhone(key) {

  const a = agencias[key];

  const list =
    a &&
    a.telefonos &&
    a.telefonos.length
      ? a.telefonos
      : [];

  if (!list.length) {
    return "";
  }

  if (list.length === 1) {
    return list[0];
  }

  const storageKey = "italika_wa_turn_" + key;

  let last = -1;

  try {

    const raw =
      localStorage.getItem(storageKey);

    if (raw !== null) {
      last = parseInt(raw, 10);
    }

  } catch (e) {}


  if (
    isNaN(last) ||
    last < 0 ||
    last >= list.length
  ) {
    last = -1;
  }


  const next =
    (last + 1) % list.length;


  try {

    localStorage.setItem(
      storageKey,
      String(next)
    );

  } catch (e) {}


  return list[next];
}
