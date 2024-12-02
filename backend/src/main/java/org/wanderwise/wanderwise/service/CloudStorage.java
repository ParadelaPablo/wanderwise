package org.wanderwise.wanderwise.service;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.*;
import io.grpc.Context;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class CloudStorage {
    @Value("${gcs.bucket}")
    private String bucketName;

    private final Storage storage;

    public CloudStorage () throws IOException {
        this.storage = StorageOptions.newBuilder().setCredentials(
                        ServiceAccountCredentials.fromStream(
                                new FileInputStream("src/main/resources/cloudstorage.json")
                        ))
                .build()
                .getService();
    }

    public String uploadFile(String fileName, byte[] file) {
        try {
            BlobId blobId =BlobId.of(bucketName, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
            Blob blob = storage.create(blobInfo, file);
            return "https://storage.googleapis.com/" + bucketName + "/" + fileName;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error uploading file", e);
        }
    }

}
