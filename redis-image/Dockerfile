# Step 1: install existing base image as base OS for redis
FROM alpine

# Step 2: Download and install dependency

RUN apk add --update redis

# Step 3: Tell the image what to do when it starts as container

CMD ["redis-server"]