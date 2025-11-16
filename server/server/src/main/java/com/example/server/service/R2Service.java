package com.example.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class R2Service {

    private final S3Client s3Client;

    @Value("${cloudflare.r2.bucket}")
    private String bucketName;

    @Value("${cloudflare.r2.publicUrl}")
    private String publicUrl;

    public R2Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        PutObjectRequest por = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(
                por,
                RequestBody.fromBytes(file.getBytes())
        );

        return publicUrl + "/" + fileName;
    }
}
