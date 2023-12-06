FROM maven:3.9.4-eclipse-temurin-17 AS build

COPY src /app/src

COPY pom.xml /app

RUN mvn clean install -f /app/pom.xml

FROM tomcat:10.1.13-jdk21-openjdk as runner

RUN rm -rf /usr/local/tomcat/webapps/*

COPY --from=build /app/target/*.war /usr/local/tomcat/webapps/

EXPOSE 8080

CMD ["catalina.sh", "run"]