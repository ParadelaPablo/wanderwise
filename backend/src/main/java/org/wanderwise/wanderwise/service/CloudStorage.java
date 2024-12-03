package org.wanderwise.wanderwise.service;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class CloudStorage {

    @Value("${gcs.bucket}")
    private String bucketName;


    private final Storage storage;

    public CloudStorage() throws IOException {
        this.storage = StorageOptions.newBuilder().setCredentials(
                        ServiceAccountCredentials.fromStream(
                                new FileInputStream("src/main/resources/cloudstorage.json")
                        ))
                .build()
                .getService();
    }

    public String uploadFile(String fileName, byte[] file) {
        try {
            BlobId blobId = BlobId.of(bucketName, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType("image/png") // Specify content type
                    .setCacheControl("public, max-age=31536000") // Enable caching
                    .build();

            // Upload file
            storage.create(blobInfo, file);

            // Return the public URL
            return String.format("https://storage.googleapis.com/%s/%s", bucketName, fileName);
        } catch (Exception e) {
            throw new RuntimeException("Error uploading file to Cloud Storage", e);
        }
    }
}
