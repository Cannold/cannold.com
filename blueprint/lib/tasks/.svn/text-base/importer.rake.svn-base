namespace :cannold do
  require 'yaml'
  require 'pp'

  namespace :import do

    task :init => :environment do
      Page.site = Site.find_by_domain(ENV['DOMAIN'])
      @page = Page.for_slug("in-the-media")
      @events_page = Page.for_slug("events")
      @data_location = Blueprint.site_directory(Page.site.domain) + "/lib/data/"
    end

    desc "Import data from yaml data dump"

    task :load_yaml => :init do
       
       @data = File.open( @data_location + "articles.yaml" )
       @events_data = File.open( @data_location + "events.yaml" )

    end

    task :articles => :load_yaml do
      
      
      @articles_imported = 0
      @citations_imported = 0
      @not_imported = []
      
      # raise @page.inspect
      
      CanpubArticle.delete_all
      CanpubCitation.delete_all
      
      puts "Enfreshen page data"
      @articles = []
      yp = YAML::load_documents( @data ) { |article|
        @articles << article
      }
      @articles.each do |article|
        citations = []
        publications = []
        puts "Importing #{article['heading']}"
        publications = article['published']
        citations = article['cited']
        # Draw the publish-on date from the first-published date if exists
        if publications && publications.any?
          date = publications[0]['date']
        end
        date ||= Date.today.strftime("%Y-%m-%d")
        
        article_fields = {
          :title => article['heading'],
          :content => article['content'],
          :link => article['external'],          
          :publish_on => date,
          :page_id => @page.id,
          :site_id => @page.site.id
        }
        
        begin
          new_article = CanpubArticle.new
          new_article.update_attributes(article_fields)
          new_article.save!
          
          #citations for article
          if citations && citations.any?
            citations.each do |citation|
              citation_fields = {
                :publication => citation["publication"],
                :headline => citation["headline"],
                :link => citation["link"],
                :comment => citation["comment"],                
                :date => citation["date"],
                :citation_type => "Cited",
                :page_id => @page.id,
                :site_id => @page.site.id
              }
              cite = CanpubCitation.new
              cite.update_attributes(citation_fields)
              new_article.citations << cite
            end
          end

          #publications for article
          if publications && publications.any?       
            publications.each do |publication|
              publication_fields = {
                :publication => publication["publication"],
                :headline => publication["headline"],
                :link => publication["link"],
                :comment => publication["comment"],
                :date => publication["date"],
                :citation_type => "Published",              
                :page_id => @page.id,
                :site_id => @page.site.id
              }
              
              pub = CanpubCitation.new
              pub.update_attributes(publication_fields)
              new_article.citations << pub
            end
          end

          @articles_imported +=1
        rescue
          @not_imported << "Didn't import #{article['heading']}"
        end
      
      end
      
      puts "-------------------------------------------------------------------"
      puts ""
      puts "Imported #{@articles_imported} articles."
      # puts "Imported #{@citations} of #{@citations.size} articles."
      puts ""
      puts ""
      puts "Problems:"
      puts @not_imported
      puts "-------------------------------------------------------------------"
    end
    
    task :events => :load_yaml do
      @events = []
      yp = YAML::load_documents( @events_data ) { |event|
        @events << event
      }
      
      #Blank slate
      @events_page.events.delete_all
      
      @events.each do |event|
        puts "Importing #{event['heading']}"

        
        event_fields = {
          :title => event['heading'],
          :content => event['content'],
          :start_date => event['date'],          
          :publish_on => event['date'],
          :whole_day => true,
          :page_id => @events_page.id,
          :site_id => @events_page.site.id
        }
        
        begin
          new_event = EvtEvent.new
          new_event.update_attributes(event_fields)
          
          Setting.create(
            :key => "Link",
            :value => event['external'],
            :site_id => new_event.site.id,
            :configurable_type => "EvtEvent",
            :configurable_id => new_event.id
          ) unless event['external'].blank?
          
          new_event.save!
        end
      end
    end
  end
end
