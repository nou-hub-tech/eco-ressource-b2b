# Multi-stage Dockerfile for the Spring Boot backend.
# Build context: backend project root (eco-ressource-backend-main)
#
# Build from the frontend repository:
#   docker build -f deployment/docker/backend.Dockerfile -t <dockerhub_user>/eco-backend:v1 ../eco-ressource-backend-main
#
# If this Dockerfile is copied into the backend root:
#   docker build -f backend.Dockerfile -t <dockerhub_user>/eco-backend:v1 .
#
# Run locally with an external MySQL database:
#   docker run --rm -p 9090:9090 \
#     -e SPRING_DATASOURCE_URL="jdbc:mysql://host.docker.internal:3306/eco_ressource_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true" \
#     -e SPRING_DATASOURCE_USERNAME=root \
#     -e SPRING_DATASOURCE_PASSWORD="" \
#     <dockerhub_user>/eco-backend:v1

FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine AS runtime

WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring

ENV SERVER_PORT=9090
ENV SPRING_PROFILES_ACTIVE=prod
ENV SPRING_DATASOURCE_URL="jdbc:mysql://eco-db:3306/eco_ressource_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true"
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=""
ENV FILE_UPLOAD_DIR=/app/uploads

RUN mkdir -p /app/uploads && chown -R spring:spring /app

COPY --from=build /app/target/*.jar /app/app.jar

USER spring

EXPOSE 9090

HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=3 \
  CMD wget -qO- http://localhost:9090/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
