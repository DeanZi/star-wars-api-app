FROM ubuntu:latest
LABEL authors="deanzion"

ENTRYPOINT ["top", "-b"]