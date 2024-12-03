package org.wanderwise.wanderwise;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@CrossOrigin
@EnableJpaRepositories(basePackages = "org.wanderwise.wanderwise.repository")
public class WanderwiseApplication {
	public static void main(String[] args) {


		SpringApplication.run(WanderwiseApplication.class, args);
	}
}
