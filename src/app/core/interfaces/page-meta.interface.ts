/**
 * Representa las etiquetas meta para cada ruta.
 */
export interface PageMeta {
  /** Ruta relativa asociada al conjunto de metadatos. */
  path: string;
  /** Descripción breve optimizada para SEO. */
  description: string;
  /** Palabras clave relevantes para la página. */
  keywords: string[];
}
