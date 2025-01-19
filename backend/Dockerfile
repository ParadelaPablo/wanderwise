# Usa una imagen base de Maven para compilar el proyecto
FROM maven:3.9.4-eclipse-temurin-17 as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo pom.xml y descarga las dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia el código fuente al contenedor
COPY src ./src

# Construye el proyecto, generando el archivo JAR sin ejecutar pruebas
RUN mvn clean package -DskipTests

# Usa una imagen más ligera para ejecutar el JAR
FROM eclipse-temurin:17-jre-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de configuración .env
COPY .env /app/.env

# Copia el archivo JAR desde la etapa anterior
COPY --from=build /app/target/wanderwise-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto de la aplicación
EXPOSE 8080

# Define el comando de inicio de la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
