package com.example.server.service;

import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
import software.amazon.awssdk.services.s3.model.NoSuchBucketException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import org.springframework.stereotype.Service;

import java.net.URI;

import org.springframework.beans.factory.annotation.Value;
import java.io.IOException;
import software.amazon.awssdk.regions.Region;
import java.util.UUID;
import software.amazon.awssdk.core.sync.RequestBody;

@Service
public class R2Service {

    @Value("${cloudflare.r2.accessKey}")
    private String accessKey;

    @Value("${cloudflare.r2.secret-key}")
    private String secretKey;

    @Value("${cloudflare.r2.endpoint}")
    private String endpoint;

    @Value("${cloudflare.r2.bucket-name}")
    private String bucketName;

    @Value("${cloudflare.r2.public-url}")
    private String publicUrl;

    public String uploadFile(MultipartFile file, boolean isPublic) throws IOException {

        System.out.println("=== SUBIDA DE ARCHIVO A R2 ===");
        System.out.println("Nombre original del archivo: " + file.getOriginalFilename());
        System.out.println("Tamaño del archivo (bytes): " + file.getSize());

        // System.out.println("accesKey sin pasar por aws: "+accessKey);

        String cleanAccessKey = accessKey.split(" ")[0];

        // System.out.println("accesKey cortado: "+cleanAccessKey);

        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(cleanAccessKey, secretKey);

        /*
         * System.out.println("----- DEBUG R2 CONFIG -----");
         * System.out.println("accessKey = [" + accessKey + "]");
         * System.out.println("secretKey = [" + secretKey + "]");
         * System.out.println("bucketName = [" + bucketName + "]");
         * System.out.println("endpoint = [" + endpoint + "]");
         * System.out.println("---------------------------");
         */

        S3Configuration serviceConfiguration = S3Configuration.builder()
                .pathStyleAccessEnabled(true)
                .build();

        S3Client s3Client = S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .endpointOverride(URI.create(endpoint))
                .serviceConfiguration(serviceConfiguration)
                .region(Region.US_EAST_1)
                .build();

        // Asegurarse de que el bucket existe (crearlo si no existe)
        try {
            s3Client.headBucket(HeadBucketRequest.builder().bucket(bucketName).build());

        } catch (NoSuchBucketException e) {

            s3Client.createBucket(CreateBucketRequest.builder().bucket(bucketName).build());

        }

        // Generar un nombre de clave único para el archivo
        String keyName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Nombre original del archivo
        String originalFileName = file.getOriginalFilename(); // ej: "ds.PNG"

        // Carpeta con el nombre del archivo sin extensión
        String folderName = originalFileName.contains(".")
                ? originalFileName.substring(0, originalFileName.lastIndexOf("."))
                : originalFileName;

        // Reutilizamos tu keyName existente y anteponemos la carpeta
        keyName = folderName + "/" + keyName; // ahora keyName = "ds/UUID_ds.PNG"

        // Convertir el archivo a byte
        byte[] fileBytes = file.getBytes();

        // Crear el PutObjectRequest con la ACL apropiada
        PutObjectRequest.Builder putObjectRequestBuilder = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(keyName);

        if (isPublic) {
            // putObjectRequestBuilder.acl(ObjectCannedACL.PUBLIC_READ);
        }

        // Subir el objeto al bucket R2
        s3Client.putObject(
                putObjectRequestBuilder.build(),
                RequestBody.fromBytes(fileBytes));

        System.out.println("archivo SUBIDO");

        //Ñapa para tener la buena... toy harto
        publicUrl = "https://pub-a7a439eb25d84268834af547b9203b6c.r2.dev";

        // devuelve la URL completa
        return String.format("%s/%s", publicUrl, keyName);
    }
}
