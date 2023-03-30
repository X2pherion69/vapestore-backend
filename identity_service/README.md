# Keycloak Identity Access Manager

**Fast, lightweight, high performance**

-   Keycloak v20.0.3 along with mysql v8.0.27
-   Customized login theme

# How to persist settings(config) after each re-build image:

-   If you have a realm that already config-ed, you should export and then replace it with the one inside this (realm-export.json).
-   By far you shouldn't rename your export file to anything else or you have to config the docker compose file.
    _As long as you don't re-build your image, all the settings will remain as it should be_

# You can customize your theme in the folder themes

# How to run this

-   Run `cd identity_service && docker compose up -d --build`
-   Login using default account in Docker compose file
-   Navigate to Realm vapeapp(at this step we assumed you have config-ed with our realm setting)
-   Navigate to Client then choose vapeapp-nestjs, go to Credentials and then take the secret key then bind to vapestore service .env
-   Learn more here: `https://www.keycloak.org/`
