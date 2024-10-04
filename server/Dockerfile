# Build Stage
FROM golang:1.22-alpine AS build

WORKDIR /pb

COPY go.mod go.sum ./
RUN go mod verify && go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /pocketbase

# Run Stage
FROM alpine:latest

WORKDIR /root/

COPY --from=build /pocketbase /pocketbase

EXPOSE 8090

CMD ["/pocketbase", "serve", "--http=0.0.0.0:8090"]