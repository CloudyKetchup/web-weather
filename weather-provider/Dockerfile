FROM openjdk:latest
VOLUME /tmp
EXPOSE 8300
RUN mkdir -p /app/
RUN mkdir -p /app/logs/
ADD build/libs/weather-provider-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=container", "-jar", "/app/app.jar"]