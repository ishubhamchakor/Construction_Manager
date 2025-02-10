package com.example.demo;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration

public class MyBeans {

	// http://localhost:8080/api1/welcome -- localhost:8081
	// http://localhost:8080/api1/welcome -- localhost:8082

	@Bean
	public RouteLocator customRouterLocator(RouteLocatorBuilder builder) {
		return builder.routes().route("CONSTRUCTIONMANAGER", r -> r.path("/auth/**").uri("lb://CONSTRUCTIONMANAGER"))
		 .route("CONSTRUCTIONMANAGER-CRUD", r -> r.path("/crud/**").uri("lb://CONSTRUCTIONMANAGER-CRUD"))
		 
//				.route("service2",r->r.path("/api2/")
//					 //.uri("http://localhost:8082"))
//					 .uri("lb://Service2"))	
				.build();

	}

	@Bean
	 CorsWebFilter corsWebFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		config.setAllowedOrigins(Arrays.asList("http://localhost:3017")); // Ensure it matches your frontend URL
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
		config.setExposedHeaders(Arrays.asList("Authorization")); // Expose headers if needed

		source.registerCorsConfiguration("/auth/**", config);
		source.registerCorsConfiguration("/crud/**", config);
		

		return new CorsWebFilter(source);
	}

}
