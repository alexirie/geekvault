package com.example.server.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class R2Service {

    private static final Logger logger = LoggerFactory.getLogger(R2Service.class);

    private final S3Client s3Client;

    @Value("${r2.bucket}")
    private String bucketName;

    @Value("${r2.publicUrl}")
    private String publicUrl;

    public R2Service(S3Client s3Client) {
        this.s3Client = s3Client;
        logger.info("R2Service initialized with S3Client: {}", s3Client);
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        logger.info("Preparing to upload file: {}, size: {}, contentType: {}",
                fileName, file.getSize(), file.getContentType());
        logger.info("Bucket: {}, Public URL: {}", bucketName, publicUrl);

        PutObjectRequest por = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType())
                .build();

        try {
            logger.info("Uploading file to R2...");
            s3Client.putObject(por, RequestBody.fromBytes(file.getBytes()));
            logger.info("Upload successful!");
        } catch (Exception e) {
            logger.error("Error uploading file to R2", e);
            throw e; // relanzamos para que tu controller capture y devuelva 500
        }

        return publicUrl + "/" + fileName;
    }
}
