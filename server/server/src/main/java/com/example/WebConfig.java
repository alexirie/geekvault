package com.example;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Ruta /uploads/** en la URL → carpeta uploads en el filesystem
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configuración CORS para aceptar todas las peticiones
        registry.addMapping("/**")
                .allowedOrigins("*")  // Permite cualquier origen
                .allowedMethods("*")  // Permite cualquier método HTTP
                .allowedHeaders("*")  // Permite cualquier cabecera
                .allowCredentials(false); // Debe ser false si allowedOrigins es "*"
    }

}

