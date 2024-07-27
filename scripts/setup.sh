docker-compose up -d
docker cp ./MOCK_DATA.json mongodb:/MOCK_DATA.json
docker exec -it mongodb mongoimport --db mongo --collection posts --file /MOCK_DATA.json --jsonArray