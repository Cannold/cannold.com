# cannold.com

## Development

1. `docker-compose up -d`
2. Edit away
3. See your changes at http://localhost:4000

## Deploying

`rsync -avz -e ssh --progress --delete \_site/ cannold.com:./cannold.com/`

## References

* http://themes.semicolonweb.com/html/canvas/intro.html
  * We have themeforest account for access to doco if required
* https://github.com/envygeeks/jekyll-docker/blob/master/README.md
