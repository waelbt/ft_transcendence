# ft_transcendence
This project is about creating a website for the mighty Pong contest! (user intefrace / chat / game)

NOTE TEAM: 
    - use goinfree cause node_models are heavy asf
    - npm install -g vite@latest
    - create a .nvm in the server dir : example {
        HOST="DB_Postgres"
        POSTGRES_USER="poza"
        POSTGRES_PASSWORD="password"
        POSTGRES_DB="transcendence"
        DATABASE_URL=postgres://poza:password@DB_Postgres:5432/transcendence
        JWT_secret= "secretJWTforTrandandan"
    }
    -  docker compose -f docker-compose.dev.yml  up 
    - if a docker error accured related to volumes go to -> docker desktop -> setting -> Resources -> FILE SHARING and add /goinfre/${USER}/ft_transcendence/server && /goinfre/${USER}/ft_transcendence/client 
    - good luck and wait the server container to get ready 