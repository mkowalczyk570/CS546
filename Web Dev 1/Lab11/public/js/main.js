/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/

  
$(document).ready(function ($) {

    let searchShows = $("#searchShows");
    let tvShowList = $("#tvShowList");
    let showDetails = $("#showDetails");
    let search_term = $("#search_term");
    let rootLink = $("#rootLink");

    const baseUrl = "http://api.tvmaze.com/shows"

    $.ajax({
        url: baseUrl,
        method: 'GET',
        success: (data) =>{
            tvShowList.empty()
            $.each(data, function (index, show){
                let item = $('<li><a href ="'+ show._links.self.href + '">' + show.name + '</a></li>');
                tvShowList.append(item)
            })
            tvShowList.removeClass("hidden")
            showDetails.addClass("hidden")
        }
    })

    function getDetails(data){
        tvShowList.addClass("hidden")
        showDetails.empty()
       
        if(!data.name){
            text = "N/A"
        } else{text = data.name}

        const name = $("<h1>", {text})
        
        
        let alt
        if(data.name){alt = data.name + " Cover"}
        else{alt = "Cover"}
        
        let src 
        if(!data.image){src ="/public/no_image.jpeg" }
        else{
            if(!data.image.medium){src = "/public/no_image.jpeg"}
            else{src = data.image.medium}
        }

        const cover = $("<img/>", {alt, src})
            
            

        let language
        if(!data.language){language = "N/A"}
        else{language = data.language}
        
        
        let network
        if(!data.network.name){network = "N/A"}
        else{network = data.network.name}
        
        let average
        if(!data.rating.average){average = "N/A"}
        else{average = data.rating.average}
        
        let summary
        if(!data.summary){summary = "N/A"}
        else{summary = data.summary}

        const genreList = $("<ul>");

        for(const genre of data.genres) {
            var e = $("<li>").text(genre);
            genreList.append(e);
        }

        const props = $(`<dl><dt>Language</dt><dd>${language}</dd>` +
                    `<dt>Genres</dt><dd>${genreList.get(0).outerHTML}</dd>` +
                    `<dt>Average Rating</dt><dd>${average}</dd>` + 
                    `<dt>Network</dt><dd>${network}</dd>` +
                    `<dt>Summary</dt><dd>${summary}</dd>`)
        
        showDetails.append(name);
        showDetails.append(cover);
        showDetails.append(props);
    

        showDetails.removeClass("hidden");
        rootLink.removeClass("hidden");
    }
    

    $('#tvShowList').on('click', 'a', function(event){
        event.preventDefault()
        let url = $(this).attr('href');
        $.ajax({
            url: url,
            method: 'GET',
            success: (data) =>{
                getDetails(data)
            }
        })
    })

    $('#searchShows').submit(function (event){
        event.preventDefault();
        let search_term = $('#show_search_term').val().trim()
        if(!search_term || typeof search_term !== 'string'){
            alert('Please enter a valid search term')
        }

        $.ajax({
            url: 'http://api.tvmaze.com/search/shows?q=' + search_term,
            method: 'GET',
            success: function (data) {
                tvShowList.empty()
                $.each(data, function (index, show){
                    let item = $('<li><a href ="'+ show.show._links.self.href + '">' + show.show.name + '</a></li>');
                    tvShowList.append(item)
                })
                tvShowList.removeClass("hidden")
                showDetails.addClass("hidden")
                rootLink.removeClass("hidden");
            }
        });
    })
})
    



