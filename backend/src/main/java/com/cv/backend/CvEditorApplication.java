package com.cv.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CvEditorApplication {

	public static void main(String[] args) {
		SpringApplication.run(CvEditorApplication.class, args);
		System.out.println("====================================");
		System.out.println("CV Editor Backend Started!");
		System.out.println("API disponible sur: http://localhost:8080/api");
		System.out.println("Files disponibles sur: http://localhost:8080/api/files");
		System.out.println("====================================");
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:4200")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true);
			}
		};
	}
}