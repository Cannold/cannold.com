atom_feed(:url => @page.url(:action => :feed)) do |feed|
  feed.title(@page.site.domain)
  feed.updated(@projects.any? ? @projects.first.created_on : nil)

  for project in @projects
    feed.entry(project) do |entry|
      entry.title(project.title)
      entry.content(project.description_markup, :type => 'html')
      entry.author { |author| 
        author.name(project.user ? project.user.public_name : @page.site.domain)
      }
      entry.link(
        :rel => 'alternate',
        :type => 'text/html',
        :href => @page.url(:action => 'project', :id => project.slug)
      )
    end
  end
end
