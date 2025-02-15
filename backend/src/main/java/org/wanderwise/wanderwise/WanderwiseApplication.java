package org.wanderwise.wanderwise;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@CrossOrigin
@EnableJpaRepositories(basePackages = "org.wanderwise.wanderwise.repository")
public class WanderwiseApplication {
	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure()
				.directory("/app")
				.load();

		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

		SpringApplication.run(WanderwiseApplication.class, args);
	}
}
