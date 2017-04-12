#!/usr/bin/env perl

use strict;
use warnings;

use File::Slurp;
use YAML::XS;
use Data::Structure::Util qw( unbless );

# $YAML::XS::UseCode=1;
 
my $yaml = read_file('backup.yml');
my @array = Load $yaml;

use Data::Dumper;
my %types;
map { $types{ref $_}++ } @array;
print Dumper \%types;

foreach my $item (@array) {

    next unless ref $item eq 'ruby/object:CanpubArticle';
    
    my $created = $item->{attributes}{created_on};
    $created =~ s/(\d\d\d\d-\d\d-\d\d)/$1/;
    my $published = $item->{attributes}{publish_on} || $created;

    my @post;
    push @post, {
        assets     => $item->{assets},
        tags       => $item->{tags},
        published  => $published,
        title      => $item->{attributes}{title},
        excerpt    => $item->{attributes}{excerpt},
        _blueprint => $item->{attributes},
    };

    push @post, $item->{attributes}{content};

    open(my $fh, '>', 'posts/' . $published . '-' . $item->{attributes}{slug} . '.md');

    print $fh Dump @post;

}

