const WHATSAPP_COUNTRY_CODE = '57';
const WHATSAPP_LOCAL_NUMBER = '3028225644';

export const WHATSAPP_E164 = `${WHATSAPP_COUNTRY_CODE}${WHATSAPP_LOCAL_NUMBER}`;
export const WHATSAPP_DISPLAY = '+57 302 822 5644';

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export function createCatalogWhatsAppMessage(section: string) {
  return `Hola, quiero recibir asesoria sobre ${section} de Universo Musical.`;
}

export function createProductWhatsAppMessage(productName: string, section: string) {
  return `Hola, me interesa ${productName}. Lo vi en la seccion de ${section} de la web de Universo Musical y quiero confirmar precio y disponibilidad.`;
}
