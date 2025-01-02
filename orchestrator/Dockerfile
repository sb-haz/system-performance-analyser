FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY build/libs/*.jar orchestrator.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","orchestrator.jar"]