package com.cv.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadsPath = Paths.get(uploadDir).toAbsolutePath().toUri().toString();

        // ✅ Servir les fichiers via /api/files/**
        registry.addResourceHandler("/api/files/**")
                .addResourceLocations(uploadsPath);

        System.out.println("📁 Serving files from: " + uploadsPath);
        System.out.println("🌐 Files accessible at: http://localhost:8080/api/files/");
    }
}