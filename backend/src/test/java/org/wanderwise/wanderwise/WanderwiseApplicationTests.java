package org.wanderwise.wanderwise;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.wanderwise.wanderwise.service.CloudStorage;

@SpringBootTest
class WanderwiseApplicationTests {

	@Autowired
	private CloudStorage cloudStorage;

	@Test
	void contextLoads() {
		byte[] imageBytes = new byte[] {
				(byte) 0x89, (byte) 0x50, (byte) 0x4E, (byte) 0x47, (byte) 0x0D, (byte) 0x0A, (byte) 0x1A, (byte) 0x0A,
				(byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x0D, (byte) 0x49, (byte) 0x48, (byte) 0x44, (byte) 0x52,
				(byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x01, (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x01,
				(byte) 0x08, (byte) 0x06, (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x1F, (byte) 0x15, (byte) 0xC4,
				(byte) 0x89, (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x0A, (byte) 0x49, (byte) 0x44, (byte) 0x41,
				(byte) 0x54, (byte) 0x78, (byte) 0x9C, (byte) 0x63, (byte) 0xF8, (byte) 0xCF, (byte) 0xC0, (byte) 0x00,
				(byte) 0x00, (byte) 0x02, (byte) 0x7F, (byte) 0x01, (byte) 0x7E, (byte) 0xAE, (byte) 0x42, (byte) 0x60,
				(byte) 0x82, (byte) 0x7B, (byte) 0xA6, (byte) 0x4A, (byte) 0x58, (byte) 0x4B, (byte) 0x6F, (byte) 0x00,
				(byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x49, (byte) 0x45, (byte) 0x4E, (byte) 0x44, (byte) 0xAE,
				(byte) 0x42, (byte) 0x60, (byte) 0x82
		};
		String url = cloudStorage.uploadFile("test.png", imageBytes);
		System.out.println(url);
	}

}
