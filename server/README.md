## Setup

1. Refer to the PocketBase Go documentation to install Go: https://pocketbase.io/docs/go-overview/.
2. Refer to server/bible_data/README.md to import the Bible database into the pocketbase database.

## Development

Once Go is installed, run `go run main.go serve`, which will start the server and initialize the local database if it does not already exist.

## Spaced Repetition Algorithm

### References

- https://www.reddit.com/r/Anki/comments/1c29775/fsrs_is_one_of_the_most_accurate_spaced
- https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm
- https://github.com/open-spaced-repetition/go-fsrs
  - https://github.com/open-spaced-repetition/go-fsrs/blob/main/models.go
