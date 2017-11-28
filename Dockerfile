FROM ruby:2.3 as builder

RUN apt-get update -qq && apt-get install -y nodejs

RUN gem install jekyll

COPY . /build

WORKDIR /build/

RUN bundle install

RUN jekyll build

FROM nginx
COPY --from=builder /build/_site /usr/share/nginx/html
