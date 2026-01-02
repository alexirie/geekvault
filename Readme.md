# Colección de Figuras

Aplicación fullstack diseñada para moviles para gestionar una colección personal de figuras.

En producción: https://virtual-indexer-478414-r4.web.app/

## Stack
- Frontend: React
- Backend: Spring Boot
- Base de datos: MySql

## Arquitectura
- Frontend en React organizado por páginas, componentes reutilizables y hooks personalizados
- Backend estructurado en capas (controller, service, repository)
- Uso de DTOs para entrada y salida de datos
- Principios SOLID en servicios
- Separación de la lógica de negocio de la infraestructura
- Configuración mediante variables de entorno

## Ejecución
- Backend: mvn spring-boot:run
- Frontend: npm install && npm start
