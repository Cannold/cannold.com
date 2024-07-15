# cannold.com

## Development

1. Create a branch for your changes
1. `docker compose up`
1. Edit away
1. See your changes at http://localhost:4000

### Update rubygems

`docker compose run site bundle update`

## Build only

`docker compose run site jekyll build`

## Deploying - making it live

1. Goto https://github.com/Cannold/cannold.com
1. Create a PR
1. Merge your PR
1. Done! This will cause a GitHub action to build and deplpoy the changes. The site will update within a few minutes.

## References

* http://themes.semicolonweb.com/html/canvas/intro.html
  * We have themeforest account for access to doco if required
* https://github.com/envygeeks/jekyll-docker/blob/master/README.md
