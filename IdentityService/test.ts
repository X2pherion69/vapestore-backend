version: "3"

services:
  database:
    container_name: keycloak-database
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: 12345678x@X
      MYSQL_DATABASE: keycloak
      MYSQL_USER: keycloak
      MYSQL_PASSWORD: password
    volumes:
      - ./db/mysql:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: unless-stopped
    networks:
      - vapeapp

  keycloak:
    container_name: keycloak
    image: quay.io/keycloak/keycloak:19.0.0
    # command: -b 0.0.0.0 -Dkeycloack.profile=preview
    command: start-dev
    restart: on-failure
    environment:
      KC_HTTPS_CERTIFICATE_FILE: /opt/keycloak/conf/keycloak-server.crt.pem
      KC_HTTPS_CERTIFICATE_KEY_FILE: /opt/keycloak/conf/keycloak-server.key.pem
      PROXY_ADDRESS_FORWARDING: "true"
      DB_VENDOR: mysql
      DB_ADDR: database
      DB_DATABASE: keycloak
      DB_USER: keycloak
      DB_PASSWORD: password
      KEYCLOAK_USER: admin
      KEYCLOAK_PASSWORD: 12345678x@X
      REDIRECT_SOCKET: "proxy-https"
      # Uncomment the line below if you want to specify JDBC parameters. The parameter below is just an example, and it shouldn't be used in production without knowledge. It is highly recommended that you read the MySQL JDBC driver documentation in order to use it.
      #JDBC_PARAMS: "connectTimeout=30000"
    volumes:
      - ./.docker/keycloak-server.crt.pem:/opt/keycloak/conf/keycloak-server.crt.pem
      - ./.docker/keycloak-server.key.pem:/opt/keycloak/conf/keycloak-server.key.pem
    ports:
      - "9990:9990"
      - "8080:8080"
      - "8443:8443"
      # - "5454:5454"
    networks:
      - vapeapp
    depends_on:
      - database

volumes:
  postgres_data_keycloak:
    driver: local

networks:
  vapeapp:
    driver: bridge
