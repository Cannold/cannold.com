# cannold.com

## Development

1. `docker-compose up`
2. Edit away
3. See your changes at http://localhost:4000

### Update rubygems

`docker-compose run site bundle update`

## Build only

`docker-compose run site jekyll build`

## Deploying - making it live

`docker-compose run site jekyll build`

`rsync -avz -e ssh --progress --exclude .well-known/ --delete \_site/ cannold01@cannold.com:./cannold.com/`

## References

* http://themes.semicolonweb.com/html/canvas/intro.html
  * We have themeforest account for access to doco if required
* https://github.com/envygeeks/jekyll-docker/blob/master/README.md
