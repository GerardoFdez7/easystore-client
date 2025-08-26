# Cypress Testing Setup

Este directorio contiene la configuración y pruebas de Cypress para el proyecto EasyStore.

## Estructura

```
cypress/
├── component/           # Pruebas de componentes
│   ├── ButtonLoadable.cy.tsx
│   └── SocialAuthButtons.cy.tsx
├── e2e/                # Pruebas end-to-end
│   ├── auth-flow.cy.ts
│   └── modal-navigation.cy.ts
├── support/            # Configuración y comandos personalizados
│   ├── commands.ts
│   ├── component.ts
│   ├── component-index.html
│   └── e2e.ts
├── cypress.config.ts   # Configuración principal
└── tsconfig.json       # Configuración TypeScript
```

## Pruebas Implementadas

### Pruebas de Componentes (Functional Tests)

1. **ButtonLoadable.cy.tsx**

   - Prueba el componente ButtonLoadable
   - Verifica estados de carga, deshabilitado, y eventos de click
   - Valida props y variantes del botón

2. **SocialAuthButtons.cy.tsx**
   - Prueba el componente SocialAuthButtons
   - Verifica renderizado de botones de Google y Facebook
   - Valida iconos, estilos y funcionalidad de click

### Pruebas E2E (Integration Tests)

1. **auth-flow.cy.ts**

   - Prueba el flujo de autenticación completo
   - Navegación entre páginas de login y registro
   - Validación de formularios y elementos de UI

2. **modal-navigation.cy.ts**
   - Prueba modales de forgot password
   - Navegación a términos y condiciones y política de privacidad
   - Enlaces de navegación entre login y registro
   - Validación de formularios y experiencia de usuario
   - Diseño responsivo y casos edge

## Comandos Disponibles

```bash
# Abrir Cypress en modo interactivo
npm run cypress:open

# Ejecutar todas las pruebas
npm run cypress:run

# Ejecutar solo pruebas de componentes
npm run cypress:run:component

# Ejecutar solo pruebas E2E
npm run cypress:run:e2e

# Ejecutar pruebas E2E con Chrome
npm run test:e2e

# Ejecutar pruebas de componentes con Chrome
npm run test:component
```

## Configuración

### Variables de Entorno

El proyecto incluye múltiples archivos de configuración para diferentes entornos:

- `cypress.env.json` - Configuración base
- `cypress.env.local.json` - Desarrollo local
- `cypress.env.staging.json` - Entorno de staging
- `cypress.env.production.json` - Producción
- `cypress.env.ci.json` - CI/CD

### Comandos Personalizados

Se han definido comandos personalizados en `cypress/support/commands.ts`:

- `cy.getByTestId(testId)` - Seleccionar elementos por data-testid
- `cy.waitForElement(selector)` - Esperar a que un elemento esté visible
- `cy.login()` - Comando de login (placeholder)
- `cy.navigateTo(route)` - Navegar a una ruta específica
- `cy.shouldHaveText(selector, text)` - Verificar texto en elemento

## Ejecutar Pruebas

### Prerequisitos

1. Asegúrate de que el servidor de desarrollo esté ejecutándose:

   ```bash
   npm run dev
   ```

2. El servidor debe estar disponible en `http://localhost:3000`

### Ejecutar Pruebas

1. **Modo Interactivo** (recomendado para desarrollo):

   ```bash
   npm run cypress:open
   ```

2. **Modo Headless** (para CI/CD):
   ```bash
   npm run cypress:run
   ```

## Notas Importantes

- Las pruebas están configuradas para funcionar con la estructura actual del proyecto
- **Todas las rutas incluyen el locale `/en/`** (ejemplo: `/en/login`, `/en/register`)
- Se han removido las pruebas de botones de autenticación social ya que están comentados en el código
- **Se han removido las pruebas del dashboard** ya que requieren backend
- Las nuevas pruebas se enfocan en funcionalidades disponibles sin backend (modales, navegación, formularios)
- Se incluye manejo de errores comunes de React (ResizeObserver, Hydration mismatch)
- Los comandos personalizados manejan automáticamente el locale en las rutas

## Troubleshooting

### Errores Comunes

1. **"Cannot find module"**: Verifica que las rutas de importación sean correctas
2. **"Element not found"**: Asegúrate de que los selectores coincidan con la estructura real del DOM
3. **"Timeout errors"**: Aumenta los timeouts en la configuración si es necesario

### Debugging

- Usa `cy.debug()` para pausar la ejecución
- Usa `cy.pause()` para pausar y inspeccionar el estado
- Revisa las capturas de pantalla en `cypress/screenshots/` cuando las pruebas fallan
