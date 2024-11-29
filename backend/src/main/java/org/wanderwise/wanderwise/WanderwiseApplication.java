package org.wanderwise.wanderwise;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class WanderwiseApplication {

	public static void main(String[] args) {

		SpringApplication.run(WanderwiseApplication.class, args);
	}
}
