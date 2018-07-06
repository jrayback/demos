#! /bin/bash
docker container stop HogwartsAPI
docker container rm HogwartsAPI
docker image rm -f hogwartsapi