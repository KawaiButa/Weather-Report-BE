# Weather Report BE
This is the backend for a Weather Report Web Application built with Express.js and leveraging Redis for caching weather data.

## Prerequisites
Node.js and npm (or yarn) installed on your system. You can download them from https://nodejs.org/en
A Redis server running. Refer to the official Redis documentation for installation instructions: https://redis.io/
## Installation
Clone this repository or download the project files.
```
git clone https://github.com/KawaiButa/Weather-Report-BE.git
cd Weather-Report-BE
```
## Install the project dependencies:
1. Intall Node project
    ```
    npm install
    ```
    or
    ```
    yarn install
    ```
2. Install redis
    You can install redis by following [this instruction](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)  
## Configuration
1. Environment Variables:
    This application uses environment variables to store sensitive information like API keys and Redis connection details. Create a .env file in the project root directory and define the following variables:
    The .env have the following format:
    ```
    WEATHER_API=your_weather_api_hostname
    WEATHER_KEY=your_weather_api_key
    GMAIL_USER=gmail_for_email_verification
    GMAIL_PASSWORD=email_password_for_email_verification
    FRONTEND_URL=your_frontend_url_for_redirect
    ```
    You could take your the email app passwod by [this instruction](https://support.google.com/mail/answer/185833?hl=en)
## Running the Backend
1. Start the Redis server if it's not already running.
    ```
    redis-server
    ```
    To check whether the redis server is running or not. Use:
    ```
    redis-cli ping
    ```
    The command shoud return **PONG**
2. Start the ExpressJS server

    The project is written in Typescript so first you need to build the project into Javascript.
    In the project's root directory, use:
    ```
    npx tsc
    ```
    The project is configurated to build into ./dist directory
    Run the project => use:
    ```
    node ./index.js
    ```
## Docker
Instead of runing the redis server and the NodeJS server seperately, you can used the predefined Dockerfile in the project to create an image that combine both the DB and the NODEJS server.</br>

**NOTE:**

Because the project is deployed on Render and Render haven't support Docker-compose yet.You can read more [here](https://feedback.render.com/features/p/support-docker-compose) if interested.

Our workaround is include both the DB and the NODEJS server inside one container and using an start.sh to start both of them. However, this method is not ideal. 

Therefore, feel free if you want to replace our Dockerfile + start.sh with a docker-compose.yaml
## Technology stack
- [ExpressJS](https://expressjs.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [WeatherAPI](https://www.weatherapi.com/)
