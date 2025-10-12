/**
 * Convierte una cadena de texto a un formato "slug" amigable para URLs.
 *
 * @param text - La cadena de texto de entrada.
 * @returns La cadena convertida en formato slug.
 *
 * @example
 * toSlug('Mi Nuevo Proyecto!') // Devuelve 'mi-nuevo-proyecto'
 */
export function toSlug(text: string): string {
  if (!text) return '';

  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Reemplaza espacios con -
    .replace(p, c => b.charAt(a.indexOf(c))) // Reemplaza caracteres especiales
    .replace(/&/g, '-and-') // Reemplaza & con 'and'
    .replace(/[^\w\-]+/g, '') // Elimina caracteres no válidos
    .replace(/\-\-+/g, '-') // Reemplaza múltiples - con uno solo
    .replace(/^-+/, '') // Elimina - del inicio
    .replace(/-+$/, ''); // Elimina - del final
}
