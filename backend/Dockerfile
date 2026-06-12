# ---------- Build stage ----------
FROM maven:3.9.9-eclipse-temurin-21 AS backend-build

WORKDIR /app

COPY pom.xml .

RUN mvn -B dependency:go-offline

COPY src ./src

RUN mvn -B clean package -DskipTests


# ---------- Runtime stage ----------
FROM eclipse-temurin:21-jre-alpine AS backend-runtime

WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring

COPY --from=backend-build /app/target/*.jar app.jar

USER spring

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]