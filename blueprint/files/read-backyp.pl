#!/usr/bin/env perl
use strict;
use warnings qw(FATAL utf8);   # encoding errors raise exceptions
# use utf8;                      # source is in UTF-8
use open qw(:utf8 :std);       # default open mode, `backticks`, and std{in,out,err} are in UTF-8

use File::Slurp;
use YAML::XS;
use Data::Structure::Util qw( unbless );
use Encode qw( decode_utf8 );

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
    
    my $excerpt = decode_utf8($item->{attributes}{excerpt});
    $excerpt =~ s/\r\n/ /gs;
    
    push @post, {
        assets     => $item->{assets},
        tags       => $item->{tags},
        published  => $published,
        title      => $item->{attributes}{title},
        excerpt    => $excerpt,
#        _blueprint => $item->{attributes},
    };

    open(my $fh, '>:raw', 'posts/' . $published . '-' . $item->{attributes}{slug} . '.md');

    print $fh Dump @post;
    
    close $fh;
    
    open(my $fh, '>>', 'posts/' . $published . '-' . $item->{attributes}{slug} . '.md');
    
    print $fh "---\n";
        
    my $content = decode_utf8($item->{attributes}{content});
    $content =~ s/\r//sg;
    print $fh $content;

}

