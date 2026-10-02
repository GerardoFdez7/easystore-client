## ✨ Descripción

Por favor, describe clara y concisamente los cambios introducidos en este Pull Request. Explica el "porqué" detrás de los cambios".

* **Problema Resuelto / Característica Implementada:**
    * [Ej: Soluciona #123 (Enlace a la incidencia)]
    * [Ej: Implementa la nueva página de perfil de usuario.]

* **Impacto:**
    * Describe cualquier impacto potencial en la funcionalidad existente, rendimiento o experiencia de usuario.
    * [Ej: Impacto en la carga inicial de la página X, mejora en la navegación del componente Y.]

## 🚀 Cambios

Enumera los cambios clave realizados en este PR. Usa viñetas para facilitar la lectura.

* [Ej: Creación del componente `UserProfileCard` siguiendo el patrón Atomic Design (nivel: Organism).]
* [Ej: Modificación del hook `useAuth` para integrar el nuevo endpoint de autenticación.]
* [Ej: Actualización de rutas en `next.config.js` para la página Z.]

## 🧪 Pruebas

Describe las pruebas que has realizado para asegurar la calidad y corrección de tus cambios.

* **Pruebas Manuales:**
    * Proporciona pasos claros sobre cómo probar tus cambios manualmente.
    * [Ej: 1. Navegar a `/perfil`. 2. Verificar que la información del usuario se carga correctamente. 3. Probar la edición de datos y guardar.]
    * [Ej: Verificar la responsividad en dispositivos móviles (iPhone 13, iPad Air).]

* **Pruebas Automatizadas:**
    * [ ] Pruebas unitarias (Jest/RTL) añadidas/actualizadas para componentes/hooks.
    * [ ] Pruebas de integración (Playwright) añadidas/actualizadas para flujos clave.
    * Detalles sobre pruebas específicas ejecutadas:
        * [Ej: `npm run test:unit src/components/UserProfileCard`]
        * [Ej: `npm run test:e2e -- --spec=login-flow.spec.ts`]

## ✅ Checklist

Antes de enviar este Pull Request, por favor asegúrate de lo siguiente:

* [ ] He leído la guía [CONTRIBUTING.md](https://github.com/GerardoFdez7/easystore-client/blob/main/CONTRIBUTING.md).
* [ ] He realizado una auto-revisión de mi propio código.
* [ ] He comentado mi código, particularmente en áreas difíciles de entender.
* [ ] He realizado la documentación de los componentes en StoryBook si aplica.
* [ ] Mis cambios no generan nuevas advertencias en la consola.
* [ ] Todas las pruebas unitarias/de integración existentes y nuevas pasan localmente con mis cambios.
* [ ] Los componentes nuevos o modificados siguen los principios de **Atomic Design**.
* [ ] Se han considerado las optimizaciones de rendimiento de Next.js (lazy load, optimización de imágenes, etc.).

## 📸 Capturas de Pantalla (si aplica)

Si tus cambios involucran actualizaciones de UI o elementos visuales, por favor incluye capturas de pantalla.

* [Captura de pantalla 1]
* [Captura de pantalla 2]

## 🤝 Incidencias / PRs Relacionados

Enlaza cualquier incidencia o Pull Request relevante.

* [Ej: Cierra #456]
* [Ej: Relacionado con #789]

## 🚨 Cambios Rompedores (si aplica)

Si este PR introduce algún cambio que rompa la compatibilidad, descríbelo aquí.

* [Ej: El componente `OldFormComponent` ha sido eliminado y reemplazado por `NewFormComponent`. Los consumidores deben actualizar sus importaciones.]
