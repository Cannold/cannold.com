const ghostAPI = new GhostContentAPI({
  url: 'https://lesliecannold.ghost.io',
  key: 'fbe6c30c6505148dba4aeaf23c',
  version: 'v2'
});

function updateSplash() {

  ghostAPI.posts.browse({
    limit: '1',
    filter: 'status:published+tag:splash',
  })
  .then((posts) => {
    posts.forEach((post) => {

      // TODO This is where you would put an if block to test for
      // a new post

      $('#splash-title').html(post.title);
      $('#splash-html').html(post.html);
      // HACK LIAM - replace the next line with CSS
      // $('#splash-html').find('p').addClass('lead divcenter').css({"max-width":"800px"});
    });
  })
  .catch((err) => {
    console.error(err);
  });
}

function updateBlogPreview() {

  $('#ghost-latest-posts').html(''); // we want it blanked out

  var latestPostsHTML = "";

  ghostAPI.posts.browse({
    limit: '4',
    filter: 'tags:-[splash,Events]',
  })
  .then((posts) => {

    posts.forEach((post) => {

      // use jQuery to dyamically add the post elements

      latestPostsHTML = '<div>';
      latestPostsHTML += '<h3>' + post.title + '</h3>';
      
      latestPostsHTML += '</div>';

      $('#ghost-latest-posts').append(latestPostsHTML);

    });

   // id is ghost-latest-posts

    // this is where the page update happens

  })
  .catch((err) => {
    console.error(err);
  });

}

function updateGhostContent() {
  updateSplash();
  updateBlogPreview();
}

$(document).ready( updateGhostContent() );

// LIAM Bonus points, set a javascript timer to update the blogs and splash
// content every 5 minutes

// LIAM Bonus bounus points. Only do call the update functions if
// there have been changes
