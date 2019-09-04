const ghostAPI = new GhostContentAPI({
  url: 'https://lesliecannold.ghost.io',
  key: 'fbe6c30c6505148dba4aeaf23c',
  version: 'v2'
});

function updateSplash() {
  ghostAPI.posts.browse({
    limit: '1',
    filter: 'status:published+tag:#splash',
  })
  .then((posts) => {
    posts.forEach((post) => {
      document.getElementById("splash-title").innerHTML = post.title;
      document.getElementById("splash-html").innerHTML = post.html;
      // HACK - replace the next line with CSS
      $('#splash-html').find('p').addClass('lead divcenter').css({"max-width":"800px"});
    });
  })
  .catch((err) => {
    console.error(err);
  });
}

function updateBlogPreview() {
  ghostAPI.posts.browse({
    limit: 'SETASENSIBLELIMIT',
    filter: 'status:published+tag:SEARCHFORBLOGSTUFF',
  })
  .then((posts) => {
    posts.forEach((post) => {
      // The business happens here
    });
  })
  .catch((err) => {
    console.error(err);
  });
}

function updateGhostContent() {
  updateSplash;
  updateBlogPreview;
}

$(document).ready( updateSplash );
// replace the above line with the below when both functions work.
// $(document).ready( updateGhostContent );

// Bonus points, set a javascript timer to update the blogs and splash
// conent every 5 minutes

// Bonus bounus points. Only do call the update functions if
// there have been changes
