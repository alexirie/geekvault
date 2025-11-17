package com.example.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.http.urlconnection.UrlConnectionHttpClient;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import java.net.URI;

@Configuration
public class R2Config {

        @Value("${r2.accessKey}")
        private String accessKey;

        @Value("${r2.secretKey}")
        private String secretKey;

        @Value("${r2.endpoint}")
        private String endpoint;

        @Bean
        public S3Client s3Client() {
                System.out.println("R2 Config:");
                System.out.println("Access Key: " + accessKey);
                System.out.println("Secret Key: " + (secretKey != null ? "****" : "null"));
                System.out.println("Endpoint: " + endpoint);

                S3Configuration serviceConfig = S3Configuration.builder()
                                .pathStyleAccessEnabled(true)
                                .chunkedEncodingEnabled(false) // importante para Cloudflare
                                .build();

                return S3Client.builder()
                                .credentialsProvider(
                                                StaticCredentialsProvider.create(
                                                                AwsBasicCredentials.create(accessKey, secretKey)))
                                .region(Region.of("auto"))
                                .endpointOverride(URI.create(endpoint))
                                .serviceConfiguration(serviceConfig)
                                .httpClientBuilder(ApacheHttpClient.builder()) // más robusto que UrlConnection
                                .build();
        }
}
