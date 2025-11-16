# Dockerfile para compilar y ejecutar tu backend Java 17
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copiamos pom.xml y dependencias primero para cachear
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el código fuente
COPY src ./src

# Construimos el JAR
RUN mvn clean package -DskipTests

# Segunda etapa: imagen ligera para ejecutar
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copiamos el JAR compilado de la etapa anterior
COPY --from=build /app/target/*.jar ./backend.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend.jar"]
