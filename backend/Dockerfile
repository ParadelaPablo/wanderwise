# Use a base image with Java installed
FROM maven:3.9.4-eclipse-temurin-17

# Set the working directory in the container
WORKDIR /app



COPY pom.xml .

# Install the local dependency in the Docker image 
RUN mvn install:install-file \
    -DgroupId=com.harium.supabase \
    -DartifactId=core \
    -Dversion=0.0.2 \
    -Dpackaging=jar


COPY src src

# Accept build arguments for PostgreSQL environment variables
ARG DB_URL
ARG DB_USERNAME
ARG DB_PASSWORD


# Set PostgreSQL environment variables
ENV DB_URL=${DB_URL}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}

# Building a package
RUN mvn clean package



# Expose the port on which the application will run
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "./target/Canine-Cloud-0.0.1-SNAPSHOT.jar"]