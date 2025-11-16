package com.freakproject.config; // <-- cambia esto a tu paquete

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.http.urlconnection.UrlConnectionHttpClient;

import java.net.URI;

@Configuration
public class R2Config {

    @Value("${cloudflare.r2.accessKey}")
    private String accessKey;

    @Value("${cloudflare.r2.secretKey}")
    private String secretKey;

    @Value("${cloudflare.r2.endpoint}")
    private String endpoint;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(accessKey, secretKey)
                        )
                )
                .region(Region.of("auto")) // Cloudflare usa auto
                .endpointOverride(URI.create(endpoint))
                .serviceConfiguration(
                        S3Configuration.builder()
                                .pathStyleAccessEnabled(true) // necesario para R2
                                .build()
                )
                .httpClient(UrlConnectionHttpClient.builder().build())
                .build();
    }
}
